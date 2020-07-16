<template>
  <div class="transaction lay-are-pageContent">
    <ul class="ui-ul-tabs ul-tabs-deposit">
      <li
        class="ui-li-tabs ui-li-tabs-deposit"
        :class="[route.class, { 'ui-li-tabsActive': route.link == $route.name }]"
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
        },
        {
          name: 'Withdraw',
          link: 'TransactionWithdraw',
          class: 'ui-li-tabs-withdrawal',
        },
        {
          name: 'Transfer',
          link: 'TransactionTransfer',
          class: 'ui-li-tabs-wallet',
        },
        {
          name: 'Record',
          link: 'TransactionRecord',
          class: 'ui-li-tabs-pointrecord',
        },
      ],
    };
  },
};
</script>

<style scoped>
.transaction {
  padding-top: 88px;
  padding-bottom: 20px;
}

</style>
