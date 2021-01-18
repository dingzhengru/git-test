<template>
  <div class="home-lottery">
    <template v-for="item in lotteryList">
      <div class="home-lottery__item" :class="`lottery-type-${item.Type}`" :key="item.Type" v-if="item.Count > 0">
        <i class="home-lottery__item__icon"></i>
        <div class="home-lottery__item__text" @click="openLotteryGame(item)">
          <template v-if="item.Type == 0">
            {{ $t('home.lottery.winWheel.homeTitle', { count: item.Count }) }}
          </template>
          <template v-else-if="item.Type == 1">
            {{ $t('home.lottery.redEnvelope.homeTitle', { count: item.Count }) }}
          </template>
        </div>
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
