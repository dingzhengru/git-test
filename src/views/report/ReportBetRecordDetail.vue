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
    ...mapGetters(['siteID', 'siteFullCss', 'lang']),
  },
  data() {
    return {
      title: '',
      totalObject: {},
      recordList: [],
    };
  },
  methods: {
    async getBetHistoryDay() {
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
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/report/report-bet-record-detail.scss`);

    //* 取投注明細
    this.getBetHistoryDay();

    this.title = `${this.$t('report.betRecordDetail.title')} ${this.$route.params.date}`;
  },
  watch: {
    lang() {
      console.log(this.lang, this.$t('report.betRecordDetail.title'));
      this.title = `${this.$t('report.betRecordDetail.title')} ${this.$route.params.date}`;
      this.getBetHistoryDay();
    },
  },
};
</script>

<style scoped>
.report-bet-record__button-div {
  text-align: center;
}
</style>
