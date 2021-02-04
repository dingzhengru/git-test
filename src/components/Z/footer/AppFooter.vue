<template>
  <footer class="footer">
    <component :is="AppFooterNav" :routerList="list" />
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AppFooter',
  computed: {
    ...mapGetters(['siteSetting', 'userIsLoggedIn']),
    AppFooterNav() {
      return () => import(`@/${this.siteSetting.components.footer.AppFooterNav}`);
    },
  },
  data() {
    return {
      list: [],
      noAuthList: [
        {
          name: 'home',
          text: 'ui.label.home',
          link: 'Home',
          otherActivePath: [],
        },
        {
          name: 'login',
          text: 'ui.button.login',
          link: 'Login',
          otherActivePath: ['Register'],
        },
        {
          name: 'promotion',
          text: 'footer.promotion',
          link: 'Promotion',
          otherActivePath: ['PromotionContent'],
        },
        {
          name: 'contact',
          text: 'footer.contact',
          link: 'Contact',
          otherActivePath: [],
        },
      ],
      authList: [
        {
          name: 'home',
          text: 'ui.label.home',
          link: 'Home',
          otherActivePath: [],
        },
        {
          name: 'transaction',
          text: 'footer.transaction-2',
          link: 'TransactionDepositBase',
          otherActivePath: [
            'TransactionDepositThirdParty',
            'TransactionWithdrawal',
            'TransactionTransfer',
            'TransactionRecord',
            'TransactionRecordHome',
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
            'TransactionRecordBetHome',
            'TransactionRecordBetUnsettle',
            'TransactionRecordBetDay',
            'TransactionRecordBetWeek',
          ],
        },
        {
          name: 'promotion',
          text: 'footer.promotion',
          link: 'Promotion',
          otherActivePath: ['PromotionContent'],
        },
        {
          name: 'contact',
          text: 'footer.contact',
          link: 'Contact',
          otherActivePath: [],
        },
      ],
    };
  },
  watch: {
    userIsLoggedIn: {
      immediate: true,
      handler() {
        if (this.userIsLoggedIn) {
          this.list = this.authList;
        } else {
          this.list = this.noAuthList;
        }
      },
    },
  },
};
</script>
