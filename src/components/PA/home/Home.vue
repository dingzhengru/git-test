<template>
  <div class="home">
    <div class="ui-panel-tab home__main">
      <div
        class="ui-panel-tab__tabs home__main__tabs"
        ref="homePanelTab"
        @scroll.passive="handelScrollArrowY($event.target)"
      >
        <div
          class="ui-panel-tab__tabs__item"
          :class="{ active: productClassifyCurrent === hotGameClassify }"
          @click="productClassifyCurrent = hotGameClassify"
          v-if="gameListHot.length > 0"
        >
          {{ $t('ui.label.hotGame') }}
        </div>

        <div
          class="ui-panel-tab__tabs__item"
          :class="{ active: productClassifyCurrent === item.Lst_Game_Classify }"
          v-for="item in productClassifyListNoAll"
          :key="item.Lst_Game_Classify"
          @click="productClassifyCurrent = item.Lst_Game_Classify"
        >
          {{ $te(item.Lst_Game_Classify_Name) ? $t(item.Lst_Game_Classify_Name) : item.Lst_Game_Classify_Name }}
        </div>

        <!-- <div class="ui-panel-tab__tabs__item">Test</div> -->

        <div class="ui-panel-tab__tabs__arrow ui-panel-tab__tabs__arrow--bottom" v-show="isShowBottomArrow"></div>
      </div>

      <div class="ui-panel-tab__content home__main__content">
        <component :is="NewsMarquee" />
        <component :is="HomeProductBlock" :list="productBlockList" :classify="productClassifyCurrent" />
      </div>
    </div>

    <component :is="HomeFooter" />

    <ModalMessageC @close="isShowModalMessage = false" v-if="isShowModalMessage && !userIsLoggedIn" />
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import { mapGetters } from 'vuex';
import mixinScrollArrow from '@/mixins/_scrollArrow';
import { apiGetGameListHot, apiPostGameListHot } from '@/api/game';

export default {
  name: 'Home',
  mixins: [mixinStyleLoader, mixinScrollArrow],
  components: {
    ModalMessageC: () => import('@/components/ModalMessageC'),
  },
  computed: {
    ...mapGetters([
      'lang',
      'siteSetting',
      'siteMainPageNoticeUrl',
      'siteIsShowMainNotice',
      'userIsLoggedIn',
      'productClassifyList',
      'productListByClassify',
    ]),
    NewsMarquee() {
      return () => import(`@/${this.siteSetting.components.home.NewsMarquee}`);
    },
    HomeProductBlock() {
      return () => import(`@/${this.siteSetting.components.home.HomeProductBlock}`);
    },
    HomeFooter() {
      return () => import(`@/${this.siteSetting.components.home.HomeFooter}`);
    },
    productClassifyListNoAll() {
      return this.productClassifyList.slice(1);
    },
    gameListClassify() {
      if (this.productClassifyCurrent === this.hotGameClassify) {
        return this.gameListHot;
      }
      return [];
    },
    productBlockList() {
      if (typeof this.productClassifyCurrent === 'string') {
        return this.gameListClassify;
      }
      return this.productListByClassify(this.productClassifyCurrent);
    },
  },
  data() {
    return {
      // productClassifyCurrent: 1,
      productClassifyCurrent: 'hot',

      gameListHot: [],
      hotGameClassify: 'hot',

      isShowModalMessage: true,
    };
  },
  methods: {
    changeRoute(route) {
      if (route.name === 'GameLobbyFav' && !this.userIsLoggedIn) {
        return this.$store.dispatch('openModalAuth');
      }
      this.$router.push(route);
    },
    async getGameListHot() {
      let result = {};
      if (this.userIsLoggedIn) {
        result = await apiPostGameListHot();
      } else {
        const requestData = { Lang: this.lang };
        result = await apiGetGameListHot(requestData);
      }

      if (result.Code === 200) {
        this.gameListHot = result.RetObj.SiteHotGamesList;
      }
    },
  },
  mounted() {
    this.importStyleByFilename('home');

    this.initScrollArrowY(this.$refs.homePanelTab);

    this.getGameListHot();
  },
};
</script>
