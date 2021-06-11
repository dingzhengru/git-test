import { mapGetters } from 'vuex';
import { apiGetRecordAdjustment } from '@/api/transaction-record';

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
      const result = await apiGetRecordAdjustment(requestData);

      if (isScroll) {
        this.recordList = this.recordList.concat(result.RetObj.Rows);
      } else {
        this.recordList = result.RetObj.Rows;
      }

      this.pagination.count = result.RetObj.Records;
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
