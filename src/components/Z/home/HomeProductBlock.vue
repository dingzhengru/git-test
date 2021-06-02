<template>
  <transition-group class="home-product-block" tag="div" name="list-zoom">
    <div
      class="home-product-block__item list-zoom-item"
      :id="$idMapper.home.product[item.Lst_Product_Proxy_Tag]"
      v-for="item in list"
      :key="item.Lst_Product_Proxy_Tag"
      :style="{ 'background-image': `url(${siteProductImage(item)})` }"
      @click="clickProductItem(item)"
    >
      <!-- <div class="home-product-block__item__text">{{ item.Lst_Name }}</div> -->
      <div>{{ siteProductImagePortrait(item) }}</div>
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
    ...mapGetters(['siteFullCss', 'siteProductImage', 'userIsLoggedIn', 'siteProductImagePortrait']),
    imgSrc: app => game => {
      try {
        return require(`@/assets/${app.siteFullCss}/game/${game.Lst_Product_id}.png`);
      } catch {
        return '';
      }
    },
  },
  methods: {
    clickProductItem(product) {
      if (product.Lst_Site_Product_Status != 0) {
        return;
      }

      //* 外部連結的話，還是需要登入才能進入
      if (product.GetGameRedirectUrl && !this.userIsLoggedIn) {
        this.$router.push('Login');
        return;
      }

      this.handleProductLink(product);
    },
  },
};
</script>
