<template>
  <transition-group class="home-product-block" tag="div" name="list-zoom">
    <div
      class="home-product-block__item list-zoom-item"
      :id="$idMapper.home.product[item.Lst_Product_Proxy_Tag]"
      v-for="item in list"
      :key="item.Lst_Product_Proxy_Tag"
      :style="{ 'background-image': `url(${imgSrc(item)})` }"
      @click="clickProductItem(item)"
    >
      <div class="home-product-block__item__text">{{ item.Lst_Name }}</div>
      <div class="home-product-block__item__overlay--maintain" v-show="item.Lst_Site_Product_Status != 0"></div>
    </div>
  </transition-group>
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
    ...mapGetters(['siteFullCss', 'userIsLoggedIn']),
    imgSrc: app => game => {
      try {
        return require(`@/assets/${app.siteFullCss}/game/${game.Lst_Product_id}.png`);
      } catch {
        console.log('not found', `@/assets/${app.siteFullCss}/game/${game.Lst_Product_id}.png`);
        return '';
      }
    },
  },
  methods: {
    clickProductItem(product) {
      if (product.Lst_Site_Product_Status != 0) {
        return;
      }

      this.handleProductLink(product);
    },
  },
};
</script>
