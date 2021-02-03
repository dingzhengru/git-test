<template>
  <AppModal :isShow="isShow" @close="closeWinWheel">
    <div class="win-wheel-container">
      <WinWheel
        :wheelStyle="wheelStyle"
        :wheelOptions="wheelOptions"
        :wheelSegmentsPrize="wheelSegmentsPrize"
        :gameChance="wheelGameChance"
        :gamePrize="wheelGamePrize"
        :isWheelLoading="isWinWheelLoading"
        :errMsg="wheelErrorMessage"
        @startHandler="startWheelHandler"
      >
        <template v-slot:game-chance>
          <div class="acticityWinwheel__title">
            {{ $t('home.lottery.winWheel.homeTitle', { count: wheelGameChance }) }}
          </div>
        </template>
        <template v-slot:game-dialog>
          <!-- <div class="acticityWinwheel__result">恭喜獲得</div> -->
          <div class="acticityWinwheel__prize">{{ wheelGamePrize.text }}</div>
        </template>
      </WinWheel>
    </div>
  </AppModal>
</template>

<script>
import mixinLotteryWinWheel from '@/mixins/lotteryWinWheel';
export default {
  name: 'ModalWinWheel',
  mixins: [mixinLotteryWinWheel],
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppModal: () => import('@/components/AppModal'),
    WinWheel: () => import('@/components/lottery/WinWheel'),
  },
};
</script>
