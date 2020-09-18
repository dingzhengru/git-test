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

      <!-- 維修圖示 -->
      <a class="home-game__ul__li__link--maintain" href="javascript:;" v-if="game.Lst_Site_Product_Status != 0"></a>
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

<style lang="scss" scoped>
.home-game {
  &__ul {
    padding: 20px 0 0 0;
    margin: 0 32px;

    &__li {
      position: relative;
      display: inline-block;
      vertical-align: top;
      margin: 0 2px 30px;
      background-repeat: no-repeat;
      background-position: center top;
      opacity: 1;

      &__link {
        display: block;
        width: 213px;
        padding-top: 111px;
        font-size: 2.461em;
        text-align: center;
        line-height: 54px;

        &--maintain {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          opacity: 0.9;
          z-index: 9999;
        }
      }
    }
  }
}
</style>

<style scoped>
/* .home-game__ul {
  padding: 20px 0 0 0;
  margin: 0 32px;
} */
/* .home-game__ul__li {
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin: 0 2px 30px;
  background-repeat: no-repeat;
  background-position: center top;
  opacity: 1;
} */
/* .home-game__ul__li__link {
  display: block;
  width: 213px;
  padding-top: 111px;
  font-size: 2.461em;
  text-align: center;
  line-height: 54px;
} */

/* .home-game__ul__li__link--maintain {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.9;
  z-index: 9999;
} */
</style>
