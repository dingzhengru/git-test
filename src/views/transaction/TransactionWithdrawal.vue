<template>
  <div class="withdrawal">
    <ValidationObserver v-slot="{ invalid, handleSubmit }">
      <form class="withdrawal__form" id="withdrawal-form" novalidate @submit.prevent="handleSubmit(submitWithdrawal)">
        <ul class="withdrawal__ul theme-content-box">
          <ValidationProvider tag="li" class="withdrawal__li theme-li-dataView" :rules="{ 'object-not-empty': true }">
            <span class="withdrawal__li__title theme-dataView-header">
              {{ $t('transaction.withdrawal.field.bank') }}
            </span>
            <select class="withdrawal__li__select ui-ddl" v-model="bank">
              <option :value="{}" selected>{{ $t('transaction.withdrawal.placeholder.bank') }}</option>
              <option :value="bankItem" v-for="bankItem in bankList" :key="bankItem.Lst_Bank_name">
                {{ bankItem.Text }}
              </option>
            </select>
          </ValidationProvider>

          <li class="withdrawal__li theme-li-dataView">
            <span class="withdrawal__li__title theme-dataView-header">
              {{ $t('transaction.withdrawal.field.account') }}
            </span>
            <p class="withdrawal__li__content theme-dataView-data">
              {{ withdrawalInfo.Lst_Account }}
            </p>
          </li>

          <li class="withdrawal__li theme-li-dataView">
            <span class="withdrawal__li__title theme-dataView-header">
              {{ $t('transaction.withdrawal.field.currency') }}
            </span>
            <p class="withdrawal__li__content theme-dataView-data">
              {{ withdrawalInfo.Lst_Currency }}
            </p>
          </li>

          <li class="withdrawal__li theme-li-dataView">
            <span class="withdrawal__li__title theme-dataView-header">
              {{ $t('transaction.withdrawal.field.wallet') }}
            </span>
            <p class="withdrawal__li__content theme-dataView-data">
              {{ numeral(withdrawalInfo.Lst_Point).format('0,0.00') }}
            </p>
            <button type="button" class="withdrawal__li__button ui-btn ui-btn-long" @click="transferToMain">
              {{ $t('transaction.withdrawal.button.allToMyWallet') }}
            </button>
          </li>

          <li class="withdrawal__li theme-li-dataView">
            <span class="withdrawal__li__title theme-dataView-header">
              {{ $t('transaction.withdrawal.field.amount') }}
            </span>
            <ValidationProvider :rules="{ required: currencyList.length > 0 }" v-show="currencyList.length > 0">
              <select class="withdrawal__li__select withdrawal__li__select--currency ui-ddl" v-model="currency">
                <option value="">{{ $t('transaction.withdrawal.field.currency') }}</option>
                <option :value="currencyItem.Value" v-for="currencyItem in currencyList" :key="currencyItem.Value">
                  {{ currencyItem.Text }}
                </option>
              </select>
            </ValidationProvider>
            <ValidationProvider
              :rules="{
                required: true,
                min_value: withdrawalInfo.WithalDownlimit,
                max_value: amountMax,
                integerHundredsDivisible: { number: amount },
              }"
            >
              <input
                class="withdrawal__li__input ui-ipt theme-ipt-dataview"
                :id="idMapper.transaction.withdrawal.field.Add_WithdrswalsPoint"
                type="number"
                step="100"
                placeholder="Please enter amount of withdrawal"
                autocomplete="off"
                v-model.number="amount"
                @change="changeAmount"
              />
            </ValidationProvider>
          </li>

          <li class="withdrawal__li theme-li-dataView">
            <span class="withdrawal__li__title theme-dataView-header">
              {{ $t('transaction.withdrawal.field.bankName') }}
            </span>
            <p class="withdrawal__li__content theme-dataView-data">
              {{ bank.Lst_Bank_name }}
            </p>
          </li>

          <li class="withdrawal__li theme-li-dataView">
            <span class="withdrawal__li__title theme-dataView-header">
              {{ $t('transaction.withdrawal.field.bankAccount') }}
            </span>
            <p class="withdrawal__li__content theme-dataView-data">
              {{ bank.Lst_BankAccount }}
            </p>
          </li>

          <li class="withdrawal__li theme-li-dataView">
            <span class="withdrawal__li__title theme-dataView-header">
              {{ $t('transaction.withdrawal.field.bankBranch') }}
            </span>
            <p class="withdrawal__li__content theme-dataView-data">
              {{ bank.Lst_Bank_Branches }}
            </p>
          </li>

          <li class="withdrawal__li theme-li-dataView">
            <span class="withdrawal__li__title theme-dataView-header">
              {{ $t('transaction.withdrawal.field.bankAccountName') }}
            </span>
            <p class="withdrawal__li__content theme-dataView-data">
              {{ withdrawalInfo.Add_RealName }}
            </p>
          </li>

          <ValidationProvider
            tag="li"
            class="withdrawal__li theme-li-dataView"
            :rules="{
              'withdrawal-password-required': true,
              'withdrawal-password-min': 6,
              'withdrawal-password-regex': '^[a-zA-Z0-9]*$',
            }"
            v-slot="{ errors }"
          >
            <span class="withdrawal__li__title theme-dataView-header">
              {{ $t('transaction.withdrawal.field.password') }}
            </span>
            <input
              class="withdrawal__li__input ui-ipt theme-ipt-dataview"
              :id="idMapper.transaction.withdrawal.field.password"
              type="password"
              v-model="password"
            />
            <div class="theme-errorMsg" v-if="errors.length > 0">
              <span class="theme-txt-errorMsg">{{ errors[0] }}</span>
            </div>
          </ValidationProvider>
        </ul>
        <div class="withdrawal__light-message">
          {{ $t('transaction.withdrawal.hightLightMessage', { min: withdrawalInfo.WithalDownlimit }) }}
        </div>
        <div class="withdrawal__button-div">
          <button
            type="submit"
            class="withdrawal__button--submit ui-btn ui-btn-long"
            form="withdrawal-form"
            :id="idMapper.transaction.withdrawal.button.submit"
            :disabled="invalid"
          >
            {{ $t('ui.button.submit') }}
          </button>
        </div>
        <ol class="withdrawal__notice ui-ol-memberNotice">
          <li v-for="notice in noticeList" :key="notice">{{ $t(`transaction.withdrawal.notice.${notice}`) }}</li>
        </ol>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { apiGetWithdrawalInfo, apiWithdrawal } from '@/api/transaction-withdrawal';
