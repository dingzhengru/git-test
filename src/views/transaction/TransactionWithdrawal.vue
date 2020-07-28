<template>
  <form class="withdrawal" @submit.prevent="submitWithdrawal">
    <ul class="withdrawal__ul theme-content-box">
      <li class="withdrawal__ul__li theme-li-dataView" v-for="item in accountInfoList" :key="item.name">
        <span class="withdrawal__ul__li__title theme-dataView-header">{{ item.title }}</span>
        <p class="withdrawal__ul__li__content theme-dataView-data" v-if="item.content">
          {{ typeof item.content == 'number' ? numeral(item.content).format('0,0.00')  : item.content }}
        </p>

        <template v-if="item.name == 'balance'">
          <button
            type="button"
            class="withdrawal__ul__li__button ui-btn ui-btn-long"
            id="GamePointBackToMain"
            @click="allGamePointBackToMain"
          >
            All to my wallet
          </button>
        </template>

        <template v-if="item.name == 'amount'">
          <input
            class="withdrawal__ul__li__input ui-ipt theme-ipt-dataview"
            type="number"
            maxlength="12"
            size="20"
            step="0.01"
            placeholder="Please enter amount of withdrawal"
            v-model="amount"
          />
        </template>

        <template v-if="item.name == 'password'">
          <input
            class="withdrawal__ul__li__input ui-ipt theme-ipt-dataview"
            type="password"
            size="20"
            placeholder="Please enter your password"
          />
          <div class="theme-errorMsg" v-if="errorPassword">
            <span class="theme-txt-errorMsg">{{ errorPassword }}</span>
          </div>
        </template>
      </li>
    </ul>
    <div class="withdrawal__light-message">
      For the withdrawal amount, please fill in the hundred, the minimum withdrawal amount 500 THB
    </div>
    <div class="withdrawal__button-div">
      <button type="submit" class="withdrawal__button-div__submit ui-btn ui-btn-long" id="Withdrawals">Submit</button>
    </div>
    <ol class="withdrawal__notice ui-ol-memberNotice">
      <li>If you have any additional questions about your account details ,please contact our online service.</li>
    </ol>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
import numeral from 'numeral';
export default {
  name: 'TransactionWithdrawal',
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      numeral: numeral,

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
          content: 10710,
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
.withdrawal {
  margin: 40px 0;
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
