<template>
  <div class="game-lobby-list-icon">
    <h2 class="text-center" v-if="!isProductActive">{{ $t('alert.gameMaintenance') }}</h2>

    <div
      class="game-lobby-list-icon__container"
      ref="gameLobbyListIconContainer"
      @scroll.passive="handelScrollArrowX($event.target)"
      v-else
    >
      <div class="game-lobby-list-icon__item" v-for="item in gameList" :key="item.Lst_GameID" @click="openGame(item)">
        <!-- <div class="game-lobby-list-icon__item__icon" :style="{ 'background-image': `url(${GameImagePopular})` }"></div> -->
        <img class="game-lobby-list-icon__item__icon" :src="item.imagePath" alt="" />
        <div class="game-lobby-list-icon__item__text">
          {{ item.Lst_GameName }}
        </div>
        <div
          class="game-lobby-list-icon__item__fav"
          :class="{ active: item.Lst_IsLike }"
          @click.stop="$emit('change-game-fav', item)"
        ></div>
        <!-- <div class="game-lobby-list-icon__item__new">New!</div> -->
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
    isProductActive: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    GameImagePopular() {
      return require('@/assets/Z/01/game-lobby/popular.png');
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

        window.setTimeout(() => {
          this.handelScrollArrowX(this.$refs.gameLobbyListIconContainer);
        }, 500);
      }, 100);
    },
  },
};
</script>