import { apiTransferAllGamePointToMain } from '@/api/transaction-transfer';

import { ValidationObserver, ValidationProvider } from 'vee-validate';
import '@/utils/vee-validate.js';
import numeral from 'numeral';
import idMapper from '@/idMapper';

export default {
  name: 'TransactionWithdrawal',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  computed: {
    ...mapGetters(['lang', 'siteFullCss']),
    amountMax() {
      if (this.withdrawalInfo.Lst_Point < this.withdrawalInfo.WithalUplimit) {
        return this.withdrawalInfo.Lst_Point;
      }
      return this.withdrawalInfo.WithalUplimit;
    },
  },
  data() {
    return {
      idMapper: idMapper,
      numeral: numeral,
      withdrawalInfo: {},
      bankList: [],
      currencyList: [],
      bank: {},
      currency: '',
      amount: 0,
      password: '',
      noticeList: ['contact'],
    };
  },
  methods: {
    async getWithdrawalInfo() {
      const result = await apiGetWithdrawalInfo();
      this.withdrawalInfo = result.RetObj;
      this.bankList = result.RetObj.Add_MemberBankAccountList;
      this.currencyList = result.RetObj.BaseCurrencyItem;

      //* 若會員的 Add_MemberBankAccountList 為空，則轉去會員中心
      if (this.bankList.length < 0) {
        this.$router.replace({ name: 'UserProfile' });
      }
    },
    async transferToMain() {
      const result = await apiTransferAllGamePointToMain();
      if (result.Code == 200) {
        this.withdrawalInfo.Lst_Point = result.RetObj.GameSitePoints.find(item => item.Product_id == 9999).Point;
        window.alert(result.RetObj.MsgString);
      }
    },
    async submitWithdrawal() {
      const requestData = {
        Add_RealName: this.withdrawalInfo.Add_RealName,
        Add_MemberBankID: this.bank.Lst_BankID,
        Add_MemberBankName: this.bank.Lst_Bank_name,
        Add_MemberBankBranchesName: this.bank.Lst_Bank_Branches,
        Add_MemberBankAccount: this.bank.Lst_BankAccount,
        Add_WithdrswalsPoint: this.amount,
        Add_Withdrawals_Password: this.password,
        Add_Request_Currency: this.currency || 'THB',
        Add_Exchange_Rate: 1,
        Add_PayMemo: '',
        Add_SelectBank: this.bank.Value,
      };

      const result = await apiWithdrawal(requestData);
      if (result.Code == 200) {
        this.$router.push({ name: 'TransactionRecordContent', params: { name: 'withdrawal' } });
      }
    },
    changeAmount() {
      if (this.amount > this.amountMax) {
        this.amount = this.amountMax;
      } else if (this.amount < this.withdrawalInfo.WithalDownlimit) {
        this.amount = this.withdrawalInfo.WithalDownlimit;
      }

      //* 取最小整數、並轉換最後兩位為 0
      if (this.amount % 100 != 0) {
        const amountStringList = String(Math.floor(this.amount)).split('');
        amountStringList[amountStringList.length - 1] = 0;
        amountStringList[amountStringList.length - 2] = 0;
        this.amount = Number(amountStringList.join(''));
      }
    },
    validateForm() {
      if (
        this.amount < this.withdrawalInfo.WithalDownlimit ||
        this.amount > this.withdrawalInfo.WithalUplimit ||
        this.amount > this.withdrawalInfo.Lst_Point ||
        this.amount % 100 != 0
      ) {
        return false;
      } else if (this.bank == '' || Object.keys(this.bank).length == 0) {
        return false;
      } else if (this.password == '' || this.password.length < 6) {
        return false;
      }
      return true;
    },
  },
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/transaction/withdrawal.scss`);

    this.getWithdrawalInfo();
  },
  watch: {
    lang() {
      this.getWithdrawalInfo();
    },
  },
};
</script>

<style lang="scss" scoped>
.withdrawal {
  margin: 40px 0;
  &__li {
    list-style: none;
    &__select {
      padding: 0 1.5%;
      width: 100%;

      &--currency {
        margin-left: 5%;
        width: 95%;
      }
    }
    &__button {
      display: block;
      margin: 0 auto;
    }
  }

  &__light-message {
    font-size: 2em;
  }

  &__button-div {
    margin: 40px 0;
    text-align: center;
  }
}
</style>

<style scoped>
/* .withdrawal {
  margin: 40px 0;
} */

/* .withdrawal__li {
  list-style: none;
} */

/* .withdrawal__li__select {
  padding: 0 1.5%;
  width: 100%;
} */

/* .withdrawal__li__select--currency {
  margin-left: 5%;
  width: 95%;
} */

/* .withdrawal__li__button {
  display: block;
  margin: 0 auto;
} */

/* .withdrawal__button-div {
  margin: 40px 0;
  text-align: center;
} */

/* .withdrawal__light-message {
  font-size: 2em;
} */
</style>
