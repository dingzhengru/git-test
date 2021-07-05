<template>
  <div class="user-promotion-gmg">
    <router-view />
  </div>
</template>

<script>
import mixinUserPromotionMGM from '@/mixins/userPromotionMGM';
// import VueQr from 'vue-qr';
export default {
  name: 'UserPromotionMGM',
  mixins: [mixinUserPromotionMGM],
  // components: {
  //   VueQr,
  // },
};
</script>

<style></style>
