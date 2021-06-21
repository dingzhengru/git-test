import { apiGetInboxList } from '@/api/notification';
import mixinPagination from '@/mixins/pagination';
export default {
  name: 'MixinUserMail',
  mixins: [mixinPagination],
  data() {
    return {
      list: [],
      // list: [
      //   {
      //     Lst_Key: 1129,
      //     Lst_Subject: '[R][R][R]QATEST',
      //     Lst_SendTime: '2020-08-27T15:19:23',
      //   },
      //   {
      //     Lst_Key: 975,
      //     Lst_Subject: '[R]QATEST',
      //     Lst_SendTime: '2020-04-08T15:23:55',
      //   },
      // ],

      search: {
        Category: -1,
        SearchKeyword: '',
      },
    };
  },
  methods: {
    async getInboxList(isScroll = false) {
      const requestData = { Page: this.pagination.page, ...this.search };
      const result = await apiGetInboxList(requestData);

      if (isScroll) {
        this.list = this.list.concat(result.RetObj.Rows);
      } else {
        this.list = result.RetObj.Rows;
      }

      this.pagination.count = result.RetObj.Records;
    },
    goMailDetail(key) {
      this.$router.push({ name: 'UserMailDetail', params: { key } });
    },
    submitSearch() {
      this.getInboxList();
    },
    changePageHandler(page) {
      this.changePage(page);
      this.getInboxList();
    },
    changePageScrollHandler() {
      const result = this.changePageScroll();
      if (result === true) {
        this.getInboxList(true);
      }
    },
  },
  mounted() {
    this.getInboxList();
  },
};
