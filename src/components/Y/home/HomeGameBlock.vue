<template>
  <div id="gameblock" class="are-game">
    <ul class="cpn-boxzero cpn-inBlock-row ul-game">
      <li
        class="li-game"
        v-for="(game, index) in list"
        :key="index"
        :style="{ 'background-image': `url(${resourceUrl}/imgs/game/game${game.sGameID}.png)` }"
      >
        <router-link
          v-if="!token"
          :to="{ name: 'About', query: { scrollTo: gameClassMap[game.sURL] } }"
          class="lnk-game"
        >
          {{ game.Lst_Name }}
        </router-link>
        <router-link
          v-if="token"
          :to="{ name: 'GameLobby', params: { type: 'gametype01' }, query: { category: 'all' } }"
          class="lnk-game"
        >
          {{ game.Lst_Name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomeGameBlock',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    resourceUrl: {
      type: String,
      default: () => '',
    },
    token: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      gameClassMap: {
        gameclass01: '#gameGclub',
        gameclass02: '#gameRNG',
        gameclass03: '#gameSport',
      },
    };
  },
};
</script>

<style scoped>
.ul-game {
  margin: 0 32px;
  padding-top: 20px;
}
.li-game {
  background: no-repeat center top;
  margin: 0 2px 30px;
}
.lnk-game {
  display: block;
  width: 213px;
  padding-top: 111px;
  color: #fff;
  font-size: 2.461em;
  text-align: center;
  line-height: 54px;
}

.lnk-freeGo {
  display: block;
  width: 100%;
  height: 109px;
  padding: 20px 0 0 35px;
  box-sizing: border-box;
  margin-bottom: 8px;
}
.icn-freeGo {
  display: inline-block;
  width: 70px;
  height: 64px;
  text-indent: -999em;
  vertical-align: top;
}
.txt-freeGo {
  display: inline-block;
  width: 82%;
  color: #fcf0ca;
  font-size: 32px;
  line-height: 72px;
  padding-left: 20px;
}
</style>
