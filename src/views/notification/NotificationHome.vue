<template>
  <div class="notification">
    <component :is="AppNavTab" :list="routeList" />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NotificationHome',
  computed: {
    ...mapGetters(['siteSetting']),
    AppNavTab() {
      return () => import(`@/${this.siteSetting.components.app.AppNavTab}`);
    },
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
