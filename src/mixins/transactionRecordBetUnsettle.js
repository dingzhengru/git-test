import { mapGetters } from 'vuex';
import { apiGetBetHistoryUnsettle } from '@/api/report';

export default {
  name: 'mixinRecordBetUnsettle',
  computed: {
    ...mapGetters(['lang']),
    totalRecord() {
      if (this.recordList.length === 0) {
        return {};
      }

      return this.recordList.reduce((acc, item) => {
        const Lst_BetCount = acc.Lst_BetCount + item.Lst_BetCount;
        const Lst_TTLBet = acc.Lst_TTLBet + item.Lst_TTLBet;
        const Lst_WaitMoney = acc.Lst_WaitMoney + item.Lst_WaitMoney;

        return {
          Lst_BetCount,
          Lst_TTLBet,
          Lst_WaitMoney,
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
    async getBetHistoryUnsettle() {
      const result = await apiGetBetHistoryUnsettle();
      if (result.Code == 200) {
        this.recordList = result.RetObj.Rows;
      }
    },
  },
  mounted() {
    this.getBetHistoryUnsettle();
  },
  watch: {
    lang() {
      this.getBetHistoryUnsettle();
    },
  },
};
