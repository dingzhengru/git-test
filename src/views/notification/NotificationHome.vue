<template>
  <div class="notification">
    <AppNavigationTab :list="routeList" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'NotificationHome',
  components: {
    AppNavigationTab: () => import('@/components/Y/AppNavigationTab'),
  },
  data() {
    return {
      routeList: [
        {
          name: 'Latest News',
          link: 'NotificationNews',
          class: 'ui-li-tabs-news',
        },
        {
          name: 'Chats',
          link: 'NotificationChat',
          class: 'ui-li-tabs-mail',
        },
        {
          name: 'Outbox',
          link: 'NotificationOutbox',
          class: 'ui-li-tabs-sendmail',
        },
      ],
    };
  },
};
</script>

<style scoped>
.notification {
  padding: 88px 20px 160px 20px;
}
</style>
