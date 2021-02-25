import { apiGetNewsList, apiPostNewsList } from '@/api/notification';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['lang', 'userIsLoggedIn']),
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
      //     Lst_Content: `<h2>test</h2>`,
      //   },
      //   {
      //     Lst_StartDateTime: '2018-03-29 20:05:03',
      //     Lst_Content: `<h2>3/29 測試消息內容</h2>`,
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
    async getNewsList() {
      let result = {};
      if (this.userIsLoggedIn) {
        const requestData = { Page: this.pagination.page };
        result = await apiPostNewsList(requestData);
      } else {
        const requestData = { Page: this.pagination.page, lang: this.lang };
        result = await apiGetNewsList(requestData);
      }
      if (result.Code == 200) {
        this.newsList = result.RetObj.Rows;
        this.pagination.count = result.RetObj.Records;
      }
    },
    changePage(page) {
      this.pagination.page = page;
      this.getNewsList();
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
