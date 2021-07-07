<template>
  <div class="user-promotion-gmg">
    <div class="user-promotion-gmg__nav">
      <div
        class="user-promotion-gmg__nav__item"
        :class="{ active: $route.name === 'UserPromotionMGMDetail' }"
        @click="$router.push({ name: 'UserPromotionMGMDetail' }).catch(() => {})"
      >
        {{ $t('user.mgm.nav.detail') }}
      </div>
      <div
        class="user-promotion-gmg__nav__item"
        :class="{ active: $route.name === 'UserPromotionMGMBonus' }"
        @click="$router.push({ name: 'UserPromotionMGMBonus' }).catch(() => {})"
      >
        {{ $t('user.mgm.nav.bonus') }}
      </div>
    </div>

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
