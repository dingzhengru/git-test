<template>
  <ul class="home-game__ul">
    <li
      class="home-game__ul__li"
      :id="game.id"
      v-for="(game, index) in list"
      :key="index"
      :style="{ 'background-image': `url(${resourceUrl}/imgs/game/game${game.sGameID}.png)` }"
    >
      <router-link
        v-if="!isLoggedIn"
        :to="{ name: 'About', query: { scrollTo: gameClassMap[game.sURL] } }"
        class="home-game__ul__li__link"
      >
        {{ game.Lst_Name }}
      </router-link>
      <a v-else class="home-game__ul__li__link" href="javascript:;" @click="handleGameLink(game)">
        {{ game.Lst_Name }}
        <!-- :to="{ name: 'GameLobby', params: { type: 'gametype01' }, query: { category: 'all' } }" -->
      </a>
    </li>
  </ul>
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
    isLoggedIn: {
      type: Boolean,
      default: () => false,
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
  methods: {
    handleGameLink(game) {
      this.$emit('handleGameLink', game);
    },
  },
};
</script>

<style scoped>
.home-game__ul {
  padding: 20px 0 0 0;
  margin: 0 32px;
}
.home-game__ul__li {
  display: inline-block;
  vertical-align: top;
  margin: 0 2px 30px;
  background-repeat: no-repeat;
  background-position: center top;
}
.home-game__ul__li__link {
  display: block;
  width: 213px;
  padding-top: 111px;
  color: #fff;
  font-size: 2.461em;
  text-align: center;
  line-height: 54px;
}
</style>
