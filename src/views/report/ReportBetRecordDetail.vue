<template>
  <div class="report-bet-record">
    <ReportBetRecordDetailTable :title="title" :recordList="recordList" :totalObject="totalObject" />

    <div class="report-bet-record__button-div">
      <button class="report-bet-record__button--return ui-btn ui-btn-long" @click="$router.go(-1)">
        {{ $t('report.betRecordDetail.button.back') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getBetHistoryDay } from '@/api/report';

export default {
  name: 'ReportBetRecordDetail',
  components: {
    ReportBetRecordDetailTable: () => import('@/components/report/ReportBetRecordDetailTable'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      title: '',
      totalObject: {},
      recordList: [],
    };
  },
  mounted() {
    this.title = `${this.$t('report.betRecordDetail.title')} ${this.$route.params.date}`;
  },
  watch: {
    siteID: {
      immediate: true,
      async handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/report/report-bet-record-detail.scss`);

        //* 取投注明細
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

        const requestData = {
          Tag: 'DayOfWeek',
          Day: `${this.$route.params.date.split(' ')[0]} 12:00:00`,
        };

        const result = await getBetHistoryDay(requestData);
        if (result.Code == 200) {
          this.totalObject = {
            BetCount: result.RetObj.BetCount,
            TTLBet: result.RetObj.TTLBet,
            TTLNetWin: result.RetObj.TTLNetWin,
            JackpotScore: result.RetObj.JackpotScore,
          };
          this.recordList = result.RetObj.Rows;
        }
        console.log('[BetHistoryDay]', result);
      },
    },
  },
};
</script>

<style scoped>
.report-bet-record__button-div {
  text-align: center;
}
</style>
