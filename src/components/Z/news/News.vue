<template>
  <div class="news" :class="{ 'news-auth': userIsLoggedIn }">
    <div class="news__item" v-for="(item, index) in newsList" :key="index">
      <div class="news__item__date">
        <div class="news__item__date__label">{{ $t('ui.label.time') }}</div>
        <div class="news__item__date__content">{{ item.Lst_StartDateTime }}</div>
      </div>
      <div class="news__item__content">{{ item.Lst_Content }}</div>
    </div>

    <div class="ui-no-data" v-show="newsList.length === 0">{{ $t('ui.label.noData') }}</div>

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
import { mapGetters } from 'vuex';
export default {
  name: 'News',
  mixins: [mixinNews],
  components: {
    AppPagination: () => import('@/components/AppPagination'),
  },
  computed: {
    ...mapGetters(['siteFullCss', 'userIsLoggedIn']),
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/news.scss`);

    this.$store.commit('setPageTitle', 'news.title');
  },
};
</script>
