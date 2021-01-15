<template>
  <div class="game-lobby__supply">
    <ul class="game-lobby__supply__ul" :class="{ 'text-center': productList.length == 1 }">
      <li
        class="game-lobby__supply__ul__li"
        :class="[
          item.class,
          { 'game-lobby__supply__ul__li--active': item.Lst_Proxy_Product_Key == productCurrent.Lst_Proxy_Product_Key },
        ]"
        v-for="item in productList"
        :key="item.Lst_Proxy_Product_Key"
      >
        <a class="game-lobby__supply__ul__li__link" href="javascript:;" @click="changeProduct(item)">
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

<style lang="scss" scoped>
.game-lobby {
  &__supply {
    height: 108px;
    overflow: hidden;
    position: relative;

    &__ul {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      margin: 0;
      padding: 11px 0;
      white-space: nowrap;
      overflow: auto;

      &__li {
        display: inline-block;
        letter-spacing: normal;
        word-spacing: normal;
        background-position: center top;
        background-repeat: no-repeat;
        margin: 0 21px;

        &__link {
          min-width: 74px;
          display: block;
          padding: 56px 0 0 0;
          font-size: 22px;
          color: #92a0c0;
          text-align: center;
        }

        &--active > .game-lobby__supply__ul__li__link {
          color: #ffbebc;
          text-shadow: 0px 0px 8px #ff1c59;
        }
      }
    }
  }
}
</style>
