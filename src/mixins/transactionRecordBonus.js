import { mapGetters } from 'vuex';
import { apiGetRecordBonus } from '@/api/transaction-record';

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
      const result = await apiGetRecordBonus(requestData);
      this.recordList = result.RetObj.Rows;
      this.pagination.count = result.RetObj.Records;
    },
    changePage(page) {
      this.pagination.page = page;
      this.getRecord();
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
