<template>
  <form class="withdrawal" @submit.prevent="submitWithdrawal">
    <ul class="withdrawal__ul theme-content-box">
      <li class="withdrawal__ul__li theme-li-dataView" v-for="item in accountInfoList" :key="item.name">
        <span class="withdrawal__ul__li__title theme-dataView-header">
          {{ $t(`transaction.withdrawal.field.${item.name}`) }}
        </span>
        <p class="withdrawal__ul__li__content theme-dataView-data" v-if="item.content">
          {{ typeof item.content == 'number' ? numeral(item.content).format('0,0.00') : item.content }}
        </p>

        <template v-if="item.name == 'bankSelect'">
          <select class="withdrawal__ul__li__select ui-ddl" v-model="bank" @change="changeBank">
            <option value="" selected>請選擇</option>
            <option :value="bankItem" v-for="bankItem in bankList" :key="bankItem.Lst_Bank_name">
              {{ bankItem.Text }}
            </option>
          </select>
        </template>

        <template v-if="item.name == 'walletBalance'">
          <button type="button" class="withdrawal__ul__li__button ui-btn ui-btn-long" @click="allGamePointBackToMain">
            {{ $t('transaction.withdrawal.button.allToMyWallet') }}
          </button>
        </template>

        <template v-if="item.name == 'Add_WithdrswalsPoint'">
          <input
            class="withdrawal__ul__li__input ui-ipt theme-ipt-dataview"
            :id="idMapper.transaction.withdrawal.field[item.name]"
            type="number"
            max="30000"
            placeholder="Please enter amount of withdrawal"
            v-model.number="amount"
          />
        </template>

        <template v-if="item.name == 'password'">
          <input
            class="withdrawal__ul__li__input ui-ipt theme-ipt-dataview"
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
      {{ $t('transaction.withdrawal.hightLightMessage') }}
    </div>
    <div class="withdrawal__button-div">
      <button
        type="submit"
        class="withdrawal__button-div__submit ui-btn ui-btn-long"
        :id="idMapper.transaction.withdrawal.button.submit"
      >
        {{ $t('ui.button.submit') }}
      </button>
    </div>
    <ol class="withdrawal__notice ui-ol-memberNotice">
      <li v-for="notice in noticeList" :key="notice">{{ $t(notice) }}</li>
    </ol>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import { getWithdrawal, Withdrawal } from '@/api/transaction-withdrawal';

import numeral from 'numeral';
import idMapper from '@/idMapper';
export default {
  name: 'TransactionWithdrawal',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss', 'token']),
  },
  data() {
    return {
      idMapper: idMapper,
      numeral: numeral,
      errorPassword: '',
      accountInfoList: [
        {
          name: 'bankSelect',
          content: '',
        },
        {
          name: 'Lst_Account',
          content: '',
        },
        {
          name: 'Lst_Currency',
          content: '',
        },
        {
          name: 'Lst_Point',
          content: '',
        },
        {
          name: 'Add_WithdrswalsPoint',
          content: '',
        },
        {
          name: 'Lst_Bank_name',
          content: '',
        },
        {
          name: 'Lst_BankAccount',
          content: '',
        },
        {
          name: 'Lst_Bank_Branches',
          content: '',
        },
        {
          name: 'Add_RealName',
          content: '',
        },
        {
          name: 'password',
          content: '',
        },
      ],
      noticeList: ['transaction.withdrawal.notice.contact'],
      bankList: [],
      bank: '',
      amount: 0,
      password: '',
    };
  },
  methods: {
    allGamePointBackToMain() {
      console.log('allGamePointBackToMain');
    },
    async submitWithdrawal() {
      if (!this.bank || this.amount <= 0 || !this.password) {
        return;
      }
      const requestData = {
        Add_RealName: this.accountInfoList.find(item => item.name == 'Add_RealName').content,
        Add_MemberBankID: this.bank.Lst_BankID,
        Add_MemberBankName: this.bank.Lst_Bank_name,
        Add_MemberBankBranchesName: this.bank.Lst_Bank_Branches,
        Add_MemberBankAccount: this.bank.Lst_BankAccount,
        Add_WithdrswalsPoint: this.amount,
        Add_Withdrawals_Password: this.password,
        Add_Request_Currency: 'THB',
        Add_Exchange_Rate: 1,
        Add_PayMemo: '',
        Add_SelectBank: this.bank.Value,
      };

      console.log('WithdrawalRequestData', requestData);

      const result = await Withdrawal(requestData);
      console.log(result);
    },
    changeBank() {
      if (!this.bank) {
        return;
      }
      this.accountInfoList.map(item => {
        if (this.bank[item.name]) {
          item.content = this.bank[item.name];
        }
      });
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/transaction/withdrawal.scss`);

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
    token: {
      immediate: true,
      handler() {
        if (!this.token) {
          return;
        }
        getWithdrawal().then(result => {
          console.log('[Withdrawal]', result.RetObj);
          this.bankList = result.RetObj.Add_MemberBankAccountList;

          this.accountInfoList.map(item => {
            if (result.RetObj[item.name]) {
              item.content = result.RetObj[item.name];
            }
          });
        });
      },
    },
  },
};
</script>

<style scoped>
.withdrawal {
  margin: 40px 0;
}

.withdrawal__ul__li {
  list-style: none;
}

.withdrawal__ul__li__select {
  padding: 0 1.5%;
  width: 100%;
}

.withdrawal__ul__li__button {
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
