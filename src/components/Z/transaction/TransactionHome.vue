<template>
  <div class="transaction">
    <component :is="AppNavTab" :list="navList" />
    <router-view />
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionHome',
  mixins: [mixinStyleLoader],
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss', 'siteIsWalletTypeNoTransfer']),
    AppNavTab() {
      return () => import(`@/${this.siteSetting.components.user.AppNavTab}`);
    },
  },
  data() {
    return {
      navList: [
        {
          route: 'TransactionDepositBase',
          text: 'transaction.nav.deposit',
          id: 'transaction.nav.deposit',
          otherActiveRoute: [
            'TransactionDepositThirdParty',
            'TransactionDepositThirdPartyPayment',
            'TransactionDepositAutoCash',
          ],
        },
        {
          route: 'TransactionWithdrawal',
          text: 'transaction.nav.withdrawal',
          id: 'transaction.nav.withdrawal',
          otherActiveRoute: [],
        },
        {
          route: 'TransactionTransfer',
          text: 'transaction.nav.transfer',
          id: 'transaction.nav.transfer',
          otherActiveRoute: [],
        },
        {
          route: 'TransactionRecordDeposit',
          text: 'transaction.nav.record',
          id: 'transaction.nav.record',
          otherActiveRoute: [
            'TransactionRecordHome',
            'TransactionRecordWithdrawal',
            'TransactionRecordTransfer',
            'TransactionRecordBonus',
            'TransactionRecordLottery',
            'TransactionRecordWithdrawalRestriction',
            'TransactionRecordAdjustment',
            'TransactionRecordBetHome',
            'TransactionRecordBetUnsettle',
            'TransactionRecordBetDay',
            'TransactionRecordBetWeek',
          ],
        },
      ],
    };
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/transaction.scss`);
    this.importStyleByFilename('transaction');

    this.$store.commit('setPageTitle', 'transaction.title');

    if (this.siteIsWalletTypeNoTransfer) {
      this.navList = this.navList.filter(item => item.route !== 'TransactionTransfer');
    }
  },
};
</script>
