import { mapGetters } from 'vuex';
import { apiGetBetHistoryWeek } from '@/api/report';
export default {
  name: 'mixinRecordBetWeek',
  computed: {
    ...mapGetters(['lang']),
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
    async getRecordWeek(requestData) {
      const result = await apiGetBetHistoryWeek(requestData);

      if (result.Code == 200) {
        this.recordList = result.RetObj.Rows;
      }
    },
    goRecordBetDay(record) {
      const query = {
        Tag: 'DayOfWeek',
        Day: `${record.Lst_ReportDate.split(' ')[0]} 12:00:00`,
      };

      this.$router.push({ name: 'TransactionRecordBetDay', query });
    },
  },
  mounted() {
    this.getRecordWeek(this.$route.query);
  },
  watch: {
    lang() {
      this.getRecordWeek(this.$route.query);
    },
    '$route.query': {
      handler() {
        this.getRecordWeek(this.$route.query);
      },
    },
  },
};
