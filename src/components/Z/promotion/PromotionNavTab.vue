<template>
  <div class="promotion-nav-tab nav-tab">
    <div class="nav-tab__item" :class="{ active: index == 0 }" v-for="(item, index) in gameNavList" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromotionNavTab',
  data() {
    return {
      gameNavList: ['全部優惠', '存款優惠', '返水優惠', '推薦優惠'],
    };
  },
};
</script>
