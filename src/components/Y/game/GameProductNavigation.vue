<template>
  <div class="game-lobby-product">
    <ul class="game-lobby-product__ul" :class="{ 'text-center': productList.length == 1 }">
      <li
        class="game-lobby-product__ul__li"
        :class="[item.class, { active: item.Lst_Proxy_Product_Key == productCurrent.Lst_Proxy_Product_Key }]"
        v-for="item in productList"
        :key="item.Lst_Proxy_Product_Key"
      >
        <a class="game-lobby-product__ul__li__link" href="javascript:;" @click="changeProduct(item)">
          {{ item.Lst_Name }}
        </a>
      </li>
    </ul>
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
