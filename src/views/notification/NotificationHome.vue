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
    AppNavigationTab: () => import('@/components/AppNavigationTab'),
  },
  data() {
    return {
      routeList: [
        {
          name: 'Latest News',
          link: 'NotificationNews',
          class: 'ui-li-tabs-news',
          otherActivePath: [],
        },
        {
          name: 'Chats',
          link: 'NotificationChat',
          class: 'ui-li-tabs-mail',
          otherActivePath: ['NotificationChatDetail'],
        },
        {
          name: 'Outbox',
          link: 'NotificationOutbox',
          class: 'ui-li-tabs-sendmail',
          otherActivePath: [],
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
