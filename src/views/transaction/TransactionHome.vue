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
          link: 'TransactionDeposit',
          text: 'transaction.nav.deposit',
          class: 'ui-li-tabs-deposit',
          id: 'transaction.nav.deposit',
          otherActivePath: [],
        },
        {
          name: 'TransactionWithdrawal',
          link: 'TransactionWithdrawal',
          text: 'transaction.nav.withdrawal',
          class: 'ui-li-tabs-withdrawal',
          id: 'transaction.nav.withdrawal',
          otherActivePath: [],
        },
        {
          name: 'TransactionTransfer',
          link: 'TransactionTransfer',
          text: 'transaction.nav.transfer',
          class: 'ui-li-tabs-wallet',
          id: 'transaction.nav.transfer',
          otherActivePath: [],
        },
        {
          name: 'TransactionRecordHome',
          link: 'TransactionRecordHome',
          text: 'transaction.nav.record',
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
