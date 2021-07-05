<template>
  <div class="user-promotion-gmg">
    <router-view />
  </div>
</template>

<script>
import mixinUserPromotionMGM from '@/mixins/userPromotionMGM';
export default {
  name: 'UserPromotionMGM',
  mixins: [mixinUserPromotionMGM],
};
</script>

<style></style>
