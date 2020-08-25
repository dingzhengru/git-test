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
          <tr class="report-bet-record__table__tr" v-for="item in weekList" :key="item.Lst_ReportDate">
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
      :title="$t(`report.betRecord.dateRange.${dateRange.name}`)"
      :totalObject="totalObject"
      :recordList="recordList"
      v-if="dateRange.name == 'today'"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import numeral from 'numeral';
import { getBetHistoryDay, getBetHistoryWeek } from '@/api/report';
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
          value: 'Today',
        },
        {
          name: 'thisWeek',
          value: 'ThisWeek',
        },
        {
          name: 'lastWeek',
          value: 'LastWeek',
        },
      ],
      weekList: [],
      dateRange: { name: 'today', value: 'Today' },
      totalObject: {},
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
      async handler() {
        console.log('[ReportBetRecord]:', this.dateRange.name);
        if (this.dateRange.name == 'today') {
          this.recordList = [
            {
              Lst_ProductName: 'RNG-RG電子',
              Lst_BetCount: 3,
              Lst_TTLBet: 240,
              Lst_TTLNetBet: 240,
              Lst_MemberTTLNetWin: -216,
              Lst_JackpotScore: 0,
            },
            {
              Lst_ProductName: 'RNG-CQ9 RNG',
              Lst_BetCount: 1,
              Lst_TTLBet: 40,
              Lst_TTLNetBet: 40,
              Lst_MemberTTLNetWin: 8228,
              Lst_JackpotScore: 0,
            },
          ];

          this.totalObject = {
            BetCount: 111,
            TTLBet: 2222,
            TTLNetWin: 33333,
            JackpotScore: 4444,
          };

          const requestData = { Tag: this.dateRange.value };
          const result = await getBetHistoryDay(requestData);
          console.log('[BetHistoryDay]', result);
        } else {
          this.weekList = [
            {
              Lst_BetCount: 4,
              Lst_MemberTTLNetWin: 0.0,
              Lst_ReportDate: '2020-08-24 (GMT+8)',
            },
            {
              Lst_BetCount: 0,
              Lst_MemberTTLNetWin: 0.0,
              Lst_ReportDate: '2020-08-25 (GMT+8)',
            },
            {
              Lst_BetCount: 0,
              Lst_MemberTTLNetWin: 0.0,
              Lst_ReportDate: '2020-08-26 (GMT+8)',
            },
            {
              Lst_BetCount: 0,
              Lst_MemberTTLNetWin: 0.0,
              Lst_ReportDate: '2020-08-27 (GMT+8)',
            },
            {
              Lst_BetCount: 0,
              Lst_MemberTTLNetWin: 0.0,
              Lst_ReportDate: '2020-08-28 (GMT+8)',
            },
            {
              Lst_BetCount: 0,
              Lst_MemberTTLNetWin: 0.0,
              Lst_ReportDate: '2020-08-29 (GMT+8)',
            },
            {
              Lst_BetCount: 0,
              Lst_MemberTTLNetWin: 0.0,
              Lst_ReportDate: '2020-08-30 (GMT+8)',
            },
          ];

          const requestData = { Tag: this.dateRange.value };
          const result = await getBetHistoryWeek(requestData);

          console.log('[BetHistoryWeek]', result);
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
