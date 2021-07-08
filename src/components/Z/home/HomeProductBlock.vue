<template>
  <transition-group class="home-product-block" tag="div" name="list-zoom">
    <div
      class="home-product-block__item list-zoom-item"
      :id="$idMapper.home.product[item.Lst_Product_Proxy_Tag]"
      v-for="item in list"
      :key="item.Lst_Product_Proxy_Tag"
      @click="clickProductItem(item)"
    >
      <img :src="imgProduct(item)" @error="setErrorImage($event, imgProductDefault(item))" />

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
    ...mapGetters([
      'siteFullCss',
      'userIsLoggedIn',
      'siteProductImage',
      'siteProductImagePortrait',
      'siteProductImagePortraitDefault',
    ]),
    imgProduct: app => product => {
      if (app.$env === 'development') {
        return app.siteProductImagePortrait(product);
      }
      return app.siteProductImage(product);
    },
    imgProductDefault: app => product => {
      return app.siteProductImagePortraitDefault(product);
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
    setErrorImage(event, img) {
      event.target.src = img;
    },
  },
};
</script>
