<template>
  <div class="report">
    <component :is="AppNavigationTab" :list="routeList" />
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ReportHome',
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
};
</script>

<style scoped>
.report {
  padding: 88px 20px 160px 20px;
}
</style>
