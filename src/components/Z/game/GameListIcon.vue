<template>
  <div class="game-lobby-list-icon">
    <div class="game-lobby-list-icon__item"></div>
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
  data() {
    return {};
  },
  methods: {
    openGame(game, freePlay) {
      this.$emit('open-game', game, freePlay);
    },
    changeGameFav(game) {
      this.$emit('change-game-fav', game);
    },
  },
};
</script>
