<template>
  <div class="report-bet-record-detail">
    <component :is="ReportBetRecordDetailTable" :title="title" :recordList="recordList" :totalObject="totalObject" />

    <div class="report-bet-record-detail__button-div">
      <button class="report-bet-record-detail__button--return ui-btn ui-btn--long" @click="$router.go(-1)">
        {{ $t('report.betRecordDetail.button.back') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { apiGetBetHistoryDay } from '@/api/report';

export default {
  name: 'ReportBetRecordDetail',
  computed: {
    ...mapGetters(['lang', 'siteSetting']),
    ReportBetRecordDetailTable() {
      return () => import(`@/${this.siteSetting.components.report.ReportBetRecordDetailTable}`);
    },
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
    },
  },
  mounted() {
    //* 取投注明細
    this.getBetHistoryDay();

    this.title = `${this.$t('report.betRecordDetail.title')} ${this.$route.params.date}`;
  },
  watch: {
    lang() {
      this.title = `${this.$t('report.betRecordDetail.title')} ${this.$route.params.date}`;
      this.getBetHistoryDay();
    },
  },
};
</script>
