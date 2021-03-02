<template>
  <div class="promotion-nav-tab nav-tab">
    <div class="nav-tab__item" :class="{ active: category === 0 }" @click="$emit('change-category', 0)">
      {{ $t('promotion.nav.all') }}
    </div>
    <div
      class="nav-tab__item"
      :class="{ active: item.Lst_CategoryID === category }"
      v-for="item in categoryList"
      :key="item.Lst_CategoryID"
      @click="$emit('change-category', item.Lst_CategoryID)"
    >
      {{ item.Lst_CategoryName }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PromotionNavTab',
  props: {
    categoryList: {
      type: Array,
      default: () => [],
    },
    category: {
      type: Number,
      default: 0,
    },
  },
};
</script>
