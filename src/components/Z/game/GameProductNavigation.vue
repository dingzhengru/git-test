<template>
  <div class="game-lobby-product">
    <div
      class="game-lobby-product__item"
      v-for="item in productList"
      :key="item.Lst_Product_id"
      :class="{ active: item.Lst_Product_id == productCurrent.Lst_Product_id }"
      @click="changeProduct(item)"
    >
      <i
        class="game-lobby-product__item__icon"
        :class="[
          `game-lobby-product__item__icon--${item.Lst_Product_id}`,
          { active: item.Lst_Product_id == productCurrent.Lst_Product_id },
        ]"
      ></i>
      <div class="game-lobby-product__item__text">
        {{ item.Lst_Name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameProductNavigation',
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
  methods: {
    changeProduct(product) {
      this.$emit('change-product', product);
    },
  },
};
</script>
