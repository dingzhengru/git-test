<template>
  <div class="report">
    <component :is="AppNavTab" :list="routeList" />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ReportHome',
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
          name: 'unsettleBet',
          text: 'report.nav.unsettleBet',
          link: 'ReportUnsettleBet',
          class: 'ui-li-tabs-uns',
          id: '',
          otherActivePath: [],
        },
        {
          name: 'betRecord',
          text: 'report.nav.betRecord',
          link: 'ReportBetRecord',
          class: 'ui-li-tabs-bethistory',
          id: '',
          otherActivePath: ['ReportBetRecordDetail'],
        },
      ],
    };
  },
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/report.scss`);
  },
};
</script>
