<template>
  <div class="ui-panel-tab__tabs game-lobby-product">
    <div
      class="ui-panel-tab__tabs__item game-lobby-product__item"
      :class="{ active: isProductFav }"
      @click="$router.push({ name: 'GameLobbyFav', params: { classify: productClassify } }).catch(() => {})"
      v-if="isShowProductFav"
    >
      {{ $t('game.product.fav') }}
    </div>
    <div
      class="ui-panel-tab__tabs__item game-lobby-product__item"
      :class="{ active: item.Lst_Product_id == productCurrent.Lst_Product_id }"
      v-for="item in productList"
      :key="item.Lst_Product_id"
      @click="changeProduct(item)"
    >
      {{ $te(item.Lst_Name) ? $t(item.Lst_Name) : item.Lst_Name }}
    </div>
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
  },
  methods: {
    changeProduct(product) {
      this.$emit('change-product', product);
    },
  },
};
</script>
