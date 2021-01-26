<template>
  <div class="user">
    <component :is="AppNavTab" :list="navList" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'UserHome',
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
          otherActivePath: [],
        },
        {
          name: 'changePassword',
          text: 'user.nav.changePassword',
          link: 'UserChangePassword',
          class: '',
          otherActivePath: [],
        },
        {
          name: 'changePasswordWithdrawal',
          text: 'user.nav.changePasswordWithdrawal',
          link: 'UserChangePasswordWithdrawal',
          class: '',
          otherActivePath: [],
        },
        {
          name: 'inbox',
          text: 'user.nav.inbox',
          link: 'UserInbox',
          class: '',
          otherActivePath: [],
        },
      ],
    };
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/user.scss`);
  },
};
</script>
