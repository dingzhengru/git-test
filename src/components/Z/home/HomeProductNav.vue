<template>
  <div class="home-product-nav">
    <div
      class="home-product-nav__item"
      :class="{ active: index == 0 }"
      v-for="(item, index) in gameNavList"
      :key="index"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeProductNav',
  data() {
    return {
      gameNavList: ['所有遊戲', '真人娛樂', '電子遊戲', '體育投注'],
    };
  },
};
</script>
