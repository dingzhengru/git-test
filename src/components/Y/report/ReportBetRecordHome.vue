<template>
  <div class="report-bet-record">
    <div class="report-bet-record__field">
      <select class="report-bet-record__field__select ui-ddl" v-model="route" @change="changeRoute">
        <option :value="item" v-for="item in routeList" :key="item.name">
          {{ $t(item.text) }}
        </option>
      </select>
    </div>

    <router-view />
  </div>
</template>

<script>
export default {
  name: 'ReportBetRecord',
  data() {
    return {
      route: {},
      routeList: [
        {
          name: 'today',
          text: 'report.nav.recordToday',
          link: 'ReportBetRecordDay',
          query: { Tag: 'Today' },
        },
        {
          name: 'thisWeek',
          text: 'report.nav.recordThisWeek',
          link: 'ReportBetRecordWeek',
          query: { Tag: 'ThisWeek' },
        },
        {
          name: 'lastWeek',
          text: 'report.nav.recordLastWeek',
          link: 'ReportBetRecordWeek',
          query: { Tag: 'LastWeek' },
        },
      ],
    };
  },
  methods: {
    updateRoute() {
      this.route = this.routeList.find(item => item.link == this.$route.name) || {};
    },
    changeRoute() {
      this.$router.push({ name: this.route.link, query: this.route.query });
    },
  },
  mounted() {
    this.updateRoute();
  },
  watch: {
    $route: {
      handler() {
        this.updateRoute();
      },
    },
  },
};
</script>
