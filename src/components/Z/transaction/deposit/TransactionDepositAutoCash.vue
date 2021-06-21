<template>
  <ValidationObserver class="deposit-auto-cash" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="deposit-auto-cash__form" @submit.prevent="handleSubmit(submitDeposit)" @reset.prevent="reset">
      <ValidationProvider tag="div" :rules="{ 'object-not-empty': true }" v-slot="{ errors }">
        <div class="ui-field deposit-auto-cash__field" :class="{ invalid: errors.length > 0 }">
          <select class="ui-field__select" v-model="dispensingBank">
            <option :value="{}" selected>{{ $t('ui.label.pleaseSelect') }}</option>
            <option :value="item" v-for="item in depositInfo.BankAccount" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
        </div>
      </ValidationProvider>

      <router-link class="deposit-auto-cash__link" :to="{ name: 'UserProfile' }">
        前往設定預設銀行
      </router-link>

      <div class="deposit-auto-cash__step">{{ $t('transaction.deposit.step.transferBankInfo') }}</div>
      <div class="ui-field deposit-auto-cash__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">{{ $t('transaction.deposit.field.beneficiaryBank') }}</label>
          <input class="ui-field__group__input" type="text" readonly />
        </div>
      </div>
      <div class="ui-field deposit-auto-cash__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">
            {{ $t('transaction.deposit.field.beneficiaryBankAccountName') }}
          </label>
          <input class="ui-field__group__input" type="text" readonly />
        </div>
      </div>
      <div class="ui-field deposit-auto-cash__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label"> {{ $t('transaction.deposit.field.beneficiaryBankAccount') }}</label>
          <input class="ui-field__group__input" type="text" readonly />
        </div>
      </div>

      <div class="deposit-auto-cash__step">{{ $t('transaction.deposit.field.amount') }}</div>

      <ValidationProvider
        tag="div"
        :rules="{ required: true, min_value: amountMin, max_value: amountMax }"
        v-slot="{ errors }"
      >
        <div
          class="ui-field deposit-auto-cash__field deposit-auto-cash__field--amount"
          :class="{ invalid: errors.length > 0 }"
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
        </ul>
      </div>

      <div class="deposit-auto-cash__step">{{ $t('transaction.deposit.field.promotion') }}</div>

      <ValidationProvider class="ui-field deposit-auto-cash__field deposit-auto-cash__field--promotion" tag="div">
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
        <ul>
          <li v-html="$t('transaction.deposit.notice.currency', { currency: $t('ui.currency.thaiBaht') })"></li>
          <li>{{ $t('transaction.deposit.notice.depositLimit01') }}</li>
          <li>{{ $t('transaction.deposit.notice.userBear01') }}</li>
          <li>{{ $t('transaction.deposit.notice.userBear02') }}</li>
          <li>{{ $t('transaction.deposit.notice.contact') }}</li>
        </ul>
      </div>

      <div class="deposit-auto-cash__btn">
        <button class="ui-btn ui-btn--block deposit-auto-cash__btn--submit" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
        <button class="ui-btn ui-btn--block deposit-auto-cash__btn--reset" type="reset" @click="resetForm">
          {{ $t('ui.button.reset') }}
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import mixinTransactionDepositAutoCash from '@/mixins/transactionDepositAutoCash';
export default {
  name: 'TransactionDepositAutoCash',
  mixins: [mixinTransactionDepositAutoCash],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
</script>
