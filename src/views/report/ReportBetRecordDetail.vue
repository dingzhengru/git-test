<template>
  <div class="report-bet-record">
    <ReportBetRecordDetailTable :title="title" :recordList="recordList" />

    <div class="report-bet-record__button-div">
      <button class="report-bet-record__button--return ui-btn ui-btn-long" @click="$router.go(-1)">
        {{ $t('report.betRecordDetail.button.back') }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import numeral from 'numeral';
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
      numeral: numeral,
      title: '',
      recordList: [
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
      ],
    };
  },
  mounted() {
    this.title = `${this.$t('report.betRecordDetail.title')} ${this.$route.params.date}`;
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
  },
};
</script>

<style scoped>
.report-bet-record__button-div {
  text-align: center;
}
</style>
