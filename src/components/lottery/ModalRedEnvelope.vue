<template>
  <AppModal :isShow="isShow" @close="closeRedEnvelope">
    <div class="red-envelope-container">
      <RedEnvelope
        :gameStyle="redEnvelopeStyle"
        :prizeList="redEnvelopePrizeList"
        :gameChance="redEnvelopeGameChance"
        :gamePrize="redEnvelopeGamePrize"
        :errMsg="redEnvelopeErrorMessage"
        @startHandler="initHandlerRedEnvelope"
        @selectHandler="selectRedEnvelopeHandler"
      >
        <template v-slot:game-result>
          <div class="acticityRedEnvelepe__result">
            {{ $t('home.lottery.redEnvelope.gameResult') }}
            <br />
            【 {{ redEnvelopeGamePrize.text }} 】
          </div>
        </template>
        <template v-slot:game-chance>
          <div class="acticityRedEnvelepe__chance">
            {{ $t('home.lottery.redEnvelope.startButton', { count: redEnvelopeGameChance }) }}
          </div>
        </template>
      </RedEnvelope>
    </div>
  </AppModal>
</template>

<script>
import mixinLotteryRedEnvelope from '@/mixins/lotteryRedEnvelope';
export default {
  name: 'ModalRedEnvelope',
  mixins: [mixinLotteryRedEnvelope],
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    AppModal: () => import('@/components/AppModal'),
    RedEnvelope: () => import('@/components/lottery/RedEnvelope'),
  },
};
</script>
