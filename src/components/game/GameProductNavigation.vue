<template>
  <div class="game-lobby__supply">
    <ul class="game-lobby__supply__ul" :class="{ 'text-center': productList.length == 1 }">
      <li
        class="game-lobby__supply__ul__li"
        :class="[
          product.class,
          { 'game-lobby__supply__ul__li--active': $route.params.key == product.Lst_Proxy_Product_Key },
        ]"
        v-for="product in productList"
        :key="product.Lst_Proxy_Product_Key"
      >
        <a class="game-lobby__supply__ul__li__link" href="javascript:;" @click="changeProduct(product)">
          {{ product.Lst_Name }}
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
  },
  methods: {
    changeProduct(product) {
      this.$emit('change-product', product);
    },
  },
};
</script>

<style scoped>
.game-lobby__supply {
  height: 108px;
  overflow: hidden;
  position: relative;
}

.game-lobby__supply__ul {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 11px 0;
  white-space: nowrap;
  overflow: auto;
}

.game-lobby__supply__ul__li {
  display: inline-block;
  letter-spacing: normal;
  word-spacing: normal;
  background-position: center top;
  background-repeat: no-repeat;
  margin: 0 21px;
}

.game-lobby__supply__ul__li--active > .game-lobby__supply__ul__li__link {
  color: #ffbebc;
  text-shadow: 0px 0px 8px #ff1c59;
}

.game-lobby__supply__ul__li__link {
  min-width: 74px;
  display: block;
  padding: 56px 0 0 0;
  font-size: 22px;
  color: #92a0c0;
  text-align: center;
}
</style>
