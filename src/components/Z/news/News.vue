<template>
  <div class="news" :class="{ 'news-auth': userIsLoggedIn }">
    <div class="news__item" v-for="(item, index) in newsList" :key="index">
      <div class="news__item__date">
        <div class="news__item__date__label">时间</div>
        <div class="news__item__date__content">{{ item.Lst_StartDateTime }}</div>
      </div>
      <div class="news__item__content">{{ item.Lst_Content }}</div>
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
import { mapGetters } from 'vuex';
export default {
  name: 'News',
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['siteFullCss', 'userIsLoggedIn']),
  },
  data() {
    return {
      newsList: [
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
        count: 2,
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
  async mounted() {
    import(`@/styles/${this.siteFullCss}/news.scss`);
  },
};
</script>
