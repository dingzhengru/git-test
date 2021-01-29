<template>
  <div class="transaction">
    <component :is="AppNavTab" :list="routeList" />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionHome',
  computed: {
    ...mapGetters(['siteSetting', 'siteFullCss']),
    AppNavTab() {
      return () => import(`@/${this.siteSetting.components.app.AppNavTab}`);
    },
  },
  data() {
    return {
      routeList: [
        {
          name: 'deposit',
          link: 'TransactionDepositBase',
          text: 'transaction.nav.deposit',
          class: 'ui-li-tabs-deposit',
          id: 'transaction.nav.deposit',
          otherActivePath: [],
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
          class: 'ui-li-tabs-transfer',
          id: 'transaction.nav.transfer',
          otherActivePath: [],
        },
        {
          name: 'record',
          link: 'TransactionRecordHome',
          text: 'transaction.nav.record',
          class: 'ui-li-tabs-record',
          id: 'transaction.nav.record',
          otherActivePath: [
            'TransactionRecordDeposit',
            'TransactionRecordWithdrawal',
            'TransactionRecordTransfer',
            'TransactionRecordBonus',
            'TransactionRecordLottery',
            'TransactionRecordWithdrawalRestriction',
            'TransactionRecordAdjustment',
            'TransactionRecordDepositDetail',
            'TransactionRecordWithdrawalDetail',
            'TransactionRecordTransferDetail',
            'TransactionRecordWithdrawalRestrictionDetail',
          ],
        },
      ],
    };
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/transaction.scss`);
  },
};
</script>
