<template>
  <ValidationObserver class="deposit-auto-cash" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="deposit-auto-cash__form" @submit.prevent="handleSubmit(submitDepositAutoCash)">
      <fieldset class="ui-fieldset">
        <legend>{{ $t('transaction.deposit.field.dispensingBank') }}</legend>
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
      </fieldset>

      <fieldset class="ui-fieldset">
        <legend>{{ $t('transaction.deposit.step.transferBankInfo') }}</legend>
        <div class="ui-field deposit-auto-cash__field">
          <label>{{ $t('transaction.deposit.field.beneficiaryBank') }}</label>
          <input type="text" readonly />
        </div>
        <div class="ui-field deposit-auto-cash__field">
          <label>{{ $t('transaction.deposit.field.beneficiaryBankAccountName') }}</label>
          <input type="text" readonly />
        </div>
        <div class="ui-field deposit-auto-cash__field">
          <label>{{ $t('transaction.deposit.field.beneficiaryBankAccount') }}</label>
          <input type="text" readonly />
        </div>
      </fieldset>

      <fieldset class="ui-fieldset">
        <legend>{{ $t('transaction.deposit.field.amount') }}</legend>

        <ValidationProvider
          tag="div"
          :rules="{ required: true, min_value: amountMin, max_value: amountMax }"
          v-slot="{ errors }"
        >
          <div class="ui-field ui-field--inside deposit-auto-cash__field" :class="{ invalid: errors.length > 0 }">
            <input type="number" step="100" v-model.number="amount" @change="inputAmount" />
            <span>{{ $t('ui.currency.thaiBaht') }}</span>
          </div>
        </ValidationProvider>
      </fieldset>

      <fieldset class="ui-fieldset">
        <legend>{{ $t('transaction.deposit.field.promotion') }}</legend>

        <ValidationProvider class="ui-field deposit-auto-cash__field deposit-auto-cash__field--promotion" tag="div">
          <select class="ui-field__select" v-model="promotion">
            <option :value="item.Value" v-for="item in depositInfo.AllActivityList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
          <div class="deposit-auto-cash__field--promotion-hint" v-if="promotion == -1">
            {{ $t('transaction.deposit.hint.promotion') }}
          </div>
        </ValidationProvider>
      </fieldset>

      <div class="deposit-auto-cash__btn">
        <button class="ui-btn ui-btn--lg" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
// import { mapGetters } from 'vuex';
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

<style></style>
