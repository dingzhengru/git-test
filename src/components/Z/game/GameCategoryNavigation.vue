<template>
  <div class="game-lobby-category">
    <div
      class="game-lobby-category__container"
      ref="gameLobbyCategoryContainer"
      @scroll.passive="handelScrollArrowX($event.target)"
    >
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
          {{ $te(item.Lst_GameName) ? $t(item.Lst_GameName) : item.Lst_GameName }}
        </div>
      </div>
    </div>

    <div class="nav-tab__arrow nav-tab__arrow--left nav-tab__arrow--left--game-category" v-show="isShowLeftArrow"></div>
    <div
      class="nav-tab__arrow nav-tab__arrow--right nav-tab__arrow--right--game-category"
      v-show="isShowRightArrow"
    ></div>
  </div>
</template>

<script>
import mixinScrollArrow from '@/mixins/_scrollArrow';
export default {
  name: 'GameCategoryNavigation',
  mixins: [mixinScrollArrow],
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
  methods: {
    changeCategory(category) {
      this.$emit('change-category', category);
    },
  },
  mounted() {
    this.handelScrollArrowX(this.$refs.gameLobbyCategoryContainer);
  },
  watch: {
    categoryList() {
      this.initScrollArrowX(this.$refs.gameLobbyCategoryContainer);
    },
  },
};
</script>
