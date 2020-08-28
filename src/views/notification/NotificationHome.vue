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
          text: 'notification.nav.inbox',
          link: 'NotificationInbox',
          class: 'ui-li-tabs-mail',
          otherActivePath: ['NotificationInboxDetail'],
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
