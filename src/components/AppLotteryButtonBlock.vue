<template>
  <div class="lottery-btn-block">
    <div class="lottery-btn-block__win-wheel" @click="$store.commit('setModalWinWheelIsShow', true)">
      <span class="lottery-btn-block__win-wheel__text">
        {{ $t('ui.button.lotteryCount', { count: userLotteryCountWinWheel.Count }) }}
      </span>
    </div>
    <div class="lottery-btn-block__red-envelope" @click="$store.commit('setModalRedEnvelopeIsShow', true)">
      <span class="lottery-btn-block__red-envelope__text">
        {{ $t('ui.button.lotteryCount', { count: userLotteryCountRedEnvelope.Count }) }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'AppLotteryButtonBlock',
  computed: {
    ...mapGetters(['userLotteryCountWinWheel', 'userLotteryCountRedEnvelope']),
  },
};
</script>
