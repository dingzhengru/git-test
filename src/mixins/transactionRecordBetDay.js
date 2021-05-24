import { mapGetters } from 'vuex';
import { apiGetBetHistoryDay } from '@/api/report';
export default {
  name: 'mixinRecordBetDay',
  computed: {
    ...mapGetters(['lang']),
    isTagToday() {
      return this.$route.query.Tag === 'Today';
    },
    totalRecord() {
      if (this.recordList.length === 0) {
        return {};
      }

      return this.recordList.reduce((acc, item) => {
        const Lst_BetCount = acc.Lst_BetCount + item.Lst_BetCount;
        const Lst_TTLBet = acc.Lst_TTLBet + item.Lst_TTLBet;
        const Lst_TTLNetBet = acc.Lst_TTLNetBet + item.Lst_TTLNetBet;
        const Lst_MemberTTLNetWin = acc.Lst_MemberTTLNetWin + item.Lst_MemberTTLNetWin;
        const Lst_JackpotScore = acc.Lst_JackpotScore + item.Lst_JackpotScore;

        return {
          Lst_BetCount,
          Lst_TTLBet,
          Lst_TTLNetBet,
          Lst_MemberTTLNetWin,
          Lst_JackpotScore,
        };
      });
    },
  },
  data() {
    return {
      recordList: [],
    };
  },
  methods: {
    async getRecordDay(requestData) {
      const result = await apiGetBetHistoryDay(requestData);

      if (result.Code == 200) {
        this.recordList = result.RetObj.Rows;
        // this.totalRecord = {
        //   Lst_BetCount: result.RetObj.BetCount,
        //   Lst_TTLBet: result.RetObj.TTLBet,
        //   Lst_TTLNetWin: result.RetObj.TTLNetWin,
        //   Lst_JackpotScore: result.RetObj.JackpotScore,
        // };
      }
    },
  },
  mounted() {
    this.getRecordDay(this.$route.query);
  },
  watch: {
    lang() {
      this.getRecordDay(this.$route.query);
    },
  },
};
