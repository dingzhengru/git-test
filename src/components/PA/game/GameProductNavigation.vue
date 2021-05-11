<template>
  <div
    class="ui-panel-tab__tabs game-lobby-product"
    ref="gameProductNav"
    @scroll.passive="handelScrollArrowY($event.target)"
  >
    <div
      class="ui-panel-tab__tabs__item game-lobby-product__item"
      :class="{ active: isProductFav, small: isPanelTabItemSmall }"
      @click="$router.push({ name: 'GameLobbyFav', params: { classify: productClassify } }).catch(() => {})"
      v-if="isShowProductFav"
    >
      {{ $t('game.product.fav') }}
    </div>
    <div
      class="ui-panel-tab__tabs__item game-lobby-product__item"
      :class="{ active: item.Lst_Product_id == productCurrent.Lst_Product_id, small: isPanelTabItemSmall }"
      v-for="item in productList"
      :key="item.Lst_Product_id"
      @click="changeProduct(item)"
    >
      {{ $te(item.Lst_Name) ? $t(item.Lst_Name) : item.Lst_Name }}
    </div>

    <div class="ui-panel-tab__tabs__arrow ui-panel-tab__tabs__arrow--bottom" v-show="isShowBottomArrow"></div>
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
    productClassify: {
      type: Number,
      default: 2,
    },
    isProductFav: {
      type: Boolean,
      default: false,
    },
    isShowProductFav: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(['siteFullCss']),
    isPanelTabItemSmall() {
      return this.productClassify === 2;
    },
  },
  methods: {
    changeProduct(product) {
      this.$emit('change-product', product);
    },
  },
  mounted() {
    this.initScrollArrowY(this.$refs.gameProductNav);
  },
};
</script>
