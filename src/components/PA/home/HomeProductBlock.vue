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

      <template v-if="isProduct">
        <div
          class="home-product-block__item product-list-landscape-item"
          :id="$idMapper.home.product[item.Lst_Product_Proxy_Tag]"
          v-for="item in list"
          :key="item.Lst_Product_Proxy_Tag"
          :style="{ 'background-image': `url(${imgProduct(item)})` }"
          @click="clickProductItem(item)"
        >
          <!-- <div class="home-product-block__item__text">{{ item.Lst_Name }}</div> -->
          <div class="home-product-block__item__overlay--maintain" v-show="item.Lst_Site_Product_Status != 0"></div>
        </div>
      </template>

      <template v-else>
        <div
          class="home-product-block__item-game product-list-landscape-item"
          v-for="item in list"
          :key="item.Lst_GameID"
          @click="openGame(item)"
        >
          <img :src="item.imagePath" alt="" />
          <div>{{ item.Lst_GameName }}</div>
        </div>
      </template>
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
import mixinGameOpen from '@/mixins/gameOpen';
import mixinScrollArrow from '@/mixins/_scrollArrow';

export default {
  name: 'HomeProductBlock',
  mixins: [mixinProductLinkHandler, mixinGameOpen, mixinScrollArrow],
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    classify: {
      default: () => 0,
    },
  },
  computed: {
    ...mapGetters([
      'siteFullCss',
      'siteProductImage',
      'userIsLoggedIn',
      'siteProductImageLandscape',
      'siteProductImageLandscapeSmall',
      'siteProductImageLandscapeDefault',
      'siteProductImageLandscapeSmallDefault',
    ]),
    isProduct() {
      return typeof this.classify === 'number';
    },
    isImgBlock() {
      return this.classify !== 2 && this.isProduct;
    },
    imgProduct: app => product => {
      if (app.isImgBlock) {
        app.siteProductImageLandscapeSmall(product);
      }
      return app.siteProductImageLandscape(product);
    },
    imgSrcTest() {
      try {
        if (this.isImgBlock) {
          return require(`@/assets/${this.siteFullCss}/home/evo-block.png`);
        }
        return require(`@/assets/${this.siteFullCss}/home/sbo-small.png`);
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
      this.initScrollArrowX(this.$refs.homeProductBlockContainer);
    },
  },
};
</script>
