<template>
  <div class="user">
    <component :is="AppNavigationTab" :list="routeList" />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserHome',
  computed: {
    ...mapGetters(['siteSetting']),
    AppNavigationTab() {
      return () => import(`@/${this.siteSetting.components.app.AppNavigationTab}`);
    },
  },
  data() {
    return {
      routeList: [
        {
          name: 'profile',
          text: 'user.nav.profile',
          link: 'UserProfile',
          class: 'ui-li-tabs-account',
          otherActivePath: [],
        },
        {
          name: 'changePassword',
          text: 'user.nav.changePassword',
          link: 'UserChangePassword',
          class: 'ui-li-tabs-password',
          otherActivePath: [],
        },
      ],
    };
  },
};
</script>

<style scoped>
.user {
  padding: 88px 20px 160px 20px;
}
</style>
