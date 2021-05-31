import { mapGetters } from 'vuex';
import { apiGetRecordWithdrawal } from '@/api/transaction-record';

export default {
  computed: {
    ...mapGetters(['lang']),
  },
  data() {
    return {
      recordList: [],

      // recordList: [
      //   {
      //     Lst_CreateTime: '2021-03-03 09:33:13',
      //     Lst_MoneyPayment: 100.0,
      //     Lst_Charges: 0.0,
      //     Lst_Mtime: 'N/A',
      //     Lst_StatusName: '审核中',
      //     Lst_TransID: 'CR210303093313297',
      //     isShowDetail: false,
      //   },
      // ],
    };
  },
  methods: {
    async getRecord() {
      const result = await apiGetRecordWithdrawal();

      if (result.Code === 200) {
        this.recordList = result.RetObj.Rows.map(item => {
          item.isShowDetail = false;
          return item;
        });
      }
    },
    toggleRecordDetail(record) {
      record.isShowDetail = !record.isShowDetail;
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
