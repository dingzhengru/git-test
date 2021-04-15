<template>
  <div class="game-lobby-product">
    <div
      class="game-lobby-product__container"
      ref="gameLobbyProductContainer"
      @scroll.passive="handelScrollArrowX($event.target)"
    >
      <div
        class="game-lobby-product__item"
        v-for="item in productList"
        :key="item.Lst_Product_id"
        :class="{ active: item.Lst_Product_id == productCurrent.Lst_Product_id }"
        @click="changeProduct(item)"
      >
        <!-- <i
        class="game-lobby-product__item__icon"
        :class="[
          `game-lobby-product__item__icon--${item.Lst_Product_id}`,
          { active: item.Lst_Product_id == productCurrent.Lst_Product_id },
        ]"
      ></i> -->

        <img :src="imgSrc(item)" alt="" v-show="imgSrc(item)" />
        <div class="game-lobby-product__item__text">
          {{ item.Lst_Name }}
        </div>
      </div>
    </div>
    <div class="nav-tab__left nav-tab__left--game-product" v-show="isShowLeftArrow"></div>
    <div class="nav-tab__right nav-tab__right--game-product" v-show="isShowRightArrow"></div>
  </div>
</template>

<script>
import mixinScrollArrow from '@/mixins/_scrollArrow';
import { mapGetters } from 'vuex';
export default {
  name: 'GameProductNavigation',
  mixins: [mixinScrollArrow],
  props: {
    productList: {
      type: Array,
      default: () => [],
    },
    productCurrent: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['siteFullCss']),
    imgSrc: app => product => {
      try {
        if (product.Lst_Product_id == app.productCurrent.Lst_Product_id) {
          return require(`@/assets/${app.siteFullCss}/game-lobby/${product.Lst_Product_id}-active.png`);
        } else {
          return require(`@/assets/${app.siteFullCss}/game-lobby/${product.Lst_Product_id}.png`);
        }
      } catch {
        return '';
      }
    },
  },
  methods: {
    changeProduct(product) {
      this.$emit('change-product', product);
    },
  },
  mounted() {
    this.handelScrollArrowX(this.$refs.gameLobbyProductContainer);
  },
};
</script>
