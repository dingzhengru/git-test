import { mapGetters } from 'vuex';
import { apiPlayLottery, apiPlayLotteryResult } from '@/api/lottery';

export default {
  name: 'MixinLotteryRedEnvelope',
  computed: {
    ...mapGetters(['userLotteryCountRedEnvelope', 'modalRedEnvelopeIsShow']),
  },
  data() {
    return {
      redEnvelopeBillNo: '', // (獎項列表API)活動單號，需夾帶給抽獎API
      redEnvelopeGameChance: '', //(抽獎API)剩餘抽獎次數
      redEnvelopeGamePrize: '', //(抽獎API)回傳獎項

      redEnvelopePrizeList: [], // (獎項列表API)獎項列表，抽獎後接露

      // isShowRedEnvelope: false,

      // 錯誤訊息
      redEnvelopeErrorMessage: '',
    };
  },
  methods: {
    // 取得獎項列表
    async initHandlerRedEnvelope() {
      this.redEnvelopeBillNo = '';
      this.redEnvelopeGameChance = '';
      this.redEnvelopeGamePrize = '';

      //* 沒有抽獎次數
      if (this.userLotteryCountRedEnvelope.Count <= 0) {
        this.errMsg = this.$t('lottery.noChance');
        return;
      }

      const result = await apiPlayLottery({ ActivityType: 1 });
      if (result.Code == 200) {
        const data = result.RetObj;
        this.redEnvelopeBillNo = data.BillNo;
        this.redEnvelopeGameChance = data.LotteryCount;
        this.redEnvelopeStyle.activityImgUrl = data.ActivityImageUrl;

        let prizesList = [];
        data.prizesList.forEach((item, index) => {
          prizesList[index] = {
            image: item.Lst_ImageUrl,
            text: item.Lst_PrizeName,
            key: item.Lst_PrizeKey,
          };
        });

        this.redEnvelopePrizeList = prizesList;
      }
    },
    // 抽獎事件
    async selectRedEnvelopeHandler() {
      const result = await apiPlayLotteryResult({ ActivityType: 1, BillNo: this.redEnvelopeBillNo });
      this.redEnvelopeGamePrize = {
        text: result.RetObj.Lst_PrizeName,
        key: result.RetObj.Lst_PrizeKey,
      };
      this.redEnvelopeGameChance--;
    },
    closeRedEnvelope() {
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
  mounted() {
    this.initHandlerRedEnvelope();
  },
};
