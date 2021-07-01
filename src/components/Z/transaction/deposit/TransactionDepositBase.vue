<template>
  <ValidationObserver class="deposit-base" tag="div" v-slot="{ invalid, handleSubmit }" ref="observerDeposit">
    <form class="deposit-base__form" novalidate @submit.prevent="handleSubmit(submitDeposit)">
      <div class="ui-step">{{ $t('transaction.deposit.step.selectDepositBank') }}</div>

      <ValidationProvider tag="div" :rules="{ 'object-not-empty': true }" v-slot="{ errors }">
        <div class="ui-field deposit-base__field deposit-base__field--bank" :class="{ invalid: errors.length > 0 }">
          <select class="ui-field__select" v-model="depositBank">
            <option :value="{}" selected>{{ $t(`transaction.deposit.placeholder.depositBank`) }}</option>
            <option :value="item" v-for="item in depositBankList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
        </div>
      </ValidationProvider>

      <div class="ui-field deposit-base__field deposit-base__field--bank-name" v-if="payType === 2">
        <div class="ui-field__group">
          <label class="ui-field__group__label" for="deposit-bank-account">
            {{ $t('transaction.deposit.field.bankAccountName') }}</label
          >
          <span class="ui-field__group__text">{{ depositBank.BankAccountName }}</span>
        </div>
      </div>

      <div class="ui-field deposit-base__field deposit-base__field--bank-account" v-if="payType === 2">
        <div class="ui-field__group ui-field__group--btn">
          <label class="ui-field__group__label" for="deposit-bank-account">
            {{ $t('transaction.deposit.field.bankAccount') }}</label
          >
          <!-- <span class="ui-field__group__text" ref="depositBankAccount">{{ depositBank.BankAccount }}</span> -->
          <input
            type="text"
            class="ui-field__group__input"
            ref="depositBankAccount"
            :value="depositBank.BankAccount"
            readonly
          />
          <button class="ui-btn" type="button" @click="copyBankAccount">{{ $t('ui.button.copy') }}</button>
        </div>
      </div>

      <div class="ui-field deposit-base__field deposit-base__field--bank-name" v-if="payType === 1">
        <div class="ui-field__group">
          <label class="ui-field__group__label" for="deposit-bank-account">
            {{ $t('transaction.deposit.field.bankAccountName') }}
          </label>
          <input class="ui-field__group__input" v-model="depositBankAccount" />
        </div>
      </div>

      <div class="ui-step">{{ $t('transaction.deposit.step.selectTransferBank') }}</div>
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

      <div class="ui-step">{{ $t('transaction.deposit.step.selectDepositInfo') }}</div>

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
        <div class="ui-field deposit-base__field deposit-base__field--datetime" :class="{ invalid: errors.length > 0 }">
          <div class="ui-field__group">
            <label class="ui-field__group__label" for="deposit-bank-account">
              {{ $t('transaction.deposit.field.datetime') }}
            </label>
            <input
              class="ui-field__group__input"
              type="datetime-local"
              v-model="datetime"
              :max="$dayjs().format('YYYY-MM-DDTHH:mm')"
            />
          </div>
        </div>
      </ValidationProvider>

      <ValidationProvider
        tag="div"
        :rules="{ required: true, min_value: amountMin, max_value: amountMax }"
        v-slot="{ errors }"
      >
        <div class="ui-field deposit-base__field deposit-base__field--amount" :class="{ invalid: errors.length > 0 }">
          <div class="ui-field__group">
            <label class="ui-field__group__label" for="deposit-bank-account">
              {{ $t('transaction.deposit.field.amount') }}
            </label>
            <input
              class="ui-field__group__input"
              type="number"
              step="1"
              v-model.number="amount"
              @change="inputAmount"
            />
            <span class="ui-field__group__text">{{ $t('ui.currency.thaiBaht') }}</span>
          </div>
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

      <ValidationProvider
        class="deposit-base__field deposit-base__field--receipt"
        tag="div"
        :rules="{ image: true, size: 10240 }"
        v-slot="{ validate }"
        v-if="isShowReceipt"
      >
        <button
          class="ui-btn ui-btn--block deposit-base__field--receipt__btn"
          :class="{ invalid: receipt.error }"
          type="button"
          @click="uploadReceipt"
        >
          {{ $t('transaction.deposit.field.receipt') }}
        </button>
        <div class="deposit-base__field--receipt__text" :class="{ invalid: receipt.error }">
          <template v-if="receipt.error">{{ receipt.error }}</template>
          <template v-else>{{ receipt.name }}</template>
        </div>

        <input
          class="deposit-base__field--receipt__input"
          ref="receipt"
          type="file"
          accept=".jpg,.png"
          @change="onFileChange($event, validate)"
        />
      </ValidationProvider>
      <div class="ui-notice">
        <ul>
          <li>{{ $t('transaction.deposit.hint.receipt01') }}</li>
          <li>{{ $t('transaction.deposit.hint.receipt02') }}</li>
          <!-- <li>{{ $t('transaction.deposit.hint.receipt03') }}</li> -->
          <!-- <li>{{ $t('transaction.deposit.hint.receipt04') }}</li> -->
        </ul>
      </div>

      <ValidationProvider class="ui-field deposit-base__field deposit-base__field--remark" tag="div">
        <div class="ui-field__group">
          <label class="ui-field__group__label" for="deposit-bank-account">
            {{ $t('transaction.deposit.field.remark') }}
          </label>
          <input class="ui-field__group__input" type="text" v-model="remark" />
        </div>
      </ValidationProvider>

      <ValidationProvider class="ui-field deposit-base__field deposit-base__field--bank" tag="div">
        <select class="ui-field__select" v-model="promotion">
          <option :value="item.Value" v-for="item in depositInfo.AllActivityList" :key="item.Value">
            {{ item.Text }}
          </option>
        </select>
        <div class="ui-field__error" v-if="promotion == -1">
          {{ $t('transaction.deposit.hint.promotion') }}
        </div>
      </ValidationProvider>
      <div class="ui-notice">
        <ul class="ui-ol-memberNotice">
          <li v-for="item in noticeList" :key="item" v-html="$t(item)"></li>
        </ul>
      </div>

      <div class="deposit-base__btn">
        <button class="ui-btn ui-btn--block deposit-base__btn--submit" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import mixinTransactionDepositBase from '@/mixins/transactionDepositBase';
export default {
  name: 'DepositFormBase',
  mixins: [mixinTransactionDepositBase],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
</script>
