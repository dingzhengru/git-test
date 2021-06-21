<template>
  <div class="news" :class="{ 'news-auth': userIsLoggedIn }">
    <div class="news__item" v-for="(item, index) in newsListFiltered" :key="index">
      <div class="news__item__date">
        <div class="news__item__date__label">{{ $t('ui.label.time') }}</div>
        <div class="news__item__date__content">{{ getDateTime(item.Lst_StartDateTime) }}</div>
      </div>
      <div class="news__item__content">{{ item.Lst_Content }}</div>
    </div>

    <div class="ui-no-data" v-show="newsList.length === 0">{{ $t('ui.label.noData') }}</div>

    <intersect rootMargin="0px 0px 5px 0px" @enter="changePageScrollHandler">
      <div></div>
    </intersect>
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinNews from '@/mixins/news';
import { mapGetters } from 'vuex';
import Intersect from 'vue-intersect';
export default {
  name: 'News',
  mixins: [mixinStyleLoader, mixinNews],
  components: {
    Intersect,
  },
  computed: {
    ...mapGetters(['siteFullCss', 'userIsLoggedIn']),
    getDateTime: () => datetime => {
      return datetime.replace('T', ' ');
    },
  },
  mounted() {
    // import(`@/styles/${this.siteFullCss}/news.scss`);
    this.importStyleByFilename('news');

    this.$store.commit('setPageTitle', 'news.title');
  },
};
</script>
