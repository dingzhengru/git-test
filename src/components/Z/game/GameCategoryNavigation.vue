<template>
  <div class="game-lobby-category">
    <div class="game-lobby-category__container">
      <intersect @enter="leftEnter" @leave="leftLeave">
        <div class="nav-tab__intersect nav-tab__intersect--left"></div>
      </intersect>

      <div
        class="game-lobby-category__item"
        v-for="item in categoryList"
        :key="item.Lst_Category"
        @click="changeCategory(item)"
        :class="{ active: categoryCurrent.Lst_Category == item.Lst_Category }"
      >
        <div
          class="game-lobby-category__item__text"
          :class="{ active: categoryCurrent.Lst_Category == item.Lst_Category }"
        >
          {{ $te(`game.category.${item.Lst_GameName}`) ? $t(`game.category.${item.Lst_GameName}`) : item.Lst_GameName }}
        </div>
      </div>

      <intersect @enter="rightEnter" @leave="rightLeave">
        <div class="nav-tab__intersect nav-tab__intersect--right"></div>
      </intersect>
    </div>
    <div class="nav-tab__left nav-tab__left--game-category" v-show="isShowArrowLeft"></div>
    <div class="nav-tab__right nav-tab__right--game-category" v-show="isShowArrowRight"></div>
  </div>
</template>

<script>
import Intersect from 'vue-intersect';
export default {
  name: 'GameCategoryNavigation',
  components: {
    Intersect,
  },
  props: {
    categoryList: {
      type: Array,
      default: () => [],
    },
    categoryCurrent: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isShowArrowLeft: true,
      isShowArrowRight: true,
    };
  },
  methods: {
    changeCategory(category) {
      this.$emit('change-category', category);
    },
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
