<template>
  <ValidationObserver class="withdrawal" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="withdrawal-form" @submit.prevent="handleSubmit(submitWithdrawal)">
      <div class="withdrawal__field--transfer" :rules="{ 'object-not-empty': true }">
        <div class="withdrawal__field--transfer__wallet">
          <label class="ui-field__group__label">{{ $t('transaction.withdrawal.field.wallet') }}</label>
          <span class="ui-field__group__text">{{ userGamePointWallet.Point }}</span>
        </div>
        <div class="withdrawal__field--transfer__btn">
          <button class="ui-btn" type="button" @click="transferToMain">
            {{ $t('ui.button.allToMyWallet') }}
          </button>
        </div>
      </div>

      <ValidationProvider
        class="ui-field withdrawal__field withdrawal__field--amount"
        tag="div"
        :rules="{
          required: true,
          min_value: withdrawalInfo.WithalDownlimit,
          max_value: amountMax,
          integerHundredsDivisible: { number: amount },
        }"
      >
        <div class="ui-field__group">
          <label class="ui-field__group__label">{{ $t('transaction.withdrawal.field.amount') }}</label>
          <input
            class="ui-field__group__input"
            type="number"
            step="100"
            autocomplete="off"
            v-model.number="amount"
            @change="changeAmount"
          />
          <span class="ui-field__group__text">{{ $t('ui.currency.thaiBaht') }}</span>
        </div>
      </ValidationProvider>

      <ValidationProvider class="ui-field" tag="div" :rules="{ 'object-not-empty': true }" v-show="bankList.length > 1">
        <div class="ui-field__group">
          <label class="ui-field__group__label">{{ $t('transaction.withdrawal.field.bank') }}</label>
          <select class="ui-field__select" v-model="bank">
            <option :value="{}">{{ $t('ui.label.pleaseSelect') }}</option>
            <option :value="item" v-for="item in bankList" :key="item.Lst_BankID">
              {{ item.Text }}
            </option>
          </select>
        </div>
      </ValidationProvider>

      <div class="ui-field withdrawal__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">{{ $t('ui.label.bankName') }}</label>
          <span class="ui-field__group__text">{{ bank.Lst_Bank_name }}</span>
        </div>
      </div>

      <div class="ui-field withdrawal__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">{{ $t('ui.label.bankAccount') }}</label>
          <span class="ui-field__group__text">{{ bank.Lst_BankAccount }}</span>
        </div>
      </div>

      <div class="ui-field withdrawal__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">{{ $t('ui.label.bankBranch') }}</label>
          <span class="ui-field__group__text">{{ bank.Lst_Bank_Branches }}</span>
        </div>
      </div>

      <div class="ui-field withdrawal__field">
        <div class="ui-field__group">
          <label class="ui-field__group__label">{{ $t('ui.label.bankAccountName') }}</label>
          <span class="ui-field__group__text">{{ withdrawalInfo.Add_RealName }}</span>
        </div>
      </div>

      <ValidationProvider
        class="ui-field withdrawal__field"
        tag="div"
        :rules="{
          'withdrawal-password-required': true,
          'withdrawal-password-min': 6,
          'withdrawal-password-regex': '^[a-zA-Z0-9]*$',
        }"
      >
        <div class="ui-field__group">
          <label class="ui-field__group__label">{{ $t('transaction.withdrawal.field.password') }}</label>
          <input
            class="ui-field__group__input"
            type="password"
            :placeholder="$t('login.placeholder.password')"
            v-model="password"
          />
          <button class="ui-btn withdrawal__btn--submit" type="submit" :disabled="invalid">
            {{ $t('ui.button.submit') }}
          </button>
        </div>
      </ValidationProvider>

      <!-- <div class="withdrawal__btn">
        <button class="ui-btn withdrawal__btn--submit" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
      </div> -->

      <div class="ui-notice withdrawal__notice">
        <ul>
          <li class="ui-notice--height-light">{{ $t('transaction.withdrawal.notice.amount') }}</li>
          <li>
            {{ $t('transaction.withdrawal.notice.restrict01') }}
            <router-link class="ui-notice--height-light" :to="{ name: 'TransactionRecordWithdrawalRestriction' }">
              {{ $t('transaction.withdrawal.notice.restrict02') }}
            </router-link>
            {{ $t('transaction.withdrawal.notice.restrict03') }}
          </li>
          <li>{{ $t('transaction.withdrawal.notice.contact') }}</li>
        </ul>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinTransactionWithdrawal from '@/mixins/transactionWithdrawal';
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'TransactionWithdrawal',
  mixins: [mixinStyleLoader, mixinTransactionWithdrawal],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['siteFullCss']),
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/transaction-withdrawal.scss`);
    this.importStyleByFilename('transaction-withdrawal');
  },
};
</script>
