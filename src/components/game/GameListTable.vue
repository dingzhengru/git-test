<template>
  <div v-if="Object.keys(productCurrent).length > 0">
    <div v-if="productCurrent.Lst_Site_Product_Status != 0">
      <h1 class="text-center">{{ $t('alert.gameMaintenance') }}</h1>
    </div>
    <table class="game-lobby__table" v-else>
      <tbody>
        <tr
          class="game-lobby__table__tr"
          v-for="(game, index) in gameList"
          :key="game.Lst_GameID + index"
          @click="openGame(game, 0)"
        >
          <td class="game-lobby__table__tr__td-1st">
            <img class="game-lobby__table__tr__td-1st__img" :src="game.imagePath" />
          </td>
          <td class="game-lobby__table__tr__td-2nd">{{ game.Lst_GameName }}</td>
          <td class="game-lobby__table__tr__td-3rd">
            <a href="javascript:;" class="game-lobby__table__tr__td__link--start">
              {{ $t('game.link.play') }}
            </a>
            <a
              href="javascript:;"
              class="game-lobby__table__tr__td__link--freeplay"
              @click.capture.stop="openGame(game, 1)"
              v-if="isShowDemo"
            >
              {{ $t('game.link.free') }}
            </a>
            <a
              href="javascript:;"
              class="game-lobby__table__tr__td__link--favorites"
              :class="{ active: game.Lst_IsLike }"
              @click.capture.stop="changeGameFav(game)"
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

<style lang="scss" scoped>
.game-lobby {
  &__table {
    width: 100%;
    letter-spacing: -1px;

    &__tr {
      &__td-1st {
        max-width: 152px;
        padding: 0 10px;
        overflow: hidden;

        &__img {
          width: 100%;
        }
      }
      &__td-2nd {
        width: auto;
        min-width: 208px;
        padding: 0 5px;
        font-size: 24px;
        color: #92a0c0;
        font-weight: bold;
        vertical-align: middle;
        word-break: break-word;
      }
      &__td-3rd {
        width: auto;
        padding: 10px 0;
        white-space: nowrap;
        text-align: center;

        & > a {
          display: inline-block;
          width: 90px;
          height: 83px;
          color: #fff;
          font-size: 21px;
          line-height: 205px;
          margin: 0 10px;
          background-repeat: no-repeat;
        }
      }
    }
  }
}
</style>
