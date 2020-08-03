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
          text: 'notification.nav.news',
          link: 'NotificationNews',
          class: 'ui-li-tabs-news',
          otherActivePath: [],
        },
        {
          name: 'Chats',
          text: 'notification.nav.chat',
          link: 'NotificationChat',
          class: 'ui-li-tabs-mail',
          otherActivePath: ['NotificationChatDetail'],
        },
        {
          name: 'Outbox',
          text: 'notification.nav.outbox',
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
