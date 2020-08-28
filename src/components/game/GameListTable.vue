<template>
  <table class="game-lobby__table">
    <tbody>
      <tr
        class="game-lobby__table__tr"
        v-for="(game, index) in gameList"
        :key="game.Lst_GameID + index"
        @click="openGame(game, 0)"
      >
        <td class="game-lobby__table__tr__td-1st">
          <img class="game-lobby__table__tr__td__img" :src="game.imagePath" />
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
            v-if="$route.params.type == 2 && game.Lst_IsDemo"
          >
            {{ $t('game.link.free') }}
          </a>
          <a
            href="javascript:;"
            class="game-lobby__table__tr__td__link--favorites"
            :class="{ active: game.Lst_IsLike }"
            @click.capture.stop="likeGame(game)"
            v-if="$route.params.type == 2"
          >
            {{ $t('game.link.fav') }}
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'GameListTable',
  props: {
    gameList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    openGame(game, freePlay) {
      this.$emit('open-game', game, freePlay);
    },
    likeGame(game) {
      this.$emit('like-game', game);
    },
  },
};
</script>

<style scoped>
.game-lobby__table {
  width: 100%;
  letter-spacing: -1px;
  background-color: #181b23;
}

.game-lobby__table__tr__td-1st {
  max-width: 152px;
  padding: 0 10px;
  overflow: hidden;
}

.game-lobby__table__tr__td__img {
  width: 100%;
}

.game-lobby__table__tr__td-2nd {
  width: auto;
  min-width: 208px;
  padding: 0 5px;
  font-size: 24px;
  color: #92a0c0;
  font-weight: bold;
  vertical-align: middle;
  word-break: break-word;
}

.game-lobby__table__tr__td-3rd {
  width: auto;
  padding: 10px 0;
  white-space: nowrap;
  text-align: center;
}

.game-lobby__table__tr__td-3rd > a {
  display: inline-block;
  width: 90px;
  height: 83px;
  color: #fff;
  font-size: 21px;
  line-height: 205px;
  margin: 0 10px;
  background-repeat: no-repeat;
}
</style>
