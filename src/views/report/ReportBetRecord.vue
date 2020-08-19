<template>
  <div class="report-bet-record">
    <div class="report-bet-record__field">
      <select class="report-bet-record__field__select ui-ddl" v-model="dateRange">
        <option :value="dateRangeItem" v-for="dateRangeItem in dateRangeList" :key="dateRangeItem.value">
          {{ $t(`report.betRecord.dateRange.${dateRangeItem.name}`) }}
        </option>
      </select>
    </div>
    <div class="report-bet-record__box theme-content-box" v-if="dateRange.name != 'today'">
      <h3 class="report-bet-record__title theme-h3-boxTitle">
        {{ $t(`report.betRecord.dateRange.${dateRange.name}`) }}
      </h3>
      <table class="report-bet-record__table ui-table03">
        <thead>
          <tr class="report-bet-record__table__tr">
            <th>{{ $t(`report.betRecord.table.date`) }}</th>
            <th>{{ $t(`report.betRecord.table.totalWinLose`) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="report-bet-record__table__tr" v-for="item in weekList" :key="item.date">
            <td class="report-bet-record__table__td-1st td-1st">{{ item.date }}</td>
            <td
              class="report-bet-record__table__td-2nd td-2nd"
              :class="{ 'ui-txt-positive': item.winLose > 0, 'ui-txt-negative': item.winLose < 0 }"
            >
              {{ numeral(item.winLose).format('0,0.00') }}
              <router-link
                class="ui-lnk-detail"
                :to="{ name: 'ReportBetRecordDetail', params: { date: item.date } }"
                v-if="item.hasDetail"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ReportBetRecordDetailTable
      :title="$t(`report.betRecord.dateRange.${dateRange.name}`)"
      :recordList="recordList"
      v-if="dateRange.name == 'today'"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import numeral from 'numeral';
export default {
  name: 'ReportBetRecord',
  components: {
    ReportBetRecordDetailTable: () => import('@/components/report/ReportBetRecordDetailTable'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      numeral: numeral,
      dateRangeList: [
        {
          name: 'today',
          value: 'today',
        },
        {
          name: 'thisWeek',
          value: 'thisWeek',
        },
        {
          name: 'lastWeek',
          value: 'lastWeek',
        },
      ],
      weekList: [
        {
          date: '2020-07-27 (GMT+8)',
          winLose: -216,
          hasDetail: true,
        },
        {
          date: '2020-07-28 (GMT+8)',
          winLose: 8228,
          hasDetail: true,
        },
      ],
      dateRange: { name: 'today', value: 'today' },
      recordList: [],
    };
  },
  methods: {
    changeDateRange() {
      console.log('[ReportBetRecord] changeDateRange:', this.dateRange);
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/report/report-bet-record-detail.scss`);

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
    dateRange: {
      immediate: true,
      handler() {
        console.log('[ReportBetRecord]:', this.dateRange.name);
        if (this.dateRange.name == 'today') {
          this.recordList = [
            {
              id: '00000',
              game: 'RNG-RG電子',
              count: 3,
              totalAmount: 240,
              validAmount: 240,
              totalWinLose: -216,
              prize: 0,
            },
            {
              id: '11111',
              game: 'RNG-CQ9 RNG',
              count: 1,
              totalAmount: 40,
              validAmount: 40,
              totalWinLose: 8228,
              prize: 0,
            },
          ];
        }
      },
    },
  },
};
</script>

<style scoped>
.report-bet-record {
  margin-top: 40px;
}

.report-bet-record__field {
  text-align: center;
}

.report-bet-record__field__select {
  width: 100%;
  padding: 0 1.5%;
}

.report-bet-record__box {
  margin: 30px 0;
}

.report-bet-record__table {
  margin: 30px 0;
  position: relative;
}

.report-bet-record__table__tr {
  text-align: center;
}

.report-bet-record__table__td-2nd {
  padding-right: 48px;
  text-align: center;
  position: relative;
}
</style>
