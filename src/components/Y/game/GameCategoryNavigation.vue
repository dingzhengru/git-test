<template>
  <div class="game-lobby__category">
    <ul class="game-lobby__category__ul">
      <li
        class="game-lobby__category__ul__li"
        v-for="item in categoryList"
        :key="item.Lst_Category"
        :class="{ 'game-lobby__category__ul__li--active': categoryCurrent.Lst_Category == item.Lst_Category }"
      >
        <a class="game-lobby__category__ul__li__link" href="javascript:;" @click="changeCategory(item)">
          {{ $te(`game.category.${item.Lst_GameName}`) ? $t(`game.category.${item.Lst_GameName}`) : item.Lst_GameName }}
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

<style lang="scss" scoped>
.game-lobby {
  &__category {
    position: relative;
    overflow: hidden;
    height: 74px;

    &__ul {
      width: 100%;
      margin: 0;
      padding: 0 15px;
      white-space: nowrap;
      position: absolute;
      bottom: 0;
      left: 0;
      overflow: auto;

      &__li {
        font-size: 24px;
        white-space: nowrap;
        display: inline-block;

        &__link {
          display: block;
          padding: 0 15px;
          line-height: 74px;
        }
      }
      &__li:last-child {
        padding-right: 20px;
      }
    }
  }
}
</style>
