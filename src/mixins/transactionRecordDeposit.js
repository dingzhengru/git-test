import { mapGetters } from 'vuex';
import { apiGetRecordDeposit, apiGetDepositImageUrl } from '@/api/transaction-record';

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
    async getDepositImageUrl(record) {
      if (!record.Lst_ImageUrl) {
        return;
      }

      const requestData = { ID: record.Lst_ImageUrl };
      const result = await apiGetDepositImageUrl(requestData);
      if (result.Code === 200) {
        this.receiptImageUrl = result.RetObj;
      } else {
        window.alert('No Image');
      }
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
      this.getDepositImageUrl(record);
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
