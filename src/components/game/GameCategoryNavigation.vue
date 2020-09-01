<template>
  <div class="game-lobby__category">
    <ul class="game-lobby__category__ul">
      <li
        class="game-lobby__category__ul__li"
        v-for="category in categoryList"
        :key="category.Lst_Category"
        :class="{ 'game-lobby__category__ul__li--active': $route.query.category == category.Lst_Category }"
      >
        <a
          class="game-lobby__category__ul__li__link"
          href="javascript:;"
          @click="changeCategory(category.Lst_Category)"
        >
          <template v-if="category.Lst_GameName == 'all' || category.Lst_GameName == 'hot'">
            {{ $t(`game.category.${category.Lst_GameName}`) }}
          </template>

          <template v-else>
            {{ category.Lst_GameName }}
          </template>
        </a>
      </li>
    </ul>
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
  },
  methods: {
    changeCategory(category) {
      this.$emit('change-category', category);
    },
  },
};
</script>

<style scoped>
.game-lobby__category {
  position: relative;
  overflow: hidden;
  height: 74px;
}
.game-lobby__category__ul {
  width: 100%;
  margin: 0;
  padding: 0 15px;
  white-space: nowrap;
  position: absolute;
  bottom: 0;
  left: 0;
  overflow: auto;
}

.game-lobby__category__ul__li {
  font-size: 24px;
  white-space: nowrap;
  display: inline-block;
}

.game-lobby__category__ul__li:last-child {
  padding-right: 20px;
}

.game-lobby__category__ul__li__link {
  display: block;
  padding: 0 15px;
  line-height: 74px;
}
</style>
