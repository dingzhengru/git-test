import { mapGetters } from 'vuex';
import { apiGetRecordWithdrawalRestriction } from '@/api/transaction-record';
import mixinPagination from '@/mixins/pagination';

export default {
  mixins: [mixinPagination],
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
    changePageHandler(page) {
      this.changePage(page);
      this.getRecord();
    },
    changePageScrollHandler() {
      const result = this.changePageScroll();
      if (result === true) {
        this.getRecord(true);
      }
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
