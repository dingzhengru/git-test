<template>
  <form class="withdrawal" @submit.prevent="submitWithdrawal">
    <ul class="withdrawal__ul theme-content-box">
      <li class="withdrawal__li theme-li-dataView">
        <span class="withdrawal__li__title theme-dataView-header">
          {{ $t('transaction.withdrawal.field.bankSelect') }}
        </span>
        <select class="withdrawal__li__select ui-ddl" v-model="bank">
          <option :value="{}" selected>{{ $t('transaction.withdrawal.field.bankSelectPlaceholder') }}</option>
          <option :value="bankItem" v-for="bankItem in bankList" :key="bankItem.Lst_Bank_name">
            {{ bankItem.Text }}
          </option>
        </select>
      </li>

      <li class="withdrawal__li theme-li-dataView">
        <span class="withdrawal__li__title theme-dataView-header">
          {{ $t('transaction.withdrawal.field.Lst_Account') }}
        </span>
        <p class="withdrawal__li__content theme-dataView-data">
          {{ withdrawalInfo.Lst_Account }}
        </p>
      </li>

      <li class="withdrawal__li theme-li-dataView">
        <span class="withdrawal__li__title theme-dataView-header">
          {{ $t('transaction.withdrawal.field.Lst_Currency') }}
        </span>
        <p class="withdrawal__li__content theme-dataView-data">
          {{ withdrawalInfo.Lst_Currency }}
        </p>
      </li>

      <li class="withdrawal__li theme-li-dataView">
        <span class="withdrawal__li__title theme-dataView-header">
          {{ $t('transaction.withdrawal.field.Lst_Point') }}
        </span>
        <button type="button" class="withdrawal__li__button ui-btn ui-btn-long" @click="transferToMain">
          {{ $t('transaction.withdrawal.button.allToMyWallet') }}
        </button>
      </li>

      <li class="withdrawal__li theme-li-dataView">
        <span class="withdrawal__li__title theme-dataView-header">
          {{ $t('transaction.withdrawal.field.Add_WithdrswalsPoint') }}
        </span>
        <select
          class="withdrawal__li__select withdrawal__li__select--currency ui-ddl"
          required
          v-model="currency"
          v-if="currencyList.length > 0"
        >
          <option value="">{{ $t('transaction.withdrawal.field.Lst_Currency') }}</option>
          <option :value="currencyItem.Value" v-for="currencyItem in currencyList" :key="currencyItem.Value">
            {{ currencyItem.Text }}
          </option>
        </select>
        <input
          class="withdrawal__li__input ui-ipt theme-ipt-dataview"
          :id="idMapper.transaction.withdrawal.field.Add_WithdrswalsPoint"
          type="number"
          :min="amountLimit.min"
          :max="amountLimit.max"
          step="100"
          placeholder="Please enter amount of withdrawal"
          autocomplete="off"
          v-model.number="amount"
          @change="changeAmount"
        />
      </li>

      <li class="withdrawal__li theme-li-dataView">
        <span class="withdrawal__li__title theme-dataView-header">
          {{ $t('transaction.withdrawal.field.Lst_Bank_name') }}
        </span>
        <p class="withdrawal__li__content theme-dataView-data">
          {{ bank.Lst_Bank_name }}
        </p>
      </li>

      <li class="withdrawal__li theme-li-dataView">
        <span class="withdrawal__li__title theme-dataView-header">
          {{ $t('transaction.withdrawal.field.Lst_BankAccount') }}
        </span>
        <p class="withdrawal__li__content theme-dataView-data">
          {{ bank.Lst_BankAccount }}
        </p>
      </li>

      <li class="withdrawal__li theme-li-dataView">
        <span class="withdrawal__li__title theme-dataView-header">
          {{ $t('transaction.withdrawal.field.Lst_Bank_Branches') }}
        </span>
        <p class="withdrawal__li__content theme-dataView-data">
          {{ bank.Lst_Bank_Branches }}
        </p>
      </li>

      <li class="withdrawal__li theme-li-dataView">
        <span class="withdrawal__li__title theme-dataView-header">
          {{ $t('transaction.withdrawal.field.Add_RealName') }}
        </span>
        <p class="withdrawal__li__content theme-dataView-data">
          {{ withdrawalInfo.Add_RealName }}
        </p>
      </li>

      <li class="withdrawal__li theme-li-dataView">
        <span class="withdrawal__li__title theme-dataView-header">
          {{ $t('transaction.withdrawal.field.password') }}
        </span>
        <input
          class="withdrawal__li__input ui-ipt theme-ipt-dataview"
          :id="idMapper.transaction.withdrawal.field.password"
          type="password"
          required
          minlength="6"
          pattern="^[a-zA-Z0-9]*$"
          v-model="password"
        />
        <div class="theme-errorMsg" v-if="errorPassword">
          <span class="theme-txt-errorMsg">{{ errorPassword }}</span>
        </div>
      </li>
    </ul>
    <div class="withdrawal__light-message">
      {{ $t('transaction.withdrawal.hightLightMessage', { amountLimitMin: amountLimit.min }) }}
    </div>
    <div class="withdrawal__button-div">
      <button
        type="submit"
        class="withdrawal__button--submit ui-btn ui-btn-long"
        :id="idMapper.transaction.withdrawal.button.submit"
        :disabled="!validateForm()"
      >
        {{ $t('ui.button.submit') }}
      </button>
    </div>
    <ol class="withdrawal__notice ui-ol-memberNotice">
      <li v-for="notice in noticeList" :key="notice">{{ $t(`transaction.withdrawal.notice.${notice}`) }}</li>
    </ol>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import { getWithdrawalInfo, Withdrawal } from '@/api/transaction-withdrawal';
