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
          name: 'member',
          text: 'footer.member',
          link: 'UserProfile',
          otherActivePath: [],
        },
        {
          name: 'login',
          text: 'footer.login',
          link: 'Login',
          otherActivePath: ['Register'],
        },
        {
          name: 'promotion',
          text: 'footer.promotion',
          link: 'Promotion',
          otherActivePath: ['PromotionDetail'],
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
          name: 'member',
          text: 'footer.member',
          link: 'UserProfile',
          otherActivePath: ['UserChangePassword'],
        },
        {
          name: 'transaction',
          text: 'footer.transaction',
          link: 'TransactionDepositBase',
          otherActivePath: [
            'TransactionDepositThirdParty',
            'TransactionWithdrawal',
            'TransactionTransfer',
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
