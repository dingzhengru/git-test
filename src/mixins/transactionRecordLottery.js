import { mapGetters } from 'vuex';
import { apiGetRecordLottery } from '@/api/transaction-record';
import mixinPagination from '@/mixins/pagination';

export default {
  mixins: [mixinPagination],
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
      const result = await apiGetRecordLottery(requestData);

      if (isScroll) {
        this.recordList = this.recordList.concat(result.RetObj.Rows);
      } else {
        this.recordList = result.RetObj.Rows;
      }

      this.pagination.count = result.RetObj.Records;
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
