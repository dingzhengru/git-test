import { mapGetters } from 'vuex';
import { apiGetRecordTransfer } from '@/api/transaction-record';
import { apiGetMemberProductList } from '@/api/product';

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
      productList: [],
      pagination: {
        page: 1,
        pagesize: 10,
        count: 0,
      },
      searchDateRangeList: [
        {
          name: 'lastWeek',
          value: 7,
        },
        {
          name: 'lastTwoWeek',
          value: 14,
        },
        {
          name: 'lastMonth',
          value: 30,
        },
      ],
      searchDateRange: '',
      search: {
        product: '',
        dateFrom: '',
        dateTo: '',
      },
    };
  },
  methods: {
    async getRecord(isScroll = false) {
      const requestData = {
        Page: this.pagination.page,
        ProductID: this.search.product,
        StartTime: this.search.dateFrom == '' ? '' : `${this.search.dateFrom} 00:00:00`,
        EndTime: this.search.dateTo == '' ? '' : `${this.search.dateTo} 23:59:59`,
      };
      const result = await apiGetRecordTransfer(requestData);

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
    async getMemberProductList() {
      const result = await apiGetMemberProductList();
      if (result.Code == 200) {
        this.productList = result.RetObj;
      }
    },
    goRecordDetail(record) {
      const query = { TransID: record.Lst_TransID };
      this.$router.push({ name: 'TransactionRecordTransferDetail', query });
    },
    submitSearch() {
      this.pagination.page = 1;
      this.getRecord();
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
    changeSearchDateRange() {
      this.search.dateTo = this.$dayjs().format('YYYY-MM-DD');
      this.search.dateFrom = this.$dayjs()
        .subtract(this.searchDateRange, 'day')
        .format('YYYY-MM-DD');
    },
  },
  mounted() {
    this.getRecord();
    this.getMemberProductList();
  },
  watch: {
    lang() {
      this.getRecord();
      this.getMemberProductList();
    },
  },
};
