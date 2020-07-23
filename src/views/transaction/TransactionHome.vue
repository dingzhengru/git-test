<template>
  <div class="transaction">
    <ul class="ui-ul-tabs ul-tabs-deposit">
      <li
        class="ui-li-tabs ui-li-tabs-deposit"
        :class="[
          route.class,
          { 'ui-li-tabsActive': route.link == $route.name || route.otherActivePath.includes($route.name) },
        ]"
        v-for="route in transationRouteList"
        :key="route.link"
      >
        <router-link :to="{ name: route.link }" class="ui-lnk-tabs">{{ route.name }}</router-link>
      </li>
    </ul>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'TransactionHome',
  data() {
    return {
      transationRouteList: [
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
