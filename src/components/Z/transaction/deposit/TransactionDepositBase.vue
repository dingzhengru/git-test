<template>
  <ValidationObserver class="deposit-base" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="deposit-base__form" novalidate @submit.prevent="handleSubmit(submitDeposit)">
      <div class="ui-step">{{ $t('transaction.deposit.step.selectDepositBank') }}</div>

      <ValidationProvider
        tag="div"
        class="ui-field deposit-base__field deposit-base__field--bank"
        :rules="{ 'object-not-empty': true }"
      >
        <select class="ui-field__select" v-model="depositBank">
          <option :value="{}" selected>{{ $t(`transaction.deposit.placeholder.depositBank`) }}</option>
          <option :value="item" v-for="item in depositBankList" :key="item.value">
            {{ item.Text }}
          </option>
        </select>
      </ValidationProvider>

      <div class="ui-field deposit-base__field deposit-base__field--bank-name">
        <div class="ui-field__group">
          <label class="ui-field__group__label" for="deposit-bank-account">
            {{ $t('transaction.deposit.field.bankAccountName') }}</label
          >
          <span class="ui-field__group__text">{{ depositBank.BankAccountName }}</span>
        </div>
      </div>

      <div class="ui-field deposit-base__field deposit-base__field--bank-account">
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

      <div class="ui-step">{{ $t('transaction.deposit.step.selectTransferBank') }}</div>
      <ValidationProvider
        class="ui-field deposit-base__field deposit-base__field--bank-transfer"
        tag="div"
        :rules="{ 'object-not-empty': true }"
      >
        <select class="ui-field__select" v-model="transferBank">
          <option :value="{}" selected>{{ $t('transaction.deposit.placeholder.transferBank') }}</option>
          <option :value="item" v-for="item in transferBankList" :key="item.Value">
            {{ item.Text }}
          </option>
        </select>
      </ValidationProvider>

      <div class="ui-step">{{ $t('transaction.deposit.step.selectDepositInfo') }}</div>

      <ValidationProvider
        class="ui-field deposit-base__field deposit-base__field--method"
        tag="div"
        :rules="{ required: true }"
      >
        <select class="ui-field__select" v-model="method">
          <option value="">{{ $t(`transaction.deposit.placeholder.method`) }}</option>
          <option :value="item.Value" v-for="item in methodList" :key="item.Value">
            {{ item.Text }}
          </option>
        </select>
      </ValidationProvider>

      <ValidationProvider
        class="ui-field deposit-base__field deposit-base__field--datetime"
        tag="div"
        :rules="{ required: true, 'date-max': $dayjs().format('YYYY-MM-DDTHH:mm') }"
      >
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
      </ValidationProvider>

      <ValidationProvider
        tag="div"
        class="ui-field deposit-base__field deposit-base__field--amount"
        :rules="{ required: true, min_value: depositLimit.min, max_value: depositLimit.max }"
      >
        <div class="ui-field__group">
          <label class="ui-field__group__label" for="deposit-bank-account">
            {{ $t('transaction.deposit.field.amount') }}
          </label>
          <input
            class="ui-field__group__input"
            type="number"
            step="100"
            v-model.number="amount"
            @change="inputAmount"
          />
          <span class="ui-field__group__text">{{ $t('ui.currency.thaiBaht') }}</span>
        </div>
      </ValidationProvider>
      <div class="ui-notice">
        <ul>
          <li>
            {{
              $t('transaction.deposit.hint.amount01', {
                amountLimitMin: depositLimit.min,
                amountLimitMax: depositLimit.max,
              })
            }}
          </li>
          <li>{{ $t('transaction.deposit.hint.amount02') }}</li>
        </ul>
      </div>

      <ValidationProvider
        class="deposit-base__field deposit-base__field--receipt"
        tag="div"
        :rules="{ image: true, size: 2048 }"
        v-slot="{ validate }"
      >
        <button class="ui-btn ui-btn--block deposit-base__field--receipt__btn" type="button" @click="uploadReceipt">
          {{ $t('transaction.deposit.field.receipt') }}
        </button>
        <div class="deposit-base__field--receipt__text">{{ receipt.name }}</div>
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
          <option :value="item.Value" v-for="item in promotionList" :key="item.Value">
            {{ item.Text }}
          </option>
        </select>
        <div class="ui-field__error" v-if="promotion == -1">
          {{ $t('transaction.deposit.hint.promotion') }}
        </div>
      </ValidationProvider>
      <div class="ui-notice">
        <ul class="ui-ol-memberNotice">
          <li v-for="item in noticeList" :key="item">
            <span v-html="$t(item)"></span>
          </li>
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
