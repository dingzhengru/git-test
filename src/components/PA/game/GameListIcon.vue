<template>
  <div class="game-lobby-list-icon no-scrollbar" :class="{ 'no-category': !isShowCategory }">
    <h2 class="text-center" v-if="!isProductActive">{{ $t('alert.gameMaintenance') }}</h2>

    <div class="ui-no-data" v-else-if="gameList.length === 0">{{ $t('ui.label.noData') }}</div>

    <div
      class="game-lobby-list-icon__container no-scrollbar"
      ref="gameLobbyListIconContainer"
      @scroll.passive="handelScrollArrowX($event.target)"
      v-else
    >
      <div
        class="game-lobby-list-icon__item"
        v-for="(item, index) in gameList"
        :key="item.Lst_GameID + String(index)"
        @click="openGame(item)"
        v-show="isShowGameItem(item)"
      >
        <!-- <div class="game-lobby-list-icon__item__icon" :style="{ 'background-image': `url(${GameImagePopular})` }"></div> -->
        <img class="game-lobby-list-icon__item__icon" :src="item.imagePath" alt="" />
        <div class="game-lobby-list-icon__item__text">
          {{ item.Lst_GameName }}
        </div>
        <div
          class="game-lobby-list-icon__item__fav"
          :class="{ active: item.Lst_IsLike }"
          @click.stop="$emit('change-game-fav', item)"
          v-if="isShowFav"
        ></div>
        <!-- <div class="game-lobby-list-icon__item__new">New!</div> -->

        <div
          class="game-lobby-list-icon__item__overlay--maintain"
          @click.stop=""
          v-show="!isProductEnabledByGame(item)"
        ></div>
      </div>
      <intersect @enter="changePage" rootMargin="0px 15px 0px 0px" v-if="gameList.length > 0 && isShowIntersect">
        <div class="game-lobby-intersect"></div>
      </intersect>
    </div>

    <div
      class="ui-panel-tab__content__arrow ui-panel-tab__content__arrow--left"
      key="arrow-left"
      v-show="isShowLeftArrow"
    ></div>
    <div
      class="ui-panel-tab__content__arrow ui-panel-tab__content__arrow--right"
      key="arrow-right"
      v-show="isShowRightArrow"
    ></div>
  </div>
</template>

<script>
import Intersect from 'vue-intersect';
import mixinScrollArrow from '@/mixins/_scrollArrow';
export default {
  name: 'GameListTable',
  mixins: [mixinScrollArrow],
  components: {
    Intersect,
  },
  props: {
    gameList: {
      type: Array,
      default: () => [],
    },
    productCurrent: {
      type: Object,
      default: () => {},
    },
    isShowCategory: {
      type: Boolean,
      default: true,
    },
    isProductActive: {
      type: Boolean,
      default: true,
    },
    isShowFav: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    GameImagePopular() {
      return require('@/assets/Z/01/game-lobby/popular.png');
    },
    isProductFav() {
      return this.$route.name === 'GameLobbyFav';
    },
    isShowGameItem: app => game => {
      if (app.isProductFav) {
        return game.Lst_IsLike;
      }
      return true;
    },
    isProductEnabledByGame: app => game => {
      if (app.isProductFav) {
        return game.Lst_Site_Product_Status === 0;
      }
      return true;
    },
  },
  data() {
    return {
      /**
       ** 因切換遊戲類別不會讓 intersect 顯示、隱藏
       ** 所以需放置在 watch: gameList 來設置 false => true
       ** 不然資料長度太短，就不會觸發 @enter 事件
       */
      isShowIntersect: false,
    };
  },
  methods: {
    openGame(game) {
      this.$emit('open-game', game);
    },
    changePage() {
      this.$emit('change-page');
    },
  },
  watch: {
    gameList() {
      this.isShowIntersect = false;

      window.setTimeout(() => {
        this.isShowIntersect = true;

        this.initScrollArrowX(this.$refs.gameLobbyListIconContainer);
      }, 100);
    },
  },
};
</script>
