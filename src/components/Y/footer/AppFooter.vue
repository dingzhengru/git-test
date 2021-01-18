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
          link: 'UserProfile',
          otherActivePath: [],
        },
        {
          name: 'login',
          link: 'Login',
          otherActivePath: ['Register'],
        },
        {
          name: 'promotion',
          link: 'Promotion',
          otherActivePath: ['PromotionContent'],
        },
        {
          name: 'contact',
          link: 'Contact',
          otherActivePath: [],
        },
      ],
      authList: [
        {
          name: 'member',
          link: 'UserProfile',
          otherActivePath: ['UserChangePassword'],
        },
        {
          name: 'transaction',
          link: 'TransactionDeposit',
          otherActivePath: [
            'TransactionWithdrawal',
            'TransactionTransfer',
            'TransactionRecord',
            'TransactionRecordContent',
            'TransactionRecordDetail',
          ],
        },
        {
          name: 'promotion',
          link: 'Promotion',
          otherActivePath: ['PromotionContent'],
        },
        {
          name: 'contact',
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

<style lang="scss" scoped>
.footer {
  width: 100%;
  padding-top: 3px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 4;
}
</style>
