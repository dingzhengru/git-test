import { mapGetters } from 'vuex';
import { apiGetCaptcha } from '@/api/captcha';
import {
  apiDepositThirdParty,
  apiDepositCheckOrderStatus,
  apiGetDepositAllActivityList,
} from '@/api/transaction-deposit';
export default {
  name: 'MixinTransactionDepositThirdParty',
  props: {
    depositInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['lang']),
    getPlatformListByMethod() {
      if (this.$isObjEmpty(this.depositInfo)) {
        return [];
      }
      return this.depositInfo.paymentListJson.filter(item => item.dm_Guid === this.method);
    },
    amountMin() {
      if (this.$isObjEmpty(this.platform)) {
        return 0;
      }
      return this.platform.spp_down_limit;
    },
    amountMax() {
      if (this.$isObjEmpty(this.platform)) {
        return 0;
      }
      return this.platform.spp_up_limit;
    },
    iframeRatio() {
      return window.innerWidth / screen.width;
    },
  },
  data() {
    return {
      promotionList: [],
      method: '',
      platform: {},
      amount: 0,
      remark: '',
      promotion: '-1',
      captcha: '',
      amountList: [100, 200, 500, 1000],
      isShowInputAmount: false,
      captchaImage: {
        ImgBase64: '',
        Width: 147,
        Height: 60,
      },

      iframe: {
        isShow: false,
        src:
          'https://cash.jsapq5279.com/ppayVN2/deposit/msg?IsSuccess=1&Message=done&oid=202103031541531334088784&bankAccount=0852666447&bankCode=KBANK&bankName=KBANK&branchName=%25E0%25B8%25AA%25E0%25B8%25B3%25E0%25B9%2582%25E0%25B8%25A3%25E0%25B8%2587&bankAccountName=%25E0%25B8%258A%25E0%25B8%25B1%25E0%25B8%25A2%25E0%25B8%2598%25E0%25B8%2599%25E0%25B8%25B1%25E0%25B8%2599%25E0%25B8%2597%25E0%25B9%258C%2B%2B%25E0%25B8%2581%25E0%25B8%25B8%25E0%25B8%25A5%25E0%25B8%259E%25E0%25B8%25B4%25E0%25B8%259E%25E0%25B8%25B1%25E0%25B8%2592%25E0%25B8%2599%25E0%25B9%258C%25E0%25B8%259C%25E0%25B8%25A5&noteNo=W3302S&orig_money=1.00&money=0.16&lang=tl&cardNumber=&cardIndex=&pay_page_type=PromptPay',
      },

      intervalCheckOrderStatus: null,
      isOrderSuccess: false,
    };
  },
  methods: {
    async submitDeposit() {
      const requestData = {
        Add_Company_ServiceKey: this.platform.spp_key,
        Add_Pay_Money: this.amount,
        Add_Activity: this.promotion,
        Add_Pay_Memo: this.remark,
        CaptchaValue: this.captcha,
      };

      const result = await apiDepositThirdParty(requestData);
      if (result.Code === 200) {
        this.iframe.isShow = true;
        this.iframe.src = result.RetObj.PayUrl;

        this.intervalCheckOrderStatus = window.setInterval(() => {
          this.checkDepositCheckOrderStatus(result.RetObj.Lst_TransID);
        }, 2000);
      }

      this.changeCaptcha();
    },
    async checkDepositCheckOrderStatus(Lst_TransID) {
      const requestData = { Lst_TransID };
      const result = await apiDepositCheckOrderStatus(requestData);
      if (result.Code === 200 && result.RetObj === true) {
        window.clearInterval(this.intervalCheckOrderStatus);
        this.isOrderSuccess = true;
        this.resetForm();
        this.changeCaptcha();
      }
    },
    changeMethod(method) {
      if (typeof method === 'string') {
        this.method = method;
      } else {
        this.method = method.Value;
      }
      this.platform = this.getPlatformListByMethod.find(item => !item.isMaintenance) || {};
      this.amount = 0;
    },
    async getPromotionListThirdParty() {
      const requestData = { ActivityType: 3 };
      const result = await apiGetDepositAllActivityList(requestData);

      if (result.Code === 200) {
        this.promotionList = result.RetObj.AllActivityList;
      }
    },
    changePlatform(platform) {
      if (platform.isisMaintenance) {
        return;
      }
      this.platform = platform;
      this.amount = 0;
    },
    changeAmountByButton(amount) {
      this.amount = amount;
      this.isShowInputAmount = false;
    },
    showInputAmount() {
      this.amount = 0;
      this.isShowInputAmount = true;
    },
    inputAmount() {
      if (this.amount < this.amountMin) {
        this.amount = this.amountMin;
      } else if (this.amount > this.amountMax) {
        this.amount = this.amountMax;
      }
    },
    async changeCaptcha() {
      const requestData = { pageCode: 'ThirdParty' };
      const result = await apiGetCaptcha(requestData);
      if (result.Code == 200) {
        this.captchaImage = result.RetObj;
        this.captcha = '';
      }
    },
    receiveMessageHandler(event) {
      console.log('Receive Message', event);
      this.closeIframe();
    },
    closeIframe() {
      window.clearInterval(this.intervalCheckOrderStatus);
      this.iframe.isShow = false;
      this.iframe.src = '';
    },
    resetForm() {
      this.method = '';
      this.platform = {};
      this.amount = 0;
      this.remark = '';
      this.promotion = '-1';
      this.captcha = '';
    },
  },
  mounted() {
    this.changeCaptcha();
    // this.getPromotionListThirdParty();

    window.addEventListener('message', this.receiveMessageHandler);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.receiveMessageHandler);
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        if (this.$route.params.payment === undefined) {
          return;
        }

        this.changeMethod(this.$route.params.payment);
      },
    },
  },
};
