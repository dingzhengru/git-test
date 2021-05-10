<template>
  <div class="home-product-block">
    <transition-group
      class="home-product-block__container"
      ref="homeProductBlockContainer"
      tag="div"
      name="product-list-landscape"
      :class="{ block: isImgBlock }"
      @scroll.native.passive="handelScrollArrowX($event.target)"
    >
      <!-- <div
        class="home-product-block__item product-list-landscape-item"
        :id="$idMapper.home.product[item.Lst_Product_Proxy_Tag]"
        v-for="item in list"
        :key="item.Lst_Product_Proxy_Tag"
        :style="{ 'background-image': `url(${siteProductImage(item)})` }"
        @click="clickProductItem(item)"
      > -->
      <div
        class="home-product-block__item product-list-landscape-item"
        :id="$idMapper.home.product[item.Lst_Product_Proxy_Tag]"
        v-for="item in list"
        :key="item.Lst_Product_Proxy_Tag"
        :style="{ 'background-image': `url(${imgSrcTest})` }"
        @click="clickProductItem(item)"
      >
        <!-- <div class="home-product-block__item__text">{{ item.Lst_Name }}</div> -->
        <div class="home-product-block__item__overlay--maintain" v-show="item.Lst_Site_Product_Status != 0"></div>
      </div>
    </transition-group>
    <div
      class="ui-panel-tab__content__arrow ui-panel-tab__content__arrow--left"
      key="arrow-left"
      v-show="isShowLeftArrow"
    ></div>
    <div
      class="ui-panel-tab__content__arrow ui-panel-tab__content__arrow--right"
      key="arrow-right"
      v-show="isShowRightArrow"
    ></div>
  </div>
</template>

<script>
import mixinProductLinkHandler from '@/mixins/productLinkHandler';
import { mapGetters } from 'vuex';
import mixinScrollArrow from '@/mixins/_scrollArrow';

export default {
  name: 'HomeProductBlock',
  mixins: [mixinProductLinkHandler, mixinScrollArrow],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    classify: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    ...mapGetters(['siteFullCss', 'siteProductImage', 'userIsLoggedIn']),
    isImgBlock() {
      return this.classify !== 2;
    },
    imgSrc: app => game => {
      try {
        return require(`@/assets/${app.siteFullCss}/game/${game.Lst_Product_id}.png`);
      } catch {
        return '';
      }
    },
    imgSrcTest() {
      try {
        if (this.isImgBlock) {
          return require(`@/assets/${this.siteFullCss}/home/evo-block.png`);
        }
        return require(`@/assets/${this.siteFullCss}/home/sbo.png`);
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
  watch: {
    list() {
      window.setTimeout(() => {
        this.handelScrollArrowX(this.$refs.homeProductBlockContainer.$el);
      }, 600);
    },
  },
};
</script>
