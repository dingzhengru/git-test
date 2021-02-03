<template>
  <div class="notification-news">
    <div class="notification-news__box theme-content-box" v-for="item in newsList" :key="item.Lst_StartDateTime">
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
import mixinNews from '@/mixins/news';
export default {
  name: 'News',
  mixins: [mixinNews],
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
};
</script>
