<template>
  <AppModal @close="closeRedEnvelope">
    <div class="red-envelope-container">
      <div class="ui-box-close" @click="closeRedEnvelope"></div>
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
          <span>{{ $t('home.lottery.redEnvelope.gameResult') }}</span>
          <span>【 {{ redEnvelopeGamePrize.text }} 】</span>
        </template>
      </RedEnvelope>
    </div>
  </AppModal>
</template>

<script>
import mixinLotteryRedEnvelope from '@/mixins/lotteryRedEnvelope';

//* Loading 圖片
import lotteryLoadingImage from '@/assets/common/lottery/loading.svg';

//* 紅包遊戲的圖片
import cardFrontImgage from '@/assets/common/lottery/redEnvelope/lucky--close1.png';
import cardBackImgage from '@/assets/common/lottery/redEnvelope/lucky--open3.png';
import dialogImgage from '@/assets/common/lottery/redEnvelope/bg-winPrize.png';
import envelopeLoadingImgage from '@/assets/common/lottery/redEnvelope/eclipse.svg';
export default {
  name: 'ModalRedEnvelope',
  mixins: [mixinLotteryRedEnvelope],
  components: {
    AppModal: () => import('@/components/AppModal'),
    RedEnvelope: () => import('@/components/lottery/RedEnvelopeLandscape'),
  },
  data() {
    return {
      //* 紅包
      redEnvelopeStyle: {
        loadingImgUrl: lotteryLoadingImage, //遊戲loading
        activityImgUrl: '', //(獎項列表API)活動標題圖片
        cardFrontImgUrl: cardFrontImgage, //翻牌前
        cardBackImgUrl: cardBackImgage, //翻牌後
        dialogImgUrl: dialogImgage, //彈跳視窗背景
        envelopeLoadingImgUrl: envelopeLoadingImgage, //紅包loading
      },
    };
  },
};
</script>
