<template>
  <div>
    <div class="ui-overlay"></div>
    <div class="live-game-enter-dialog-wrapper" @click="$emit('close')">
      <div class="live-game-enter-dialog">
        <div class="ui-box-close" @click.capture.stop="$emit('close')"></div>
        <div class="live-game-enter-dialog__button-div" v-for="(gameLimit, index) in gameLimitBetList" :key="index">
          <button
            class="live-game-enter-dialog__button ui-btn"
            @click.capture.stop="$emit('open-live-game', gameLimit.Lst_TemplatesId, index + 1)"
            v-if="gameLimit.Lst_ProductGameId == selectedGame.Lst_Category"
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
          @click.capture.stop="$emit('open-live-game', 0, '')"
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
};
</script>

<style scoped>
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
}
.live-game-enter-dialog__title {
  margin-bottom: 30px;
  font-size: 2.5rem;
  text-align: center;
  font-weight: bold;
}
.live-game-enter-dialog__ul {
  text-align: left;
  list-style: decimal;
  color: #f1cb80;
  margin: 0;
}
/* .live-game-enter-dialog__li {} */
.live-game-enter-dialog__footer {
  margin-top: 20px;
  color: #f1cb80;
}
.live-game-enter-dialog__footer__phone {
  font-size: 4rem;
  margin-top: 20px;
}
.live-game-enter-dialog__footer__phone > a {
  color: #fffeb3;
}
.live-game-enter-dialog__button-div button {
  margin-top: 30px;
}
.live-game-enter-dialog__button {
  background-image: url(~@/assets/common/imgs/ui/btn--red.jpg);
}
</style>
