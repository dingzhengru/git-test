<template>
  <div id="gameblock" class="are-game">
    <a href="/Y/NoneLogin/FreePlay/" class="lnk-freeGo">
      <i class="icn-freeGo"></i> <span class="txt-freeGo">Free Play</span>
    </a>

    <ul class="cpn-boxzero cpn-inBlock-row ul-game">
      <li
        class="li-game"
        v-for="(game, index) in gameList"
        :key="index"
        :style="{ 'background-image': `url(${game.img})` }"
      >
        <a class="lnk-game" href="javascript:void(0)">
          {{ game.name }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import game1010 from '@/assets/Y/01/03/imgs/game/game1010.png';
import game1020 from '@/assets/Y/01/03/imgs/game/game1020.png';
import game1040 from '@/assets/Y/01/03/imgs/game/game1040.png';

export default {
  name: 'HomeGameBlock',
  data() {
    return {
      gameList: [],
    };
  },
  computed: {
    ...mapGetters(['type']),
  },
  mounted() {
    this.gameList = [
      {
        name: 'game1010',
        img: game1010,
      },
      {
        name: 'game1020',
        img: game1020,
      },
      {
        name: 'game1040',
        img: game1040,
      },
      {
        name: 'game1040',
        img: game1040,
      },
      {
        name: 'game1040',
        img: game1040,
      },
      {
        name: 'game1040',
        img: game1040,
      },
      {
        name: 'game1040',
        img: game1040,
      },
      {
        name: 'game1040',
        img: game1040,
      },
      {
        name: 'game1040',
        img: game1040,
      },
    ];
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
