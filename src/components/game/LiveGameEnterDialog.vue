<template>
  <div>
    <div class="ui-overlay"></div>
    <div class="live-game-enter-dialog-wrapper" @click.self="$emit('close')">
      <div class="live-game-enter-dialog">
        <div class="ui-box-close" @click="$emit('close')"></div>
        <div
          class="live-game-enter-dialog__button-div"
          v-for="(gameLimit, index) in filterGameLimitBetList"
          :key="index"
        >
          <button
            class="live-game-enter-dialog__button ui-btn"
            @click="$emit('open-live-game', gameLimit.Lst_TemplatesId, index + 1)"
          >
            <template v-if="gameLimit.Lst_TemplatesId == 0">
              {{ $t('game.button.enterGame') }}
            </template>
            <template v-else>
              {{ `${gameLimit.Lst_LimitMin}-${gameLimit.Lst_LimitMax}` }}
            </template>
          </button>
        </div>

        <button
          class="live-game-enter-dialog__button ui-btn"
          @click="$emit('open-live-game', 0, '')"
          v-if="gameLimitBetList.length <= 0"
        >
          {{ $t('game.button.enterGame') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiveGameEnterDialog',
  props: {
    gameLimitBetList: {
      type: Array,
      default: () => [],
    },
    selectedGame: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    filterGameLimitBetList() {
      return this.gameLimitBetList.filter(gameLimit => gameLimit.Lst_ProductGameId == this.selectedGame.Lst_Category);
    },
  },
};
</script>

<style lang="scss" scoped>
.live-game-enter-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
}

.live-game-enter-dialog {
  width: 70%;
  /* height: 628px; */
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  overflow: auto;
  z-index: 9999;
  font-size: 2rem;
  padding: 60px 30px 60px 30px;

  &__button-div {
    button {
      margin-top: 30px;
      background-image: url(~@/assets/common/imgs/ui/btn--red.jpg);
    }
  }
}
</style>

<style scoped>
/* .live-game-enter-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
} */
/* .live-game-enter-dialog {
  width: 70%;
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  overflow: auto;
  z-index: 9999;
  font-size: 2rem;
  padding: 60px 30px 60px 30px;
} */
/* .live-game-enter-dialog__button-div button {
  margin-top: 30px;
} */
/* .live-game-enter-dialog__button {
  background-image: url(~@/assets/common/imgs/ui/btn--red.jpg);
} */
</style>
