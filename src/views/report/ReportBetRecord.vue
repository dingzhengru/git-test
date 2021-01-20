<template>
  <div class="report-bet-record">
    <div class="report-bet-record__field">
      <select class="report-bet-record__field__select ui-ddl" v-model="dateRange">
        <option :value="item" v-for="(item, index) in dateRangeList" :key="index">
          {{ $t(`report.betRecord.dateRange.${item}`) }}
        </option>
      </select>
    </div>
    <div class="report-bet-record__box theme-content-box" v-if="dateRange != 'Today'">
      <h3 class="report-bet-record__title theme-h3-boxTitle">
        {{ $t(`report.betRecord.dateRange.${dateRange}`) }}
      </h3>
      <table class="report-bet-record__table ui-table03">
        <thead>
          <tr>
            <th>{{ $t(`report.betRecord.table.date`) }}</th>
            <th>{{ $t(`report.betRecord.table.totalWinLose`) }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in weekList" :key="item.Lst_ReportDate">
            <td class="report-bet-record__table__td-1st td-1st">{{ item.Lst_ReportDate }}</td>
            <td
              class="report-bet-record__table__td-2nd td-2nd"
              :class="{
                'ui-txt-positive': item.Lst_MemberTTLNetWin > 0,
                'ui-txt-negative': item.Lst_MemberTTLNetWin < 0,
              }"
            >
              {{ $numeral(item.Lst_MemberTTLNetWin).format('0,0.00') }}
              <router-link
                class="ui-lnk-detail"
                :to="{ name: 'ReportBetRecordDetail', params: { date: item.Lst_ReportDate } }"
                v-if="item.Lst_BetCount > 0"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <component
      :is="ReportBetRecordDetailTable"
      :title="$t(`report.betRecord.dateRange.${dateRange}`)"
      :totalObject="totalObject"
      :recordList="recordList"
      v-if="dateRange == 'Today'"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { apiGetBetHistoryDay, apiGetBetHistoryWeek } from '@/api/report';
export default {
  name: 'ReportBetRecord',
  computed: {
    ...mapGetters(['lang', 'siteSetting']),
    ReportBetRecordDetailTable() {
      return () => import(`@/${this.siteSetting.components.report.ReportBetRecordDetailTable}`);
    },
  },
  data() {
    return {
      dateRangeList: ['Today', 'ThisWeek', 'LastWeek'],
      weekList: [],
      totalObject: {},
      recordList: [],
      dateRange: 'Today',
    };
  },
  methods: {
    async getReportBetRecord() {
      if (this.dateRange == 'Today') {
        const requestData = { Tag: this.dateRange };
        const result = await apiGetBetHistoryDay(requestData);

        if (result.Code == 200) {
          this.totalObject = {
            BetCount: result.RetObj.BetCount,
            TTLBet: result.RetObj.TTLBet,
            TTLNetWin: result.RetObj.TTLNetWin,
            JackpotScore: result.RetObj.JackpotScore,
          };
          this.recordList = result.RetObj.Rows;
        }
      } else {
        const requestData = { Tag: this.dateRange };
        const result = await apiGetBetHistoryWeek(requestData);

        this.recordList = [];

        if (result.Code == 200) {
          this.weekList = result.RetObj.Rows;
        }
      }
    },
  },
  mounted() {
    //* 為實現返回頁面還能在，上一次的選擇頁面中，使用 query 達成
    //* 若 query 的值不在選擇中，則轉到 Today (預設就是用此，所以不用改 dateRange)
    if (this.dateRangeList.includes(this.$route.query.date)) {
      this.dateRange = this.$route.query.date;
    } else {
      this.$router.push({ query: { date: 'Today' } });
    }
  },
  watch: {
    dateRange: {
      immediate: true,
      async handler() {
        this.$router.push({ query: { date: this.dateRange } });

        this.getReportBetRecord();
      },
    },
    lang() {
      this.getReportBetRecord();
    },
  },
};
</script>
