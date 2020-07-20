<template>
  <div id="gameblock" class="are-game">
    <ul class="cpn-boxzero cpn-inBlock-row ul-game">
      <li
        class="li-game"
        v-for="(game, index) in list"
        :key="index"
        :style="{ 'background-image': `url(${resourceUrl}/imgs/game/${game.sGameID}.png)` }"
      >
        <router-link
          :to="{ name: 'About', query: { scrollTo: '#gameGclub' } }"
          class="lnk-game"
          href="javascript:void(0)"
        >
          {{ game.Lst_Name }}
        </router-link>
      </li>

      <!-- <li
        class="li-game"
        v-for="(game, index) in list"
        :key="index"
        :style="{ 'background-image': `url(${game.img})` }"
      >
        <router-link
          :to="{ name: 'About', query: { scrollTo: '#gameGclub' } }"
          class="lnk-game"
          href="javascript:void(0)"
        >
          {{ game.name }}
        </router-link>
      </li> -->
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
