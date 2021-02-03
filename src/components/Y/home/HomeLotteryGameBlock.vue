<template>
  <div class="home-lottery">
    <div class="home-lottery__item" v-if="userLotteryCountWinWheel.Count > 0">
      <i class="home-lottery__item__icon home-lottery__item__icon--win-wheel"></i>
      <div class="home-lottery__item__text" @click="$store.commit('setModalWinWheelIsShow', true)">
        {{ $t('home.lottery.winWheel.homeTitle', { count: userLotteryCountWinWheel.Count }) }}
      </div>
    </div>

    <div class="home-lottery__item" v-if="userLotteryCountRedEnvelope.Count > 0">
      <i class="home-lottery__item__icon home-lottery__item__icon--red-envelope"></i>
      <div class="home-lottery__item__text" @click="$store.commit('setModalRedEnvelopeIsShow', true)">
        {{ $t('home.lottery.winWheel.homeTitle', { count: userLotteryCountRedEnvelope.Count }) }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'HomeLotteryGameBlock',
  computed: {
    ...mapGetters(['userLotteryCountWinWheel', 'userLotteryCountRedEnvelope']),
  },
};
</script>
