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
    AppNavigationTab: () => import('@/components/Y/AppNavigationTab'),
  },
  data() {
    return {
      routeList: [
        {
          name: 'Deposit',
          link: 'TransactionDeposit',
          class: 'ui-li-tabs-deposit',
          otherActivePath: [],
        },
        {
          name: 'Withdrawal',
          link: 'TransactionWithdrawal',
          class: 'ui-li-tabs-withdrawal',
          otherActivePath: [],
        },
        {
          name: 'Transfer',
          link: 'TransactionTransfer',
          class: 'ui-li-tabs-wallet',
          otherActivePath: [],
        },
        {
          name: 'Record',
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
