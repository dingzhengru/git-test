<template>
  <div class="user">
    <AppNavigationTab :list="routeList" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'UserHome',
  components: {
    AppNavigationTab: () => import('@/components/AppNavigationTab'),
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
