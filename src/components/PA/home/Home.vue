<template>
  <div class="home">
    <div class="ui-panel-tab home__main">
      <div class="ui-panel-tab__tabs home__main__tabs">
        <div
          class="ui-panel-tab__tabs__item"
          :class="{ active: productClassifyCurrent === item.Lst_Game_Classify }"
          v-for="item in productClassifyListNoAll"
          :key="item.Lst_Game_Classify"
          @click="productClassifyCurrent = item.Lst_Game_Classify"
        >
          {{ $te(item.Lst_Game_Classify_Name) ? $t(item.Lst_Game_Classify_Name) : item.Lst_Game_Classify_Name }}
        </div>
      </div>

      <div class="ui-panel-tab__content home__main__content">
        <component :is="NewsMarquee" />
        <component
          :is="HomeProductBlock"
          :list="productListByClassify(productClassifyCurrent)"
          :classify="productClassifyCurrent"
        />
      </div>
    </div>

    <component :is="HomeFooter" />
  </div>
</template>

<script>
import mixinStyleLoader from '@/mixins/_styleLoader';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  mixins: [mixinStyleLoader],
  computed: {
    ...mapGetters([
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
  },
  data() {
    return {
      productClassifyCurrent: 1,
    };
  },
  methods: {
    changeRoute(route) {
      if (route.name === 'GameLobbyFav' && !this.userIsLoggedIn) {
        return this.$store.dispatch('openModalAuth');
      }
      this.$router.push(route);
    },
  },
  mounted() {
    this.importStyleByFilename('home');
  },
};
</script>

<style></style>
