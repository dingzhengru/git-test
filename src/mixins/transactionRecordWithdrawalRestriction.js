import { mapGetters } from 'vuex';
import { apiGetRecordWithdrawalRestriction } from '@/api/transaction-record';

export default {
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['lang']),
  },
  data() {
    return {
      recordList: [],
      pagination: {
        page: 1,
        pagesize: 10,
        count: 0,
      },
    };
  },
  methods: {
    async getRecord() {
      const requestData = { Page: this.pagination.page };
      const result = await apiGetRecordWithdrawalRestriction(requestData);
      this.recordList = result.RetObj.Rows.map(item => {
        item.isShowDetail = false;
        return item;
      });

      this.pagination.count = result.RetObj.Records;
    },
    goRecordDetail(record) {
      const query = {
        Procudtid: record.Lst_Procudt_id,
        BonusCode: record.Lst_Bonus_Code,
        WashCodeType: record.Lst_WashCodeType,
      };
      this.$router.push({ name: 'TransactionRecordWithdrawalRestrictionDetail', query });
    },
    changePage(page) {
      this.pagination.page = page;
      this.getRecord();
    },
    toggleRecordDetail(record) {
      record.isShowDetail = !record.isShowDetail;
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
