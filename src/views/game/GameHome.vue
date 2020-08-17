<template>
  <div class="game">
    <div class="game__jackpot">
      <span class="game__jackpot__text">{{ jackpot }}</span>
    </div>
    <router-view />
  </div>
</template>

<script>
import { getJackpotTotal } from '@/api/game';
import numeral from 'numeral';
export default {
  name: 'GameHome',
  computed: {
    productTag() {
      return this.$route.params.id + '-' + this.$route.params.key;
    },
  },
  data() {
    return {
      jackpot: null,
    };
  },
  mounted() {
    const requestDataGetJackpotTotal = { Tag: this.productTag };
    getJackpotTotal(requestDataGetJackpotTotal).then(result => {
      console.log('[Jackpot]', result.RetObj);
      if (result.Code == 200) {
        this.jackpot = numeral(result.RetObj).format('0,0');
      }
    });
  },
};
</script>

<style>
.game {
  padding-top: 88px;
  padding-bottom: 119px;
}

.game__jackpot {
  position: relative;
  height: 71px;
  margin-bottom: 28px;
  background-repeat: no-repeat;
  background-position: center;
}

.game__jackpot__text {
  position: absolute;
  left: 246px;
  top: 3px;
  font-size: 42px;
  font-family: Arial Black, sans-serif;
  font-weight: bold;
  color: #fffefe;
  background: linear-gradient(to bottom, #989898 0%, #ffffff 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
