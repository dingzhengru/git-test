<template>
  <ValidationObserver class="deposit-base" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="deposit-base__form" novalidate @submit.prevent="handleSubmit(submitDeposit)">
      <fieldset class="ui-fieldset">
        <legend>{{ $t('transaction.deposit.step.selectDepositBank') }}</legend>
        <ValidationProvider tag="div" :rules="{ 'object-not-empty': true }" v-slot="{ errors }">
          <div class="ui-field deposit-base__field deposit-base__field--bank" :class="{ invalid: errors.length > 0 }">
            <select class="ui-field__select" v-model="depositBank">
              <option :value="{}" selected>{{ $t(`transaction.deposit.placeholder.depositBank`) }}</option>
              <option :value="item" v-for="item in depositInfo.BankAccount" :key="item.Value">
                {{ item.Text }}
              </option>
            </select>
          </div>
        </ValidationProvider>

        <div class="deposit-base__bank-info" v-if="payType === 2">
          <div class="deposit-base__bank-info__bank-name">
            <label> {{ $t('transaction.deposit.field.bankAccountName') }}</label>
            <span>{{ depositBank.BankAccountName }}</span>
          </div>

          <div class="deposit-base__bank-info__bank-account">
            <label> {{ $t('transaction.deposit.field.bankAccount') }}</label>
            <input
              type="text"
              class="ui-field__group__input"
              ref="depositBankAccount"
              :value="depositBank.BankAccount"
              readonly
            />
            <span class="deposit-base__bank-info__bank-account__copy" @click="copyBankAccount">
              {{ $t('ui.button.copy') }}
            </span>
          </div>
        </div>

        <div class="ui-field deposit-base__field deposit-base__field--bank-name" v-if="payType === 1">
          <input
            class="ui-field__group__input"
            :placeholder="$t('transaction.deposit.field.bankAccountName')"
            v-model="depositBankAccount"
          />
        </div>
      </fieldset>

      <fieldset class="ui-fieldset">
        <legend>{{ $t('transaction.deposit.step.selectTransferBank') }}</legend>
        <ValidationProvider tag="div" :rules="{ 'object-not-empty': true }" v-slot="{ errors }">
          <div
            class="ui-field deposit-base__field deposit-base__field--bank-transfer"
            :class="{ invalid: errors.length > 0 }"
          >
            <select class="ui-field__select" v-model="transferBank">
              <option :value="{}" selected>{{ $t('transaction.deposit.placeholder.transferBank') }}</option>
              <option :value="item" v-for="item in depositInfo.BankURL" :key="item.Value">
                {{ item.Text }}
              </option>
            </select>
          </div>
        </ValidationProvider>
      </fieldset>

      <fieldset class="ui-fieldset">
        <legend>{{ $t('transaction.deposit.step.selectDepositInfo') }}</legend>
        <ValidationProvider tag="div" :rules="{ required: true }" v-slot="{ errors }">
          <div class="ui-field deposit-base__field deposit-base__field--method" :class="{ invalid: errors.length > 0 }">
            <select class="ui-field__select" v-model="method">
              <option value="">{{ $t(`transaction.deposit.placeholder.method`) }}</option>
              <option :value="item.Value" v-for="item in depositInfo.DepositMethod" :key="item.Value">
                {{ item.Text }}
              </option>
            </select>
          </div>
        </ValidationProvider>

        <ValidationProvider
          tag="div"
          :rules="{ required: true, 'date-max': $dayjs().format('YYYY-MM-DDTHH:mm') }"
          v-slot="{ errors }"
        >
          <div
            class="ui-field deposit-base__field deposit-base__field--datetime"
            :class="{ invalid: errors.length > 0 }"
          >
            <input
              class="ui-field__group__input"
              type="datetime-local"
              :placeholder="$t('transaction.deposit.field.datetime')"
              v-model="datetime"
              :max="$dayjs().format('YYYY-MM-DDTHH:mm')"
            />
          </div>
        </ValidationProvider>
      </fieldset>

      <fieldset class="ui-fieldset">
        <legend>{{ $t('transaction.deposit.field.amount') }}</legend>
        <ValidationProvider
          tag="div"
          :rules="{ required: true, min_value: amountMin, max_value: amountMax }"
          v-slot="{ errors }"
        >
          <div
            class="ui-field ui-field--inside deposit-base__field deposit-base__field--amount"
            :class="{ invalid: errors.length > 0 }"
          >
            <input type="number" step="1" v-model.number="amount" @change="inputAmount" />
            <span>{{ $t('ui.currency.thaiBaht') }}</span>
          </div>
        </ValidationProvider>

        <div class="ui-notice">
          <ul>
            <li
              v-html="
                $t('transaction.deposit.hint.amount01', {
                  currency: $t('ui.label.baht'),
                  amountLimitMin: amountMin,
                  amountLimitMax: amountMax,
                })
              "
            ></li>
            <li>{{ $t('transaction.deposit.hint.amount02') }}</li>
          </ul>
        </div>
      </fieldset>

      <fieldset class="ui-fieldset">
        <legend>{{ $t('transaction.deposit.field.receipt') }}</legend>
        <ValidationProvider
          tag="div"
          :rules="{ image: true, size: 2048 }"
          v-slot="{ validate }"
          @click.native="uploadReceipt"
          v-if="isShowReceipt"
        >
          <div class="ui-field deposit-base__field deposit-base__field--receipt" :class="{ invalid: receipt.error }">
            <!-- <input type="text" :value="receipt.name ? receipt.name : $t('ui.button.upload')" readonly /> -->

            <div>
              {{ receipt.name ? receipt.name : $t('ui.button.upload') }}
            </div>

            <span></span>
            <span></span>
            <span></span>

            <input
              class="deposit-base__field--receipt__input"
              ref="receipt"
              type="file"
              accept=".jpg,.png"
              v-show="false"
              @change="onFileChange($event, validate)"
            />
          </div>
        </ValidationProvider>
        <div class="ui-notice">
          <ul>
            <li>{{ $t('transaction.deposit.hint.receipt01') }}</li>
            <li>{{ $t('transaction.deposit.hint.receipt02') }}</li>
          </ul>
        </div>
      </fieldset>

      <fieldset class="ui-fieldset">
        <legend>{{ $t('transaction.deposit.field.remark') }}</legend>
        <ValidationProvider class="ui-field deposit-base__field deposit-base__field--remark" tag="div">
          <input
            class="ui-field__group__input"
            type="text"
            :placeholder="$t('transaction.deposit.field.remark')"
            v-model="remark"
          />
        </ValidationProvider>
      </fieldset>

      <fieldset class="ui-fieldset flex-row deposit-base__promotion">
        <legend>{{ $t('ui.label.promotion') }}</legend>
        <ValidationProvider class="ui-field deposit-base__field deposit-base__field--promotion" tag="div">
          <select class="ui-field__select" v-model="promotion">
            <option :value="item.Value" v-for="item in depositInfo.AllActivityList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>

          <div class="deposit-base__field--promotion__hint" v-if="promotion == -1">
            {{ $t('transaction.deposit.hint.promotion') }}
          </div>
        </ValidationProvider>
      </fieldset>

      <div class="deposit-base__btn">
        <button class="ui-btn ui-btn--lg" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
        <div class="ui-question" @click="isShowModalNotice = true"></div>
      </div>
    </form>

    <component
      :is="ModalNoticeList"
      :noticeList="noticeList"
      v-if="isShowModalNotice"
      @close="isShowModalNotice = false"
    />
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import mixinTransactionDepositBase from '@/mixins/transactionDepositBase';
export default {
  name: 'DepositFormBase',
  mixins: [mixinTransactionDepositBase],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['siteSetting']),
    ModalNoticeList() {
      return () => import(`@/${this.siteSetting.components.transaction.ModalNoticeList}`);
    },
  },
  data() {
    return {
      isShowModalNotice: false,
    };
  },
};
</script>
