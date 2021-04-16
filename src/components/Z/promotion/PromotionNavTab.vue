<template>
  <div class="promotion-nav-tab nav-tab">
    <div class="nav-tab__container" ref="navTabContainer" @scroll.passive="handelScrollArrowX($event.target)">
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
    <div class="nav-tab__arrow nav-tab__arrow--left nav-tab__arrow--left--promotion" v-show="isShowLeftArrow"></div>
    <div class="nav-tab__arrow nav-tab__arrow--right nav-tab__arrow--right--promotion" v-show="isShowRightArrow"></div>
  </div>
</template>

<script>
import mixinScrollArrow from '@/mixins/_scrollArrow';
export default {
  name: 'PromotionNavTab',
  mixins: [mixinScrollArrow],
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
  mounted() {
    this.handelScrollArrowX(this.$refs.navTabContainer);
  },
  watch: {
    categoryList() {
      window.setTimeout(() => {
        this.handelScrollArrowX(this.$refs.navTabContainer);
      }, 500);
    },
  },
};
</script>
