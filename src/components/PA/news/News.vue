<template>
  <div class="news" :class="{ 'news-auth': userIsLoggedIn }">
    <div class="ui-panel-tab">
      <component :is="PanelTabs" :list="tabList" />

      <div class="ui-panel-tab__content news__content">
        <div class="news__item" v-for="(item, index) in newsList" :key="index">
          <div class="news__item__date">
            <div class="news__item__date__content">{{ getDateTime(item.Lst_StartDateTime) }}</div>
          </div>
          <div class="news__item__content">{{ item.Lst_Content }}</div>
        </div>

        <div class="ui-no-data" v-show="newsList.length === 0">{{ $t('ui.label.noData') }}</div>

        <intersect @enter="changePageScroll">
          <div></div>
        </intersect>

        <!-- <AppPagination
          :count="pagination.count"
          :page="pagination.page"
          :pagesize="pagination.pagesize"
          @change-page="changePage"
          v-show="newsList.length > 0"
        /> -->
      </div>
    </div>
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
    AppPagination: () => import('@/components/AppPagination'),
    Intersect,
  },
  computed: {
    ...mapGetters(['siteSetting', 'userIsLoggedIn']),
    PanelTabs() {
      return () => import(`@/${this.siteSetting.components.user.PanelTabs}`);
    },
    getDateTime: () => datetime => {
      return datetime.replace('T', ' ');
    },
  },
  data() {
    return {
      tabList: [
        {
          route: 'UserMail',
          text: 'user.nav.mail',
          otherActiveRoute: ['UserMailDetail', 'UserMailSend'],
        },
        {
          route: 'News',
          text: 'news.title',
          otherActiveRoute: [],
        },
        // {
        //   route: 'About',
        //   text: 'about.title',
        //   otherActiveRoute: [],
        // },
      ],
    };
  },
  mounted() {
    this.importStyleByFilename('news');
  },
};
</script>
