<template>
  <div class="notification-news">
    <div class="notification-news__box theme-content-box" v-for="item in list" :key="item.Lst_StartDateTime">
      <p class="notification-news__box__date">
        {{ item.Lst_StartDateTime }}
      </p>
      <div v-html="item.Lst_Content"></div>
    </div>

    <AppPagination
      :count="pagination.count"
      :page="pagination.page"
      :pagesize="pagination.pagesize"
      @change-page="changePage"
    />
  </div>
</template>

<script>
import { apiGetNewsList } from '@/api/notification';
export default {
  name: 'NotificationNews',
  components: {
    AppPagination: () => import('@/components/AppPagination'),
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
        count: 0,
      },
    };
  },
  methods: {
    async getNewsList() {
      const requestData = { Page: this.pagination.page };
      const result = await apiGetNewsList(requestData);

      this.list = result.RetObj.Rows;
      this.pagination.count = result.RetObj.Records;
    },
    changePage(page) {
      this.pagination.page = page;
      this.getNewsList();
    },
  },
  mounted() {
    //* 取得最新消息
    this.getNewsList();
  },
};
</script>
