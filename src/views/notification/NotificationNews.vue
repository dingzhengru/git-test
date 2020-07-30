<template>
  <div class="notification-news">
    <div class="notification-news__box theme-content-box" v-for="item in pageData" :key="item.datetime">
      <p class="notification-news__box__date">
        2020-07-29 10:27:52
      </p>
      <div v-html="item.content"></div>
    </div>

    <AppPagination
      :length="list.length"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NotificationNews',
  components: {
    AppPagination: () => import('@/components/Y/AppPagination'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
    pageData() {
      const startAt = this.pagination.pagesize * (this.pagination.page - 1);
      const endAt = startAt + this.pagination.pagesize;
      return this.list.slice(startAt, endAt) || [];
    },
  },
  data() {
    return {
      list: [
        {
          datetime: '2020-07-29 10:27:52',
          content: `<h2>test</h2>`,
        },
        {
          datetime: '2018-03-29 20:05:03',
          content: `<h2>3/29 測試消息內容</h2>`,
        },
      ],
      pagination: {
        page: 1,
        pagesize: 1,
      },
    };
  },
  methods: {
    changePage(page) {
      this.pagination.page = page;
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/notification/notification-news.scss`);

        // * 根據版型引入 css (pagination)
        import(`@/styles/${this.siteFullCss}/pagination.scss`);
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
