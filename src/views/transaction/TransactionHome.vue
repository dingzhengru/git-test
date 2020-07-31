<template>
  <div class="transaction">
    <AppNavigationTab :list="routeList" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'TransactionHome',
  components: {
    AppNavigationTab: () => import('@/components/AppNavigationTab'),
  },
  data() {
    return {
      routeList: [
        {
          name: 'Deposit',
          text: 'transaction.nav.deposit',
          link: 'TransactionDeposit',
          class: 'ui-li-tabs-deposit',
          otherActivePath: [],
        },
        {
          name: 'Withdrawal',
          text: 'transaction.nav.withdrawal',
          link: 'TransactionWithdrawal',
          class: 'ui-li-tabs-withdrawal',
          otherActivePath: [],
        },
        {
          name: 'Transfer',
          text: 'transaction.nav.transfer',
          link: 'TransactionTransfer',
          class: 'ui-li-tabs-wallet',
          otherActivePath: [],
        },
        {
          name: 'Record',
          text: 'transaction.nav.record',
          link: 'TransactionRecord',
          class: 'ui-li-tabs-pointrecord',
          otherActivePath: ['TransactionRecordContent', 'TransactionRecordDetail'],
        },
      ],
    };
  },
};
</script>

<style scoped>
.transaction {
  padding: 88px 20px 160px 20px;
}
</style>
