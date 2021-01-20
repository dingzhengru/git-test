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
    ...mapGetters(['siteSetting', 'siteFullCss']),
    AppNavTab() {
      return () => import(`@/${this.siteSetting.components.app.AppNavTab}`);
    },
  },
  data() {
    return {
      routeList: [
        {
          name: 'news',
          text: 'notification.nav.news',
          link: 'NotificationNews',
          class: 'ui-li-tabs-news',
          otherActivePath: [],
        },
        {
          name: 'chats',
          text: 'notification.nav.inbox',
          link: 'NotificationInbox',
          class: 'ui-li-tabs-mail',
          otherActivePath: ['NotificationInboxDetail'],
        },
        {
          name: 'outbox',
          text: 'notification.nav.outbox',
          link: 'NotificationOutbox',
          class: 'ui-li-tabs-sendmail',
          otherActivePath: [],
        },
      ],
    };
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/notification.scss`);
  },
};
</script>
