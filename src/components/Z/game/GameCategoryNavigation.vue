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
          {{ $te(`game.category.${item.Lst_GameName}`) ? $t(`game.category.${item.Lst_GameName}`) : item.Lst_GameName }}
        </div>
      </div>
    </div>
    <div class="nav-tab__left nav-tab__left--game-category" v-show="isShowLeftArrow"></div>
    <div class="nav-tab__right nav-tab__right--game-category" v-show="isShowRightArrow"></div>
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
};
</script>
