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
        count: 0,
      },
    };
  },
  methods: {
    changePage(page) {
      this.pagination.page = page;
    },
    changePageScroll() {
      console.log(this.pagination.page, this.totalPage);
      if (this.pagination.page >= this.totalPage) {
        return false;
      }
      this.pagination.page = this.pagination.page + 1;
      return true;
    },
  },
};
