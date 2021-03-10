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
    <!-- <ul class="game-lobby-category__ul">
      <li
        class="game-lobby-category__ul__li"
        v-for="item in categoryList"
        :key="item.Lst_Category"
        :class="{ 'game-lobby-category__ul__li--active': categoryCurrent.Lst_Category == item.Lst_Category }"
      >
        <a class="game-lobby-category__ul__li__link" href="javascript:;" @click="changeCategory(item)">
          {{ $te(`game.category.${item.Lst_GameName}`) ? $t(`game.category.${item.Lst_GameName}`) : item.Lst_GameName }}
        </a>
      </li>
    </ul> -->
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
