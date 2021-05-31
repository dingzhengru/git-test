import { apiGetNewsList, apiPostNewsList } from '@/api/notification';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn']),
    totalPage() {
      return Math.ceil(this.pagination.count / this.pagination.pagesize);
    },
    newsListFiltered() {
      return this.newsList.filter(item => {
        const datetimeEnd = this.$dayjs(item.Lst_EndDateTime);
        const now = this.$dayjs().tz('Africa/Abidjan');
        return now.isBefore(datetimeEnd);
      });
    },
  },
  data() {
    return {
      newsList: [],
      pagination: {
        page: 1,
        pagesize: 10,
        count: 0,
      },
      // newsList: [
      //   {
      //     Lst_StartDateTime: '2020-07-29 10:27:52',
      //     Lst_Content: `test`,
      //   },
      //   {
      //     Lst_StartDateTime: '2018-03-29 20:05:03',
      //     Lst_Content: `3/29 測試消息內容`,
      //   },
      //   {
      //     Lst_StartDateTime: '2018-03-29 20:05:03',
      //     Lst_Content: `3/29 測試消息內容`,
      //   },
      // ],
      // pagination: {
      //   count: 2,
      //   page: 1,
      //   pagesize: 1,
      // },
    };
  },
  methods: {
    async getNewsList(isScroll = false) {
      let result = {};
      if (this.userIsLoggedIn) {
        const requestData = { Page: this.pagination.page };
        result = await apiPostNewsList(requestData);
      } else {
        const requestData = { Page: this.pagination.page, Lang: this.lang };
        result = await apiGetNewsList(requestData);
      }
      if (result.Code == 200) {
        this.pagination.count = result.RetObj.Records;
        if (isScroll) {
          this.newsList = this.newsList.concat(result.RetObj.Rows || []);
        } else {
          this.newsList = result.RetObj.Rows || [];
        }
      }
    },
    changePage(page) {
      this.pagination.page = page;
      this.getNewsList();
    },
    changePageScroll() {
      if (this.pagination.page >= this.totalPage) {
        return;
      }
      this.pagination.page = this.pagination.page + 1;
      this.getNewsList(true);
    },
    changePagesize(size) {
      this.pagination.pagesize = size;
    },
  },
  mounted() {
    this.getNewsList();
  },
  watch: {
    lang() {
      this.getNewsList();
    },
  },
};
