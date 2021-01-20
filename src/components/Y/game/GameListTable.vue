<template>
  <div class="game-lobby-list" v-if="Object.keys(productCurrent).length > 0">
    <div v-if="productCurrent.Lst_Site_Product_Status != 0">
      <h1 class="text-center">{{ $t('alert.gameMaintenance') }}</h1>
    </div>
    <table class="game-lobby-list__table" v-else>
      <tbody>
        <tr
          class="game-lobby-list__table__tr"
          v-for="(item, index) in gameList"
          :key="item.Lst_GameID + index"
          @click="openGame(item, 0)"
        >
          <td class="game-lobby-list__table__tr__td-1st">
            <img class="game-lobby-list__table__tr__td-1st__img" :src="item.imagePath" />
          </td>
          <td class="game-lobby-list__table__tr__td-2nd">{{ item.Lst_GameName }}</td>
          <td class="game-lobby-list__table__tr__td-3rd">
            <a href="javascript:;" class="game-lobby-list__table__tr__td__link--start">
              {{ $t('game.link.play') }}
            </a>
            <a
              href="javascript:;"
              class="game-lobby-list__table__tr__td__link--free"
              @click.capture.stop="openGame(item, 1)"
              v-if="isShowDemo"
            >
              {{ $t('game.link.free') }}
            </a>
            <a
              href="javascript:;"
              class="game-lobby-list__table__tr__td__link--favorites"
              :class="{ active: item.Lst_IsLike }"
              @click.capture.stop="changeGameFav(item)"
              v-if="isShowLike"
            >
              {{ $t('game.link.fav') }}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
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
