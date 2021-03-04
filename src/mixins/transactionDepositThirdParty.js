import { mapGetters } from 'vuex';
import { apiGetCaptcha } from '@/api/captcha';
import {
  apiGetDepositAllActivityList,
  apiGetDepositThirdPartyInfo,
  apiDepositThirdParty,
  apiDepositCheckOrderStatus,
} from '@/api/transaction-deposit';
export default {
  name: 'MixinTransactionDepositThirdParty',
  computed: {
    ...mapGetters(['lang']),
    getPlatformListByMethod() {
      if (Object.keys(this.depositInfo).length === 0) {
        return [];
      }
      return this.depositInfo.paymentListJson.filter(item => item.dm_Guid === this.method);
    },
    amountMin() {
      if (Object.keys(this.platform).length === 0) {
        return 0;
      }
      return this.platform.spp_down_limit;
    },
    amountMax() {
      if (Object.keys(this.platform).length === 0) {
        return 0;
      }
      return this.platform.spp_up_limit;
    },
  },
  data() {
    return {
      depositInfo: {},
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

      noticeList: [
        'transaction.deposit.notice.currency',
        'transaction.deposit.notice.depositLimit01',
        'transaction.deposit.notice.depositLimit02',
        'transaction.deposit.notice.userBear01',
        'transaction.deposit.notice.userBear02',
        'transaction.deposit.notice.suggest',
        'transaction.deposit.notice.contact',
      ],
    };
  },
  methods: {
    async getDepositAllActivityList() {
      const requestData = { ActivityType: 3 };
      const result = await apiGetDepositAllActivityList(requestData);
      this.promotionList = result.RetObj.AllActivityList;
    },
    async getDepositThirdPartyInfo() {
      const result = await apiGetDepositThirdPartyInfo();
      this.depositInfo = result.RetObj;
      this.method = this.depositInfo.paymentSelect[0].Value;
    },
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
      } else if (result.Code === 203 || result.Code === 599) {
        //* 驗證碼錯誤
        alert(result.ErrMsg);
        this.changeCaptcha();
      }
    },
    async checkDepositCheckOrderStatus(Lst_TransID) {
      const requestData = { Lst_TransID };
      const result = await apiDepositCheckOrderStatus(requestData);
      if (result.Code === 200 && result.RetObj === true) {
        window.clearInterval(this.intervalCheckOrderStatus);
        this.isOrderSuccess = true;
      }
    },
    changeMethod(method) {
      this.method = method.Value;
      this.platform = this.getPlatformListByMethod[0];
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
      if (event.origin !== window.location.origin) {
        return;
      }
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
    },
  },
  mounted() {
    this.getDepositThirdPartyInfo();
    this.getDepositAllActivityList();
    this.changeCaptcha();

    window.addEventListener('message', this.receiveMessageHandler);
  },
  beforeDestroy() {
    window.removeEventListener('message', this.receiveMessageHandler);
  },
  watch: {
    lang() {
      this.getDepositThirdPartyInfo();
      this.getDepositAllActivityList();
    },
  },
};
