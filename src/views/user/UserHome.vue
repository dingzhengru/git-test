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
          name: 'Personal Info',
          link: 'UserProfile',
          class: 'ui-li-tabs-account',
          otherActivePath: [],
        },
        {
          name: 'Password',
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
