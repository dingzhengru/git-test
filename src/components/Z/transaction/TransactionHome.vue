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
    ...mapGetters(['siteSetting', 'siteFullCss']),
    AppNavTab() {
      return () => import(`@/${this.siteSetting.components.user.AppNavTab}`);
    },
  },
  data() {
    return {
      navList: [
        {
          name: 'deposit',
          link: 'TransactionDepositBase',
          text: 'transaction.nav.deposit',
          class: '',
          id: 'transaction.nav.deposit',
          otherActivePath: ['TransactionDepositThirdParty'],
        },
        {
          name: 'withdrawal',
          link: 'TransactionWithdrawal',
          text: 'transaction.nav.withdrawal',
          class: 'ui-li-tabs-withdrawal',
          id: 'transaction.nav.withdrawal',
          otherActivePath: [],
        },
        {
          name: 'transfer',
          link: 'TransactionTransfer',
          text: 'transaction.nav.transfer',
          class: '',
          id: 'transaction.nav.transfer',
          otherActivePath: [],
        },
        {
          name: 'record',
          link: 'TransactionRecordDeposit',
          text: 'transaction.nav.record',
          class: '',
          id: 'transaction.nav.record',
          otherActivePath: [
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
  },
};
</script>
