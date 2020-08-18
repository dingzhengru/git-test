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
          name: 'TransactionDeposit',
          text: 'transaction.nav.deposit',
          link: 'TransactionDeposit',
          class: 'ui-li-tabs-deposit',
          id: 'transaction.nav.deposit',
          otherActivePath: [],
        },
        {
          name: 'TransactionWithdrawal',
          text: 'transaction.nav.withdrawal',
          link: 'TransactionWithdrawal',
          class: 'ui-li-tabs-withdrawal',
          id: 'transaction.nav.withdrawal',
          otherActivePath: [],
        },
        {
          name: 'TransactionTransfer',
          text: 'transaction.nav.transfer',
          link: 'TransactionTransfer',
          class: 'ui-li-tabs-wallet',
          id: 'transaction.nav.transfer',
          otherActivePath: [],
        },
        {
          name: 'TransactionRecordHome',
          text: 'transaction.nav.record',
          link: 'TransactionRecordHome',
          class: 'ui-li-tabs-pointrecord',
          id: 'transaction.nav.record',
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
