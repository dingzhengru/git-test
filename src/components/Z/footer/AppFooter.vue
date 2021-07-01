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
          route: 'Home',
          text: 'ui.label.home',
          id: 'footer.home',
          class: 'footer-nav__item--home',
          otherActiveRoute: [],
        },
        {
          route: 'Login',
          text: 'ui.button.login',
          id: 'footer.login',
          class: 'footer-nav__item--login',
          otherActiveRoute: ['Register'],
        },
        {
          route: 'Promotion',
          text: 'footer.promotion',
          id: 'footer.promotion',
          class: 'footer-nav__item--promotion',
          otherActiveRoute: ['PromotionDetail'],
        },
        {
          route: 'Contact',
          text: 'footer.contact',
          id: 'footer.contact',
          class: 'footer-nav__item--contact',
          otherActiveRoute: [],
        },
      ],
      authList: [
        {
          route: 'Home',
          text: 'ui.label.home',
          id: 'footer.home',
          class: 'footer-nav__item--home',
          otherActiveRoute: [],
        },
        {
          route: 'TransactionDepositBase',
          text: 'footer.transaction-2',
          id: 'footer.transaction',
          class: 'footer-nav__item--transaction',
          otherActiveRoute: [
            'TransactionDepositThirdParty',
            'TransactionDepositAutoCash',
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
          route: 'Promotion',
          text: 'footer.promotion',
          id: 'footer.promotion',
          class: 'footer-nav__item--promotion',
          otherActiveRoute: ['PromotionDetail'],
        },
        {
          route: 'Contact',
          text: 'footer.contact',
          id: 'footer.contact',
          class: 'footer-nav__item--contact',
          otherActiveRoute: [],
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
