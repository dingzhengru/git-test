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

<style></style>
