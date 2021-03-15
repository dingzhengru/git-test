<template>
  <div class="game-lobby-category">
    <div
      class="game-lobby-category__item"
      v-for="item in categoryList"
      :key="item.Lst_Category"
      @click="changeCategory(item)"
    >
      <div
        class="game-lobby-category__item__text"
        :class="{ active: categoryCurrent.Lst_Category == item.Lst_Category }"
      >
        {{ $te(`game.category.${item.Lst_GameName}`) ? $t(`game.category.${item.Lst_GameName}`) : item.Lst_GameName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameCategoryNavigation',
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
};
</script>
