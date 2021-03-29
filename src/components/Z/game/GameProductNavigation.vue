<template>
  <div class="game-lobby-product">
    <div class="nav-tab__left" v-show="isShowArrowLeft"></div>
    <div class="game-lobby-product__container">
      <intersect @enter="leftEnter" @leave="leftLeave">
        <div class="nav-tab__intersect nav-tab__intersect--left"></div>
      </intersect>
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
      <intersect @enter="rightEnter" @leave="rightLeave">
        <div class="nav-tab__intersect nav-tab__intersect--right"></div>
      </intersect>
    </div>
    <div class="nav-tab__right" v-show="isShowArrowRight"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Intersect from 'vue-intersect';
export default {
  name: 'GameProductNavigation',
  components: {
    Intersect,
  },
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
  data() {
    return {
      isShowArrowLeft: true,
      isShowArrowRight: true,
    };
  },
  methods: {
    changeProduct(product) {
      this.$emit('change-product', product);
    },
    leftEnter() {
      this.isShowArrowLeft = false;
    },
    leftLeave() {
      this.isShowArrowLeft = true;
    },
    rightEnter() {
      this.isShowArrowRight = false;
    },
    rightLeave() {
      this.isShowArrowRight = true;
    },
  },
};
</script>
