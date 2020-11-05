<template>
  <div class="game">
    <div class="game__jackpot" v-if="jackpot">
      <span class="game__jackpot__text">{{ numeral(jackpot).format('0,0') }}</span>
    </div>
    <router-view />
  </div>
</template>

<script>
import { apiGetJackpotTotal } from '@/api/game';
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
      numeral: numeral,
      jackpot: null,
      intervalJackpot: null,
    };
  },
  mounted() {
    if (this.$route.params.type == 2) {
      this.getJackpotTotal();
      this.intervalJackpot = window.setInterval(() => {
        this.getJackpotTotal();
      }, 20000);
    }
  },
  beforeDestroy() {
    console.log('[GameHome beforeDestroy]', 'clearInterval');
    window.clearInterval(this.intervalJackpot);
  },
  methods: {
    async getJackpotTotal() {
      const requestData = { Tag: this.productTag };
      const result = await apiGetJackpotTotal(requestData);
      console.log('[Jackpot]', result.RetObj);
      if (result.Code == 200) {
        this.jackpot = result.RetObj;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.game {
  padding-top: 88px;
  padding-bottom: 119px;
  min-height: 65vh;

  &__jackpot {
    position: relative;
    height: 71px;
    margin-bottom: 28px;
    background-repeat: no-repeat;
    background-position: center;

    &__text {
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
  }
}
</style>

<style>
/* .game {
  padding-top: 88px;
  padding-bottom: 119px;
  min-height: 65vh;
} */

/* .game__jackpot {
  position: relative;
  height: 71px;
  margin-bottom: 28px;
  background-repeat: no-repeat;
  background-position: center;
} */

/* .game__jackpot__text {
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
} */
</style>
