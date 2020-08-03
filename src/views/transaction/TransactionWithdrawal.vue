<template>
  <form class="withdrawal" @submit.prevent="submitWithdrawal">
    <ul class="withdrawal__ul theme-content-box">
      <li class="withdrawal__ul__li theme-li-dataView" v-for="item in accountInfoList" :key="item.name">
        <span class="withdrawal__ul__li__title theme-dataView-header">
          {{ $t(item.title) }}
        </span>
        <p class="withdrawal__ul__li__content theme-dataView-data" v-if="item.content">
          {{ typeof item.content == 'number' ? numeral(item.content).format('0,0.00') : item.content }}
        </p>

        <template v-if="item.name == 'walletBalance'">
          <button
            type="button"
            class="withdrawal__ul__li__button ui-btn ui-btn-long"
            id="GamePointBackToMain"
            @click="allGamePointBackToMain"
          >
            {{ $t('transaction.withdrawal.button.allToMyWallet') }}
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
            required
            minlength="6"
            pattern="^[a-zA-Z0-9]$"
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
      <button type="submit" class="withdrawal__button-div__submit ui-btn ui-btn-long">
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
import numeral from 'numeral';
export default {
  name: 'TransactionWithdrawal',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      numeral: numeral,

      errorPassword: '',
      accountInfoList: [
        {
          name: 'username',
          title: 'transaction.withdrawal.field.username',
          content: 'ding01',
        },
        {
          name: 'currency',
          title: 'transaction.withdrawal.field.currency',
          content: 'Baht',
        },
        {
          name: 'walletBalance',
          title: 'transaction.withdrawal.field.walletBalance',
          content: 10710,
        },
        {
          name: 'amount',
          title: 'transaction.withdrawal.field.amount',
          content: '',
        },
        {
          name: 'bank',
          title: 'transaction.withdrawal.field.bank',
          content: 'SCB',
        },
        {
          name: 'bankAccount',
          title: 'transaction.withdrawal.field.bankAccount',
          content: '1111111',
        },
        {
          name: 'bankBranch',
          title: 'transaction.withdrawal.field.bankBranch',
          content: '分行00000',
        },
        {
          name: 'bankAccountName',
          title: 'transaction.withdrawal.field.bankAccountName',
          content: 'first last',
        },
        {
          name: 'password',
          title: 'transaction.withdrawal.field.password',
          content: '',
        },
      ],
      noticeList: ['transaction.withdrawal.notice.contact'],
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

.withdrawal__ul__li {
  list-style: none;
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
