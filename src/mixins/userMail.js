import { apiGetInboxList } from '@/api/notification';
export default {
  name: 'MixinUserMail',
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
      pagination: {
        page: 1,
        pagesize: 10,
        count: 0,
      },

      search: {
        Category: -1,
        SearchKeyword: '',
      },
    };
  },
  methods: {
    async getInboxList() {
      const requestData = { Page: this.pagination.page, ...this.search };
      const result = await apiGetInboxList(requestData);

      this.list = result.RetObj.Rows;
      this.pagination.count = result.RetObj.Records;
    },
    goMailDetail(key) {
      this.$router.push({ name: 'UserMailDetail', params: { key } });
    },
    submitSearch() {
      this.getInboxList();
    },
    changePage(page) {
      this.pagination.page = page;
      this.getInboxList();
    },
  },
  mounted() {
    this.getInboxList();
  },
};
