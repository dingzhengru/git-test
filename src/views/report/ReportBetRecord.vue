<template>
  <div class="report-bet-record">
    <div class="report-bet-record__field">
      <select class="report-bet-record__field__select ui-ddl" v-model="dateRange">
        <option :value="dateRangeItem" v-for="(dateRangeItem, index) in dateRangeList" :key="index">
          {{ $t(`report.betRecord.dateRange.${dateRangeItem}`) }}
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
              {{ numeral(item.Lst_MemberTTLNetWin).format('0,0.00') }}
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

    <ReportBetRecordDetailTable
      :title="$t(`report.betRecord.dateRange.${dateRange}`)"
      :totalObject="totalObject"
      :recordList="recordList"
      v-if="dateRange == 'Today'"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import numeral from 'numeral';
import { apiGetBetHistoryDay, apiGetBetHistoryWeek } from '@/api/report';
export default {
  name: 'ReportBetRecord',
  components: {
    ReportBetRecordDetailTable: () => import('@/components/report/ReportBetRecordDetailTable'),
  },
  computed: {
    ...mapGetters(['lang', 'siteFullCss']),
  },
  data() {
    return {
      numeral: numeral,
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
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/report/report-bet-record-detail.scss`);

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

<style lang="scss" scoped>
.report-bet-record {
  margin-top: 40px;

  &__field {
    text-align: center;

    &__select {
      width: 100%;
      padding: 0 1.5%;
    }
  }

  &__box {
    margin: 30px 0;
  }

  &__table {
    margin: 30px 0;
    position: relative;

    tr {
      text-align: center;
    }

    &__td-2nd {
      padding-right: 48px;
      text-align: center;
      position: relative;
    }
  }
}
</style>

<style scoped>
/* .report-bet-record {
  margin-top: 40px;
} */

/* .report-bet-record__field {
  text-align: center;
} */

/* .report-bet-record__field__select {
  width: 100%;
  padding: 0 1.5%;
} */

/* .report-bet-record__box {
  margin: 30px 0;
} */

/* .report-bet-record__table {
  margin: 30px 0;
  position: relative;
} */

/* .report-bet-record__table__tr {
  text-align: center;
} */

/* .report-bet-record__table__td-2nd {
  padding-right: 48px;
  text-align: center;
  position: relative;
} */
</style>
