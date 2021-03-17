<template>
  <div class="game-lobby-list-icon">
    <div v-if="productCurrent.Lst_Site_Product_Status != 0">
      <h1 class="text-center">{{ $t('alert.gameMaintenance') }}</h1>
    </div>
    <div class="game-lobby-list-icon__item" v-for="item in gameList" :key="item.Lst_GameID" @click="openGame(item)">
      <!-- <div class="game-lobby-list-icon__item__icon" :style="{ 'background-image': `url(${GameImagePopular})` }"></div> -->
      <img class="game-lobby-list-icon__item__icon" :src="item.imagePath" alt="" />
      <div class="game-lobby-list-icon__item__text">
        {{ item.Lst_GameName }}
      </div>
      <!-- <div class="game-lobby-list-icon__item__new">New!</div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameListTable',
  props: {
    gameList: {
      type: Array,
      default: () => [],
    },
    productCurrent: {
      type: Object,
      default: () => {},
    },
    isShowStart: {
      type: Boolean,
      default: false,
    },
    isShowDemo: {
      type: Boolean,
      default: false,
    },
    isShowLike: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    GameImagePopular() {
      return require('@/assets/Z/01/game-lobby/popular.png');
    },
  },
  data() {
    return {};
  },
  methods: {
    openGame(game) {
      this.$emit('open-game', game);
    },
  },
};
</script>
