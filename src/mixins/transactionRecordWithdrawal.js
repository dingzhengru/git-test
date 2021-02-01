import { mapGetters } from 'vuex';
import { apiGetRecordWithdrawal } from '@/api/transaction-record';

export default {
  computed: {
    ...mapGetters(['lang']),
  },
  data() {
    return {
      recordList: [],
    };
  },
  methods: {
    async getRecord() {
      const result = await apiGetRecordWithdrawal();
      this.recordList = result.RetObj.Rows.map(item => {
        item.isShowDetail = false;
        return item;
      });
    },
    goRecordDetail(record) {
      if (record.Lst_Status == 2) {
        const query = { TransID: record.Lst_TransID };
        this.$router.push({ name: 'TransactionRecordWithdrawalDetail', query });
      }
    },
  },
  mounted() {
    this.getRecord();
  },
  watch: {
    lang() {
      this.getRecord();
    },
  },
};
