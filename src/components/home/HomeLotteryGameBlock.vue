<template>
  <div class="home-lottery">
    <template v-for="lottery in lotteryList">
      <div class="lottery" :class="`lottery${lottery.Type}`" :key="lottery.Type" v-if="lottery.Count > 0">
        <i class="lottery__icon"></i>
        <ul class="lottery__ul" @click="openLotteryGame(lottery)">
          <li class="lottery__ul__li">
            <template v-if="lottery.Type == 0">
              {{ $t('home.lottery.winWheel.homeTitle', { count: lottery.Count }) }}
            </template>
            <template v-else-if="lottery.Type == 1">
              {{ $t('home.lottery.redEnvelope.homeTitle', { count: lottery.Count }) }}
            </template>
          </li>
        </ul>
      </div>
    </template>
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

<style lang="scss" scoped>
.lottery {
  width: 427px;
  height: 75px;
  line-height: 75px;
  margin: 0 auto;
  text-align: center;
  // cursor: pointer;
  position: relative;

  &__icon {
    display: inline-block;
    width: 71px;
    height: 73px;
    padding-top: 22px;
    position: absolute;
    left: -18px;
  }

  &__ul {
    margin: 0;
    list-style: none;
    display: inline-block;
    width: 409px;
    height: 71px;
    padding: 23px 0 0 20px;
    background: url(~@/assets/common/main/prizeBg.png) left center no-repeat;

    &__li {
      font-size: 36px;
      font-weight: bold;
      line-height: 26px;
      text-indent: 8px;
      filter: drop-shadow(0px 1px 1px #272727);
      color: #fff;
      /*文字閃動*/
      animation: colorchange 1s infinite alternate;
    }
  }
}

.lottery0 .lottery__icon {
  background: url(~@/assets/common/main/prizeIcn.png) left center no-repeat;
}

.lottery1 .lottery__icon {
  background: url(~@/assets/common/main/luckyDrawIcn.png) left center no-repeat;
}

@keyframes colorchange {
  0% {
    color: #fff;
  }
  20% {
    color: #fc0;
  }
  40% {
    color: #fff;
  }
  60% {
    color: #fc0;
  }
  80% {
    color: #fff;
  }
  100% {
    color: #fc0;
  }
}
</style>
