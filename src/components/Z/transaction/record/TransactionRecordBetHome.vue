<template>
  <div class="record-content">
    <div class="ui-field record-content__field--bet">
      <select class="ui-field__select" v-model="route" @change="changeRoute">
        <option :value="item" v-for="item in routeList" :key="item.name">
          {{ $t(item.text) }}
        </option>
      </select>
    </div>
    <router-view />
  </div>
</template>

<script>
// import mixinTransactionRecordBet from '@/mixins/transactionRecordBet';

export default {
  name: 'TransactionRecordBetHome',
  mixins: [],
  data() {
    return {
      route: { name: 'unsettle', text: 'report.nav.unsettleBet', link: 'TransactionRecordBetUnsettle', query: {} },
      routeList: [
        {
          name: 'unsettle',
          text: 'report.nav.unsettleBet',
          link: 'TransactionRecordBetUnsettle',
          query: {},
        },
        {
          name: 'today',
          text: 'report.nav.recordToday',
          link: 'TransactionRecordBetDay',
          query: { Tag: 'Today' },
        },
        {
          name: 'thisWeek',
          text: 'report.nav.recordThisWeek',
          link: 'TransactionRecordBetWeek',
          query: { Tag: 'ThisWeek' },
        },
        {
          name: 'lastWeek',
          text: 'report.nav.recordLastWeek',
          link: 'TransactionRecordBetWeek',
          query: { Tag: 'LastWeek' },
        },
      ],
    };
  },
  methods: {
    updateRoute() {
      this.route =
        this.routeList.find(item => {
          if (this.$isObjEmpty(this.$route.query)) {
            return item.link === this.$route.name;
          }
          return item.link === this.$route.name && JSON.stringify(item.query) === JSON.stringify(this.$route.query);
        }) || this.routeList[0];
    },
    changeRoute() {
      this.$router.push({ name: this.route.link, query: this.route.query }).catch(() => {});
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
