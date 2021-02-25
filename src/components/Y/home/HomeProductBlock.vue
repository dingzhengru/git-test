<template>
  <div class="home-product-block">
    <div
      class="home-product-block__item"
      :id="$idMapper.home.product[item.Lst_Product_Proxy_Tag]"
      v-for="item in list"
      :key="item.Lst_Product_Proxy_Tag"
      :style="{ 'background-image': `url(${siteProductImage(item)})` }"
      @click="clickProductItem(item)"
    >
      <div class="home-product-block__item__text">{{ item.Lst_Name }}</div>
      <div class="home-product-block__item__overlay--maintain" v-show="item.Lst_Site_Product_Status != 0"></div>
    </div>
  </div>
</template>

<script>
import mixinProductLinkHandler from '@/mixins/productLinkHandler';
import { mapGetters } from 'vuex';

export default {
  name: 'HomeProductBlock',
  mixins: [mixinProductLinkHandler],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(['siteFullCss', 'siteProductImage', 'userIsLoggedIn']),
    imgSrc: app => game => {
      try {
        return require(`@/assets/${app.siteFullCss}/game/${game.Lst_Product_id}.png`);
      } catch {
        console.log('not found', `@/assets/${app.siteFullCss}/game/${game.Lst_Product_id}.png`);
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
      if (product.Lst_Site_Product_Status != 0) {
        return;
      }

      if (this.userIsLoggedIn) {
        this.handleProductLink(product);
      } else {
        this.$router.push({ name: 'About', query: { scrollTo: this.gameClassMap[product.sURL] } });
      }
    },
  },
};
</script>
