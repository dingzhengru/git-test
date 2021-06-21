<template>
  <AppModal @close="closeWinWheel">
    <div class="win-wheel-container">
      <div class="ui-box-close" @click="closeWinWheel"></div>
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
          {{ $t('ui.lottery.count1') }}
          <span class="win-wheel-container__count">{{ wheelGameChance || 0 }}</span>
          {{ $t('ui.lottery.count2') }}
        </template>
        <template v-slot:game-dialog>
          <!-- <div class="acticityWinwheel__result">恭喜獲得</div> -->
          {{ wheelGamePrize.text }}
        </template>
      </WinWheel>
    </div>
  </AppModal>
</template>

<script>
import mixinLotteryWinWheel from '@/mixins/lotteryWinWheel';
//* Loading 圖片
import lotteryLoadingImage from '@/assets/common/lottery/loading.svg';

//* 轉盤遊戲的圖片
// import wheelContainerBackgroundImage from '@/assets/common/lottery/winWheel/container-bg.png';
// import wheelPrizeImage from '@/assets/common/lottery/winWheel/prize.png';
// import wheelPointerImage from '@/assets/common/lottery/winWheel/pointercn.png';
import wheelLodaingImage from '@/assets/common/lottery/winWheel/wheel-loading.svg';
// import wheelBackgroundImage from '@/assets/common/lottery/winWheel/wheel-bg.png';

import wheelPointerImage from '@/assets/common/lottery/winWheel/landscape/win-wheel-pointer.png';
import wheelBackgroundImage from '@/assets/common/lottery/winWheel/landscape/win-wheel-bg.png';
import wheelPrizeImage from '@/assets/common/lottery/winWheel/landscape/prize.png';

export default {
  name: 'ModalWinWheel',
  mixins: [mixinLotteryWinWheel],
  components: {
    AppModal: () => import('@/components/AppModal'),
    WinWheel: () => import('@/components/lottery/WinWheelLandscape'),
  },
  data() {
    return {
      //* 轉盤樣式
      wheelStyle: {
        width: 1004, //轉盤寬度
        height: 750, //轉盤高度
        loadingImgUrl: lotteryLoadingImage, //遊戲loading
        activityImgUrl: '', //(獎項表單API)活動標題圖片
        prizeImgUrl: wheelPrizeImage, //禮物
        pointerImgUrl: wheelPointerImage, //開始抽獎按鈕
        wheelLodaingImgUrl: wheelLodaingImage, //轉盤loading
        wheelBackgroundImgUrl: wheelBackgroundImage, //轉盤背景
        wheelColor1: '#dbbf5e', //轉盤顏色1
        wheelColor2: '#ffffff', //轉盤顏色2
      },
      //* 轉盤設定
      wheelOptions: {
        textFontSize: 16,
        outerRadius: 255, //外圓半徑
        // centerX: 0, // correctly position the wheel
        centerY: 345, // over the background.
        innerRadius: 0, //內圓半徑(預設0)
        lineWidth: 0,
        drawMode: 'segmentImage', // code: 以文字及style顯示, image: 背景圖片顯示, segmentImage: 每個欄位一張圖片
        segmentImageBackground: true, // 欄位圖片是否繪製背景色(fillStyle)
        // wheelImage: "/planes.png", // (選)背景圖片位置
        animation: {
          type: 'spinToStop',
          duration: 2,
          spins: 5,
        },
      },
    };
  },
};
</script>
