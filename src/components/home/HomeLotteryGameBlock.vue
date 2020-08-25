<template>
  <div class="home-lottery-game">
    <div class="lottery" :class="`lottery${lottery.Type}`" v-for="lottery in lotteryList" :key="lottery.Type">
      <i class="lottery__icon"></i>
      <ul class="lottery__ul" @click="openLotteryGame(lottery)">
        <li class="lottery__li">{{ lottery.Count }} 次 抽奖机会</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeLotteryGameBlock',
  props: {
    lotteryList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    openLotteryGame(lottery) {
      this.$emit('openLotteryGame', lottery);
    },
  },
};
</script>

<style scoped>
.lottery {
  width: 427px;
  height: 75px;
  line-height: 75px;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
  position: relative;
}
.lottery__icon {
  display: inline-block;
  width: 71px;
  height: 73px;
  padding-top: 22px;
  position: absolute;
  left: -18px;
  /* background: url(~@/assets/common/imgs/main/prizeIcn.png) left center no-repeat; */
}
.lottery__ul {
  margin: 0;
  list-style: none;
  display: inline-block;
  width: 409px;
  height: 71px;
  padding: 23px 0 0 20px;
  background: url(~@/assets/common/imgs/main/prizeBg.png) left center no-repeat;
}

.lottery__li {
  font-size: 36px;
  font-weight: bold;
  line-height: 52px;
  text-indent: 8px;
  filter: drop-shadow(0px 1px 1px #272727);
  color: #fff;
  /*文字閃動*/
  animation: colorchange 1s infinite alternate;
}

.lottery0 .lottery__icon {
  background: url(~@/assets/common/imgs/main/prizeIcn.png) left center no-repeat;
}

.lottery1 .lottery__icon {
  background: url(~@/assets/common/imgs/main/luckyDrawIcn.png) left center no-repeat;
}
</style>
