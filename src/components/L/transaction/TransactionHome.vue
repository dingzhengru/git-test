<template>
  <div class="transaction">
    <div class="ui-panel-tab">
      <component :is="PanelTabs" :list="tabList" />

      <div class="ui-panel-tab__content">
        <router-view />
      </div>
    </div>
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
    PanelTabs() {
      return () => import(`@/${this.siteSetting.components.user.PanelTabs}`);
    },
  },
  data() {
    return {
      tabList: [
        {
          route: 'TransactionDepositBase',
          text: 'transaction.nav.deposit',
          otherActiveRoute: ['TransactionDepositThirdParty'],
        },
        {
          route: 'TransactionWithdrawal',
          text: 'transaction.nav.withdrawal',
          otherActiveRoute: [],
        },
        {
          route: 'TransactionTransfer',
          text: 'transaction.nav.transfer',
          otherActiveRoute: [],
        },
        {
          route: 'TransactionRecordDeposit',
          text: 'transaction.nav.record',
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
      this.tabList = this.tabList.filter(item => item.name !== 'transfer');
    }
  },
};
</script>
