import { mapGetters } from 'vuex';
import { apiGetRecordWithdrawalRestriction } from '@/api/transaction-record';

export default {
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['lang']),
    totalPage() {
      return Math.ceil(this.pagination.count / this.pagination.pagesize);
    },
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
    async getRecord(isScroll = false) {
      const requestData = { Page: this.pagination.page };
      const result = await apiGetRecordWithdrawalRestriction(requestData);

      const resultRecordList = result.RetObj.Rows.map(item => {
        return { ...item, isShowDetail: false };
      });

      if (isScroll) {
        this.recordList = this.recordList.concat(resultRecordList);
      } else {
        this.recordList = resultRecordList;
      }

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
    changePageScroll() {
      if (this.pagination.page >= this.totalPage) {
        return;
      }
      this.pagination.page = this.pagination.page + 1;
      this.getRecord(true);
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
