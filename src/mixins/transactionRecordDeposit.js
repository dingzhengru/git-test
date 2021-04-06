import { mapGetters } from 'vuex';
import { apiGetRecordDeposit } from '@/api/transaction-record';

export default {
  name: 'MixinTransactionRecordDeposit',
  computed: {
    ...mapGetters(['lang']),
  },
  data() {
    return {
      recordList: [],
      receiptImageUrl: '',
    };
  },
  methods: {
    async getRecord() {
      const result = await apiGetRecordDeposit();
      this.recordList = result.RetObj.Rows.map(item => {
        item.isShowDetail = false;
        return item;
      });
    },
    goRecordDetail(record) {
      if (record.Lst_Status == 2) {
        const query = { TransID: record.Lst_TransID };
        this.$router.push({ name: 'TransactionRecordDepositDetail', query });
      }
    },
    toggleRecordDetail(record) {
      record.isShowDetail = !record.isShowDetail;
    },
    openReceiptImage(record) {
      this.receiptImageUrl = record.Lst_ImageUrl;
    },
    closeReceiptImage() {
      this.receiptImageUrl = '';
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
