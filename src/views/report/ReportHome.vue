<template>
  <div class="report">
    <AppNavigationTab :list="routeList" />
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'ReportHome',
  components: {
    AppNavigationTab: () => import('@/components/AppNavigationTab'),
  },
  data() {
    return {
      routeList: [
        {
          name: 'unsettleBet',
          text: 'report.nav.unsettleBet',
          link: 'ReportUnsettleBet',
          class: 'ui-li-tabs-uns',
          otherActivePath: [],
        },
        {
          name: 'betRecord',
          text: 'report.nav.betRecord',
          link: 'ReportBetRecord',
          class: 'ui-li-tabs-bethistory',
          otherActivePath: [],
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
