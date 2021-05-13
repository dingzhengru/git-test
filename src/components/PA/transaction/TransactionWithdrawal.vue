<template>
  <ValidationObserver class="withdrawal" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="withdrawal-form" @submit.prevent="handleSubmit(submitWithdrawal)">
      <div class="nav-tab withdrawal__nav">
        <div class="withdrawal__nav__wallet">{{ $t('ui.label.wallet') }} :</div>
        <div class="withdrawal__nav__amount">{{ $numeral(userGamePointWallet.Point).format('0,0.00') }}</div>
        <div class="nav-tab__item active" @click="$store.dispatch('user/transferAllPointToMain')">
          {{ $t('ui.button.allToMyWallet-2') }}
        </div>
      </div>

      <ValidationProvider
        class="ui-field no-wrap withdrawal__field withdrawal__field--amount"
        tag="div"
        :rules="{
          required: true,
          min_value: withdrawalInfo.WithalDownlimit,
          max_value: amountMax,
          integerHundredsDivisible: { number: amount },
        }"
      >
        <label class="ui-field__label">{{ $t('transaction.withdrawal.field.amount') }}</label>
        <input
          class="ui-field__input"
          type="number"
          step="100"
          autocomplete="off"
          v-model.number="amount"
          @change="changeAmount"
        />
        <span class="ui-field__text">{{ $t('ui.currency.thaiBaht') }}</span>
      </ValidationProvider>

      <ValidationProvider
        class="ui-field no-wrap withdrawal__field withdrawal__field--bank"
        tag="div"
        :rules="{ 'object-not-empty': true }"
        v-show="bankList.length > 1"
      >
        <label>{{ $t('transaction.withdrawal.field.bank') }}</label>
        <select class="ui-field__select" v-model="bank">
          <option :value="{}">{{ $t('ui.label.pleaseSelect') }}</option>
          <option :value="item" v-for="item in bankList" :key="item.Lst_BankID">
            {{ item.Text }}
          </option>
        </select>
      </ValidationProvider>

      <div class="ui-field no-wrap withdrawal__field withdrawal__field--bank-info">
        <label>{{ $t('ui.label.bankName') }}</label>
        <span>{{ bank.Lst_Bank_name }}</span>
      </div>

      <div class="ui-field no-wrap withdrawal__field withdrawal__field--bank-info">
        <label>{{ $t('ui.label.bankAccount') }}</label>
        <span>{{ bank.Lst_BankAccount }}</span>
      </div>

      <div class="ui-field no-wrap withdrawal__field withdrawal__field--bank-info">
        <label>{{ $t('ui.label.bankBranch') }}</label>
        <span>{{ bank.Lst_Bank_Branches }}</span>
      </div>

      <div class="ui-field no-wrap withdrawal__field withdrawal__field--bank-info">
        <label>{{ $t('ui.label.bankAccountName') }}</label>
        <span>{{ withdrawalInfo.Add_RealName }}</span>
      </div>

      <ValidationProvider
        class="ui-field no-wrap withdrawal__field"
        tag="div"
        :rules="{
          'withdrawal-password-required': true,
          'withdrawal-password-min': 6,
          'withdrawal-password-regex': '^[a-zA-Z0-9]*$',
        }"
      >
        <label class="ui-field__group__label">{{ $t('transaction.withdrawal.field.password') }}</label>
        <input
          class="ui-field__group__input"
          type="password"
          :placeholder="$t('login.placeholder.password')"
          v-model="password"
        />
      </ValidationProvider>

      <div class="withdrawal__btn">
        <button class="ui-btn ui-btn--lg withdrawal__btn--submit" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
        <div class="ui-question" @click="isShowModalNotice = true"></div>
      </div>

      <component
        :is="ModalNoticeList"
        :noticeList="noticeList"
        v-if="isShowModalNotice"
        @close="isShowModalNotice = false"
      >
        <template v-slot:top>
          <li>
            {{ $t('transaction.withdrawal.notice.restrict01') }}
            <router-link class="ui-notice--height-light" :to="{ name: 'TransactionRecordWithdrawalRestriction' }">
              {{ $t('transaction.withdrawal.notice.restrict02') }}
            </router-link>
            {{ $t('transaction.withdrawal.notice.restrict03') }}
          </li>
        </template>
      </component>
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
    ...mapGetters(['siteSetting']),
    ModalNoticeList() {
      return () => import(`@/${this.siteSetting.components.transaction.ModalNoticeList}`);
    },
  },
  data() {
    return {
      isShowModalNotice: false,
      noticeList: ['transaction.withdrawal.notice.amount', 'transaction.withdrawal.notice.contact'],
    };
  },
  mounted() {
    this.importStyleByFilename('transaction-withdrawal');
  },
};
</script>
