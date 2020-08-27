<template>
  <div class="notification-news">
    <div class="notification-news__box theme-content-box" v-for="item in list" :key="item.Lst_StartDateTime">
      <p class="notification-news__box__date">
        {{ item.Lst_StartDateTime }}
      </p>
      <div v-html="item.Lst_Content"></div>
    </div>

    <AppPagination
      :length="pagination.dataLength"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getNews } from '@/api/notification';
export default {
  name: 'NotificationNews',
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      list: [
        {
          Lst_StartDateTime: '2020-07-29 10:27:52',
          Lst_Content: `<h2>test</h2>`,
        },
        {
          Lst_StartDateTime: '2018-03-29 20:05:03',
          Lst_Content: `<h2>3/29 測試消息內容</h2>`,
        },
      ],
      pagination: {
        page: 1,
        pagesize: 10,
        dataLength: 0,
      },
    };
  },
  methods: {
    async getNews() {
      const requestData = { Page: this.pagination.page };
      const result = await getNews(requestData);
      console.log('[News]', result);

      this.list = result.RetObj.Rows;
      this.pagination.dataLength = result.RetObj.Records;
    },
    changePage(page) {
      this.pagination.page = page;
      this.getNews();
    },
  },
  watch: {
    siteID: {
      immediate: true,
      async handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/notification/notification-news.scss`);

        // * 根據版型引入 css (pagination)
        import(`@/styles/${this.siteFullCss}/pagination.scss`);

        //* 取得最新消息
        await this.getNews();

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
  },
};
</script>

<style scoped>
.notification-news__box {
  margin: 20px 0;
  padding-bottom: 20px;
  font-size: 2.769em;
}
.notification-news__box__date {
  margin: 20px 0;
  padding: 0 0 20px 63px;
  border-bottom: 1px solid #d6c388;
  font-size: 0.777em;
  line-height: 43px;
}
</style>
