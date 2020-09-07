<template>
  <form class="withdrawal" @submit.prevent="submitWithdrawal">
    <ul class="withdrawal__ul theme-content-box">
      <li class="withdrawal__li theme-li-dataView" v-for="item in accountInfoList" :key="item.name">
        <span class="withdrawal__li__title theme-dataView-header">
          {{ $t(`transaction.withdrawal.field.${item.name}`) }}
        </span>
        <p class="withdrawal__li__content theme-dataView-data" v-if="item.value">
          {{ typeof item.value == 'number' ? numeral(item.value).format('0,0.00') : item.value }}
        </p>

        <template v-if="item.name == 'bankSelect'">
          <select class="withdrawal__li__select ui-ddl" v-model="bank" @change="changeBank">
            <option value="" selected>請選擇</option>
            <option :value="bankItem" v-for="bankItem in bankList" :key="bankItem.Lst_Bank_name">
              {{ bankItem.Text }}
            </option>
          </select>
        </template>

        <template v-if="item.name == 'Lst_Point'">
          <button type="button" class="withdrawal__li__button ui-btn ui-btn-long" @click="transferToMain">
            {{ $t('transaction.withdrawal.button.allToMyWallet') }}
          </button>
        </template>

        <template v-if="item.name == 'Add_WithdrswalsPoint'">
          <select
            class="withdrawal__li__select withdrawal__li__select--currency ui-ddl"
            required
            v-model="currency"
            v-if="currencyList.length > 0"
          >
            <option value="">{{ $t(`transaction.withdrawal.field.Lst_Currency`) }}</option>
            <option :value="currencyItem.Value" v-for="currencyItem in currencyList" :key="currencyItem.Value">
              {{ currencyItem.Text }}
            </option>
          </select>
          <input
            class="withdrawal__li__input ui-ipt theme-ipt-dataview"
            :id="idMapper.transaction.withdrawal.field[item.name]"
            type="number"
            :min="amountLimit.min"
            :max="amountLimit.max"
            step="100"
            placeholder="Please enter amount of withdrawal"
            autocomplete="false"
            v-model.number="amount"
            @change="changeAmount"
          />
        </template>

        <template v-if="item.name == 'password'">
          <input
            class="withdrawal__li__input ui-ipt theme-ipt-dataview"
            :id="idMapper.transaction.withdrawal.field[item.name]"
            type="password"
            required
            minlength="6"
            pattern="^[a-zA-Z0-9]*$"
            v-model="password"
          />
          <div class="theme-errorMsg" v-if="errorPassword">
            <span class="theme-txt-errorMsg">{{ errorPassword }}</span>
          </div>
        </template>
      </li>
    </ul>
    <div class="withdrawal__light-message">
      {{ $t('transaction.withdrawal.hightLightMessage.content') }}
      {{ amountLimit.min }}
      {{ $t('transaction.withdrawal.hightLightMessage.currency') }}
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
import { getWithdrawal, Withdrawal } from '@/api/transaction-withdrawal';
import { transferAllGamePointToMain } from '@/api/transaction-transfer';

