<template>
  <div class="promotion-nav-tab nav-tab">
    <div class="nav-tab__left" v-show="isShowArrowLeft"></div>

    <div class="nav-tab__container">
      <intersect @enter="leftEnter" @leave="leftLeave">
        <div class="nav-tab__intersect nav-tab__intersect--left"></div>
      </intersect>

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

      <intersect @enter="rightEnter" @leave="rightLeave">
        <div class="nav-tab__intersect nav-tab__intersect--right"></div>
      </intersect>
    </div>
    <div class="nav-tab__right" v-show="isShowArrowRight"></div>
  </div>
</template>

<script>
import Intersect from 'vue-intersect';
export default {
  name: 'PromotionNavTab',
  components: {
    Intersect,
  },
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
  data() {
    return {
      isShowArrowLeft: true,
      isShowArrowRight: true,
    };
  },
  methods: {
    leftEnter() {
      this.isShowArrowLeft = false;
    },
    leftLeave() {
      this.isShowArrowLeft = true;
    },
    rightEnter() {
      this.isShowArrowRight = false;
    },
    rightLeave() {
      this.isShowArrowRight = true;
    },
  },
};
</script>
