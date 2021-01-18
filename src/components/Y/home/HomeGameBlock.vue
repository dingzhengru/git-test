<template>
  <ul class="home-game__ul">
    <li
      class="home-game__ul__li"
      :id="$idMapper.home.product[item.Lst_Product_Proxy_Tag]"
      v-for="item in list"
      :key="item.Lst_Product_Proxy_Tag"
      :style="{ 'background-image': `url(${imgSrc(item)})` }"
    >
      <a class="home-game__ul__li__link" href="javascript:;" @click="clickProductItem(item)">
        {{ item.Lst_Name }}
      </a>

      <!-- 維修圖示 -->
      <a class="home-game__ul__li__link--maintain" href="javascript:;" v-show="item.Lst_Site_Product_Status != 0"></a>
    </li>
  </ul>
</template>

<script>
import mixinProductLinkHandler from '@/mixins/productLinkHandler';
import { mapGetters } from 'vuex';

export default {
  name: 'HomeGameBlock',
  mixins: [mixinProductLinkHandler],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['siteFullCss', 'userIsLoggedIn']),
    imgSrc: app => game => {
      try {
        return require(`@/assets/${app.siteFullCss}/game/${game.Lst_Product_Proxy_Tag}.png`);
      } catch {
        return '';
      }
    },
  },
  data() {
    return {
      gameClassMap: {
        gameclass01: '#gameGclub',
        gameclass02: '#gameRNG',
        gameclass03: '#gameSport',
      },
    };
  },
  methods: {
    clickProductItem(product) {
      if (this.userIsLoggedIn) {
        this.handleProductLink(product);
      } else {
        this.$router.push({ name: 'About', query: { scrollTo: this.gameClassMap[product.sURL] } });
      }
    },
  },
};
</script>
