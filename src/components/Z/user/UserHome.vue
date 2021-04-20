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
          name: 'profile',
          text: 'user.nav.profile',
          link: 'UserProfile',
          class: '',
          otherActiveRoute: [],
        },
        {
          name: 'changePassword',
          text: 'user.nav.changePassword',
          link: 'UserChangePassword',
          class: '',
          otherActiveRoute: [],
        },
        {
          name: 'changePasswordWithdrawal',
          text: 'user.nav.changePasswordWithdrawal',
          link: 'UserChangePasswordWithdrawal',
          class: '',
          otherActiveRoute: [],
        },
        {
          name: 'inbox',
          text: 'user.nav.mail',
          link: 'UserMail',
          class: '',
          otherActiveRoute: ['UserMailDetail', 'UserMailSend'],
        },
      ],
    };
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/user.scss`);
    this.importStyleByFilename('user');

    this.$store.commit('setPageTitle', 'user.title');
  },
};
</script>
