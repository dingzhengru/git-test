<template>
  <AppModal :isShow="isShow" @close="$emit('close')">
    <div class="live-game-enter-dialog">
      <div class="ui-box-close" @click="$emit('close')"></div>
      <div class="live-game-enter-dialog__button-div" v-for="(item, index) in filterGameLimitBetList" :key="index">
        <button
          class="live-game-enter-dialog__button ui-btn"
          @click="$emit('open-live-game', item.Lst_TemplatesId, index + 1)"
        >
          <template v-if="item.Lst_TemplatesId == 0">
            {{ $t('game.button.enterGame') }}
          </template>
          <template v-else>
            {{ `${item.Lst_LimitMin}-${item.Lst_LimitMax}` }}
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
  </AppModal>
</template>

<script>
export default {
  name: 'LiveGameEnterDialog',
  components: {
    AppModal: () => import('@/components/AppModal'),
  },
  props: {
    gameLimitBetList: {
      type: Array,
      default: () => [],
    },
    selectedGame: {
      type: Object,
      default: () => {},
    },
    isShow: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    filterGameLimitBetList() {
      return this.gameLimitBetList.filter(gameLimit => gameLimit.Lst_ProductGameId == this.selectedGame.Lst_Category);
    },
  },
};
</script>
