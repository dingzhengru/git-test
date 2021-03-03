import { mapGetters } from 'vuex';
import { apiGetCaptcha } from '@/api/captcha';
import {
  apiGetDepositAllActivityList,
  apiGetDepositThirdPartyInfo,
  apiDepositThirdParty,
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
      console.log(result);
      if (result.Code === 200) {
        console.log(200);
      } else if (result.Code === 203 || result.Code === 599) {
        //* 驗證碼錯誤
        alert(result.ErrMsg);
        this.changeCaptcha();
      }
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
      const requestDataCaptcha = { pageCode: 'ThirdParty' };
      const result = await apiGetCaptcha(requestDataCaptcha);
      if (result.Code == 200) {
        this.captchaImage = result.RetObj;
        this.user.CaptchaValue = '';
      }
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
  },
};
