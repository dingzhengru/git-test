<template>
  <div class="home-product-nav nav-tab">
    <div
      class="nav-tab__item"
      :class="{ active: item.classify == classify }"
      v-for="item in productNavList"
      :key="item.classify"
      @click="$emit('change-product-nav', item.classify)"
    >
      {{ $t(item.text) }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeProductNav',
  props: {
    classify: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // productNavList: ['所有遊戲', '真人娛樂', '電子遊戲', '體育投注'],
      productNavList: [
        {
          classify: 0,
          text: 'home.product.nav.all',
        },
        {
          classify: 1,
          text: 'home.product.nav.live',
        },
        {
          classify: 2,
          text: 'home.product.nav.slot',
        },
        {
          classify: 3,
          text: 'home.product.nav.sport',
        },
      ],
    };
  },
};
</script>
