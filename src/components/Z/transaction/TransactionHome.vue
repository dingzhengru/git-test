<template>
  <div class="transaction">
    <component :is="AppNavTab" :list="navList" />
    <!-- <router-view /> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TransactionHome',
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
          link: 'TransactionDeposit',
          text: 'transaction.nav.deposit',
          class: '',
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
          class: '',
          id: 'transaction.nav.transfer',
          otherActivePath: [],
        },
        {
          name: 'record',
          link: 'TransactionRecordHome',
          text: 'transaction.nav.record',
          class: '',
          id: 'transaction.nav.record',
          otherActivePath: ['TransactionRecordContent', 'TransactionRecordDetail'],
        },
      ],
    };
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/transaction.scss`);
  },
};
</script>
