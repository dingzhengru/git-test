<template>
  <div class="user">
    <component :is="AppNavTab" :list="navList" />
    <router-view />
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import { mapGetters } from 'vuex';
export default {
  name: 'UserHome',
  mixins: [mixinStyleLoader],
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
          route: 'UserProfile',
          text: 'user.nav.profile',
          otherActiveRoute: [],
        },
        {
          text: 'user.nav.changePassword',
          route: 'UserChangePassword',
          otherActiveRoute: [],
        },
        {
          route: 'UserChangePasswordWithdrawal',
          text: 'user.nav.changePasswordWithdrawal',
          otherActiveRoute: [],
        },
        {
          route: 'UserMail',
          text: 'user.nav.mail',
          otherActiveRoute: ['UserMailDetail', 'UserMailSend'],
        },
      ],
    };
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/user.scss`);
    this.importStyleByFilename('user');

    if (this.$env === 'development' && this.$isLocalhost) {
      this.navList.push({
        route: 'UserPromotionMGMDetail',
        text: 'user.nav.promotionMGM',
        class: '',
        otherActiveRoute: ['UserPromotionMGMBonus'],
      });
    }
  },
};
</script>
