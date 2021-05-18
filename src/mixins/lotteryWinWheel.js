import { mapGetters } from 'vuex';
import { apiPlayLottery, apiPlayLotteryResult } from '@/api/lottery';

export default {
  name: 'MixinLotteryWinWheel',
  computed: {
    ...mapGetters(['userLotteryCountWinWheel', 'modalWinWheelIsShow']),
  },
  data() {
    return {
      wheelBillNo: '', // (獎項列表API)活動單號，需夾帶給抽獎API
      wheelGameChance: '', //(抽獎API)剩餘抽獎次數
      wheelGamePrize: '', //(抽獎API)回傳獎項

      wheelSegmentsPrize: [], // (獎項列表API)獎項列表，抽獎後接露

      // isShowWinWheel: false,
      isWinWheelLoading: false, //控制抽獎 loading 動畫

      // 錯誤訊息
      wheelErrorMessage: '',
    };
  },
  methods: {
    //* 初始化遊戲、獲取轉盤資料
    async initWheelHandler() {
      this.wheelBillNo = '';
      this.wheelGameChance = '';
      this.wheelGamePrize = '';
      this.isWheelLoading = true;

      //* 沒有抽獎次數
      if (this.userLotteryCountWinWheel.Count <= 0) {
        this.errMsg = this.$t('lottery.noChance');
        return;
      }

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
      this.wheelBillNo = '';
      this.wheelGameChance = '';
      this.wheelGamePrize = '';

      //* 放這裡避免遊戲中出現 Loading 畫面

      //* 更新取得抽獎次數列表來更新首頁
      this.$store.dispatch('user/getLotteryCountList');

      //* 更新用戶點數
      this.$store.dispatch('user/getPointInfo');

      this.$emit('close');
    },
  },
  watch: {
    modalWinWheelIsShow: {
      immediate: true,
      handler() {
        if (this.modalWinWheelIsShow) {
          this.initWheelHandler();
        }
      },
    },
  },
};