import { transferAllGamePointToMain } from '@/api/transaction-transfer';

import numeral from 'numeral';
import idMapper from '@/idMapper';
export default {
  name: 'TransactionWithdrawal',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss', 'lang']),
    walletAmount() {
      return this.withdrawalInfo.Lst_Point || 0;
    },
  },
  data() {
    return {
      idMapper: idMapper,
      numeral: numeral,
      withdrawalInfo: {},
      errorPassword: '',
      bankList: [],
      currencyList: [],
      bank: {},
      currency: '',
      amount: 0,
      password: '',
      amountLimit: {
        min: 100,
        max: 30000,
      },
      noticeList: ['contact'],
    };
  },
  methods: {
    async getWithdrawalInfo() {
      const result = await getWithdrawalInfo();
      console.log('[Withdrawal]', result.RetObj);
      this.withdrawalInfo = result.RetObj;
      this.bankList = result.RetObj.Add_MemberBankAccountList;
      this.currencyList = result.RetObj.BaseCurrencyItem;

      //* 若會員的 Add_MemberBankAccountList 為空，則轉去會員中心
      if (this.bankList.length < 0) {
        this.$router.replace({ name: 'UserProfile' });
      }

      this.amountLimit.min = result.RetObj.WithalDownlimit;
      this.amountLimit.max = result.RetObj.WithalUplimit;
    },
    async transferToMain() {
      const result = await transferAllGamePointToMain();
      if (result.Code == 200) {
        console.log('[TransferToMain]', result.RetObj);
        const wallet = this.withdrawalInfo.Lst_Point;
        wallet.value = result.RetObj.GameSitePoints.find(item => item.Product_id == 9999).Point;
        window.alert(result.RetObj.MsgString);
      }
    },
    async submitWithdrawal() {
      if (!this.validateForm()) {
        return;
      }
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

      console.log('[WithdrawalRequestData]', requestData);

      const result = await Withdrawal(requestData);
      console.log('[Withdrawal]', result);
      if (result.Code == 200) {
        this.$router.push({ name: 'TransactionRecordContent', params: { name: 'withdrawal' } });
      }
    },
    changeAmount() {
      if (this.amount > this.walletAmount || this.amount > this.amountLimit.max) {
        this.amount = this.walletAmount < this.amountLimit.max ? this.walletAmount : this.amountLimit.max;
      } else if (this.amount < this.amountLimit.min) {
        this.amount = this.amountLimit.min;
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
        this.amount < this.amountLimit.min ||
        this.amount > this.amountLimit.max ||
        this.amount > this.walletAmount ||
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
  watch: {
    siteID: {
      immediate: true,
      async handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/transaction/withdrawal.scss`);

        this.getWithdrawalInfo();
      },
    },
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
