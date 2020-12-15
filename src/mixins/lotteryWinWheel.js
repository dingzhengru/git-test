import mixinLotteryGame from '@/mixins/lotteryGame';
import { apiPlayLottery, apiPlayLotteryResult } from '@/api/lottery';

//* Loading 圖片
import lotteryLoadingImage from '@/assets/common/lottery/loading.svg';

//* 轉盤遊戲的圖片
// import wheelContainerBackgroundImage from '@/assets/common/lottery/winWheel/container-bg.png';
import wheelPrizeImage from '@/assets/common/lottery/winWheel/prize.png';
import wheelPointerImage from '@/assets/common/lottery/winWheel/pointercn.png';
import wheelLodaingImage from '@/assets/common/lottery/winWheel/wheel-loading.svg';
import wheelBackgroundImage from '@/assets/common/lottery/winWheel/wheel-bg.png';

export default {
  name: 'MixinLotteryWinWheel',
  mixins: [mixinLotteryGame],
  data() {
    return {
      wheelBillNo: '', // (獎項列表API)活動單號，需夾帶給抽獎API
      wheelGameChance: '', //(抽獎API)剩餘抽獎次數
      wheelGamePrize: '', //(抽獎API)回傳獎項

      wheelSegmentsPrize: [], // (獎項列表API)獎項列表，抽獎後接露

      isShowWinWheel: false,
      isWinWheelLoading: false, //控制抽獎 loading 動畫

      // 錯誤訊息
      wheelErrorMessage: '',

      //* 轉盤樣式
      wheelStyle: {
        width: 580, //轉盤寬度
        height: 580, //轉盤高度
        loadingImgUrl: lotteryLoadingImage, //遊戲loading
        activityImgUrl: '', //(獎項表單API)活動標題圖片
        prizeImgUrl: wheelPrizeImage, //禮物
        pointerImgUrl: wheelPointerImage, //開始抽獎按鈕
        wheelLodaingImgUrl: wheelLodaingImage, //轉盤loading
        wheelBackgroundImgUrl: wheelBackgroundImage, //轉盤背景
        wheelColor1: '#FFFFFF', //轉盤顏色1
        wheelColor2: '#FFF4D6', //轉盤顏色2
      },
      //* 轉盤設定
      wheelOptions: {
        textFontSize: 18,
        outerRadius: 255, //外圓半徑
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
  methods: {
    //* 初始化遊戲、獲取轉盤資料
    async initWheelHandler() {
      this.wheelBillNo = '';
      this.wheelGameChance = '';
      this.wheelGamePrize = '';
      this.isWheelLoading = true;

      const result = await apiPlayLottery({ ActivityType: 0 });
      if (result.Code == 200) {
        const data = result.RetObj;

        this.wheelGameChance = data.LotteryCount;
        this.wheelBillNo = data.BillNo;
        this.wheelStyle.activityImgUrl = data.ActivityImageUrl;
        this.isWheelLoading = false;

        let prizeApiList = [];

        data.prizesList.forEach((item, index) => {
          let bgColor = index % 2 == 0 ? this.wheelStyle.wheelColor1 : this.wheelStyle.wheelColor2;
          prizeApiList[index] = {
            image: item.Lst_ImageUrl,
            text: item.Lst_PrizeName,
            key: item.Lst_PrizeKey,
            fillStyle: bgColor,
          };
        });
        this.wheelSegmentsPrize = prizeApiList;

        //* 顯示
        this.isShowWinWheel = true;
      }
    },
    //* 啟動轉盤遊戲、獲取中獎資料
    async startWheelHandler() {
      //* 為了應付重複遊玩
      await this.initWheelHandler();

      this.isWheelLoading = true;
      const result = await apiPlayLotteryResult({ ActivityType: 0, BillNo: this.wheelBillNo });
      if (result.Code == 200) {
        this.wheelGamePrize = {
          text: result.RetObj.Lst_PrizeName,
          key: result.RetObj.Lst_PrizeKey,
        };
        this.wheelGameChance--;
        this.isWheelLoading = false;
      }
    },
    closeWinWheel() {
      this.isShowWinWheel = false;
      this.wheelBillNo = '';
      this.wheelGameChance = '';
      this.wheelGamePrize = '';

      //* 放這裡避免遊戲中出現 Loading 畫面

      //* 更新取得抽獎次數列表來更新首頁
      this.getLotteryCountList();

      //* 更新用戶點數
      this.$store.dispatch('user/getInfo');
    },
  },
};
