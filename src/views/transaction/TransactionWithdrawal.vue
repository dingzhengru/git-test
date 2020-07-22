<template>
  <form class="withdraw" @submit.prevent="submitWithdrawal">
    <ul class="theme-content-box are-withdrawal">
      <li class="theme-li-dataView" v-for="item in accountInfoList" :key="item.name">
        <span class="theme-dataView-header">{{ item.title }}</span>
        <p class="theme-dataView-data" v-if="item.content">{{ item.content }}</p>

        <div v-if="item.name == 'balance'">
          <button
            type="button"
            class="ui-btn01 ui-btn-long btn-transferBack"
            id="GamePointBackToMain"
            @click="allGamePointBackToMain"
          >
            All to my wallet
          </button>
        </div>

        <div v-if="item.name == 'amount'">
          <input
            class="ui-ipt theme-ipt-dataview ipt-withdrawal"
            id="Add_WithdrswalsPoint"
            type="number"
            name="Add_WithdrswalsPoint"
            maxlength="12"
            size="20"
            step="0.01"
            title="Please enter amount of withdrawal"
            v-model="amount"
          />
        </div>

        <div v-if="item.name == 'password'">
          <input
            class="ui-ipt theme-ipt-dataview ipt-withdrawal"
            id="Add_Withdrawals_Password"
            type="password"
            name="Add_Withdrawals_Password"
            size="20"
            title="Please enter your passwords"
          />
          <div class="theme-errorMsg" v-if="errorPassword">
            <span class="theme-txt-errorMsg">{{ errorPassword }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="hightlightMsg">
      For the withdrawal amount, please fill in the hundred, the minimum withdrawal amount 500 THB
    </div>
    <div class="are-control">
      <button type="submit" class="ui-btn01 ui-btn-long btn-send" id="Withdrawals">Submit</button>
    </div>
    <ol class="ui-ol-memberNotice">
      <li>If you have any additional questions about your account details ,please contact our online service.</li>
    </ol>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TransactionWithdrawal',
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      errorPassword: '',
      accountInfoList: [
        {
          name: 'account',
          title: 'Account',
          content: 'ding01',
        },
        {
          name: 'currency',
          title: 'Specific Currency',
          content: 'Baht',
        },
        {
          name: 'balance',
          title: 'Wallet balance',
          content: '0.00',
        },
        {
          name: 'amount',
          title: 'Withdrawal Amount',
          content: '',
        },
        {
          name: 'bankName',
          title: 'Name of Bank',
          content: 'SCB',
        },
        {
          name: 'bankAccount',
          title: 'Bank Account',
          content: '1111111',
        },
        {
          name: 'bankBranch',
          title: 'Name of Branch',
          content: '分行00000',
        },
        {
          name: 'accountName',
          title: 'Account Name of Bank',
          content: 'first last',
        },
        {
          name: 'password',
          title: 'Password for Withdrawal',
          content: '',
        },
      ],
      amount: 0,
      password: '',
    };
  },
  methods: {
    allGamePointBackToMain() {
      console.log('allGamePointBackToMain');
    },
    submitWithdrawal() {
      console.log('submitWithdrawal');
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
      },
    },
  },
};
</script>

<style scoped>
/* .reg-main > */
.are-withdrawal {
  margin: 40px 0;
}
.are-control {
  margin: 40px 0;
  text-align: center;
}
/* .reg-main > .are-withdrawal > */
.btn-transferBack {
  display: block;
  margin: 0 auto;
}

.hightlightMsg {
  font-size: 2em;
}
</style>
