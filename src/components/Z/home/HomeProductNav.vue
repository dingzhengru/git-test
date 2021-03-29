<template>
  <div class="home-product-nav nav-tab">
    <div class="nav-tab__left nav-tab__left--home" v-show="isShowArrowLeft"></div>

    <div class="nav-tab__container">
      <intersect @enter="leftEnter" @leave="leftLeave">
        <div class="nav-tab__intersect nav-tab__intersect--left"></div>
      </intersect>
      <div
        class="nav-tab__item"
        :class="{ active: item.Lst_Game_Classify === classify }"
        v-for="item in productClassifyList"
        :key="item.Lst_Game_Classify"
        @click="$emit('change-product-nav', item.Lst_Game_Classify)"
      >
        {{ $te(item.Lst_Game_Classify_Name) ? $t(item.Lst_Game_Classify_Name) : item.Lst_Game_Classify_Name }}
      </div>
      <intersect @enter="rightEnter" @leave="rightLeave">
        <div class="nav-tab__intersect nav-tab__intersect--right"></div>
      </intersect>
    </div>

    <div class="nav-tab__right nav-tab__right--home" v-show="isShowArrowRight"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Intersect from 'vue-intersect';
export default {
  name: 'HomeProductNav',
  components: {
    Intersect,
  },
  computed: {
    ...mapGetters(['productClassifyList']),
  },
  props: {
    classify: {
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