import numeral from 'numeral';
import idMapper from '@/idMapper';
export default {
  name: 'TransactionWithdrawal',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      idMapper: idMapper,
      numeral: numeral,
      errorPassword: '',
      accountInfoList: [
        {
          name: 'bankSelect',
          value: '',
        },
        {
          name: 'Lst_Account',
          value: '',
        },
        {
          name: 'Lst_Currency',
          value: '',
        },
        {
          name: 'Lst_Point',
          value: '',
        },
        {
          name: 'Add_WithdrswalsPoint',
          value: '',
        },
        {
          name: 'Lst_Bank_name',
          value: '',
        },
        {
          name: 'Lst_BankAccount',
          value: '',
        },
        {
          name: 'Lst_Bank_Branches',
          value: '',
        },
        {
          name: 'Add_RealName',
          value: '',
        },
        {
          name: 'password',
          value: '',
        },
      ],
      bankList: [],
      currencyList: [],
      bank: '',
      currency: '',
      amount: 0,
      password: '',
      amountLimit: {
        min: 100,
        max: 10000,
      },
      noticeList: ['contact'],
    };
  },
  methods: {
    async transferToMain() {
      this.$store.commit('setIsLoading', true);
      const result = await transferAllGamePointToMain();
      if (result.Code == 200) {
        console.log('[TransferToMain]', result.RetObj);
        const wallet = this.accountInfoList.find(item => item.name == 'Lst_Point');
        wallet.value = result.RetObj.GameSitePoints.find(item => item.Product_id == 9999).Point;
        window.alert(result.RetObj.MsgString);
      }
      this.$store.commit('setIsLoading', false);
    },
    async submitWithdrawal() {
      if (!this.validateForm()) {
        return;
      }
      this.$store.commit('setIsLoading', true);
      const requestData = {
        Add_RealName: this.accountInfoList.find(item => item.name == 'Add_RealName').value,
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

      console.log('WithdrawalRequestData', requestData);

      const result = await Withdrawal(requestData);
      console.log('[Withdrawal]', result);
      if (result.Code == 200) {
        this.$router.push({ name: 'TransactionRecordContent', params: { name: 'withdrawal' } });
      } else if (result.Code == 500) {
        window.alert(result.ErrMsg);
      }

      this.$store.commit('setIsLoading', false);
    },
    changeBank() {
      if (!this.bank) {
        return;
      }
      this.accountInfoList.map(item => {
        if (this.bank[item.name]) {
          item.value = this.bank[item.name];
        }
      });
    },
    changeAmount() {
      const walletAmount = this.accountInfoList.find(item => item.name == 'Lst_Point').value;
      if (this.amount > walletAmount || this.amount > this.amountLimit.max) {
        this.amount = walletAmount < this.amountLimit.max ? walletAmount : this.amountLimit.max;
      } else if (this.amount < this.amountLimit.min) {
        this.amount = this.amountLimit.min;
      } else if (this.amount % 100 != 0) {
        //* 轉換最後兩位為 0
        const amountStringList = String(this.amount).split('');
        amountStringList[amountStringList.length - 1] = 0;
        amountStringList[amountStringList.length - 2] = 0;
        this.amount = Number(amountStringList.join(''));
      }
    },
    validateForm() {
      if (this.amount < this.amountLimit.min || this.amount > this.amountLimit.max || this.amount % 100 != 0) {
        return false;
      } else if (this.bank == '') {
        return false;
      } else if (this.password == '' || this.password.length < 6) {
        return false;
      } else {
        return true;
      }
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

        //* 關掉 loading
        // this.$store.commit('setIsLoading', false);

        const result = await getWithdrawal();
        console.log('[Withdrawal]', result.RetObj);
        this.bankList = result.RetObj.Add_MemberBankAccountList;
        this.currencyList = result.RetObj.BaseCurrencyItem;

        //* 若會員的 Add_MemberBankAccountList 為空，則轉去會員中心
        if (this.bankList.length < 0) {
          this.$router.replace({ name: 'UserProfile' });
        }

        this.accountInfoList.map(item => {
          if (result.RetObj[item.name]) {
            item.value = result.RetObj[item.name];
          }
        });
        this.amountLimit.min = result.RetObj.WithalDownlimit;
        this.$store.commit('setIsLoading', false);
      },
    },
  },
};
</script>

<style scoped>
.withdrawal {
  margin: 40px 0;
}

.withdrawal__li {
  list-style: none;
}

.withdrawal__li__select {
  padding: 0 1.5%;
  width: 100%;
}

.withdrawal__li__select--currency {
  margin-left: 5%;
  width: 95%;
}

.withdrawal__li__button {
  display: block;
  margin: 0 auto;
}

.withdrawal__button-div {
  margin: 40px 0;
  text-align: center;
}

.withdrawal__light-message {
  font-size: 2em;
}
</style>
