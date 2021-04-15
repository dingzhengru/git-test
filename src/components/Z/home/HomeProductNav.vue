<template>
  <div class="home-product-nav nav-tab" ref="navTab">
    <div class="nav-tab__container" ref="navTabContainer" @scroll.passive="handelScrollArrowX($event.target)">
      <h1></h1>
      <div
        class="nav-tab__item"
        :class="{ active: item.Lst_Game_Classify === classify }"
        v-for="item in productClassifyList"
        :key="item.Lst_Game_Classify"
        @click="$emit('change-product-nav', item.Lst_Game_Classify)"
      >
        {{ $te(item.Lst_Game_Classify_Name) ? $t(item.Lst_Game_Classify_Name) : item.Lst_Game_Classify_Name }}
      </div>
    </div>

    <div class="nav-tab__left nav-tab__left--home" v-show="isShowLeftArrow"></div>
    <div class="nav-tab__right nav-tab__right--home" v-show="isShowRightArrow"></div>
  </div>
</template>

<script>
import mixinScrollArrow from '@/mixins/_scrollArrow';
import { mapGetters } from 'vuex';
export default {
  name: 'HomeProductNav',
  mixins: [mixinScrollArrow],
  computed: {
    ...mapGetters(['productClassifyList']),
  },
  props: {
    classify: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.handelScrollArrowX(this.$refs.navTabContainer);
  },
};
</script>
