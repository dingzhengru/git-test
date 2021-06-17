export default {
  computed: {
    totalPage() {
      return Math.ceil(this.pagination.count / this.pagination.pagesize);
    },
  },
  data() {
    return {
      pagination: {
        page: 1,
        pagesize: 10,
        count: 1,
      },
    };
  },
  methods: {
    changePage(page) {
      this.pagination.page = page;
    },
    changePageScroll() {
      if (this.pagination.page >= this.totalPage) {
        return false;
      }
      this.pagination.page = this.pagination.page + 1;
      return true;
    },
    resetPagination() {
      this.pagination = { page: 1, pagesize: 10, count: 1 };
    },
  },
};
