import { mapGetters } from 'vuex';
// import { apiDepositAutoCash } from '@/api/transaction-deposit';
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
    isDepositInfoLoaded() {
      return this.$isObjEmpty(this.depositInfo) === false;
    },
    amountMin() {
      return this.depositInfo.DepositDownlimit;
    },
    amountMax() {
      return this.depositInfo.DepositUplimit;
    },
    payMemo() {
      const amountMMK = Math.round(this.amount * this.depositInfo.hid_THBtoMMKrate * 1000) / 1000;
      return `${this.remark} | ${amountMMK}MMK`;
    },
  },
  data() {
    return {
      promotionList: [],

      dispensingBank: {},
      amount: 0,
      promotion: '-1',

      remark: '',
    };
  },
  methods: {
    submitDepositAutoCash() {
      const requestData = {
        Add_Company_ServiceKey: this.depositInfo.AutoCashData.Service_Setting,
        Add_Pay_BankAccount: this.depositInfo.AutoCashData.Lst_BankAccount,
        Add_Pay_Money: this.amount,
        Add_Activity: this.promotion,
        Add_BindAccount: this.depositInfo.AutoCashCount,
        Add_Pay_Date: this.$dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        Add_Pay_Memo: this.payMemo,
      };

      console.log(requestData);
    },
    inputAmount() {
      if (this.amount < this.amountMin) {
        this.amount = this.amountMin;
      } else if (this.amount > this.amountMax) {
        this.amount = this.amountMax;
      }
    },
    resetForm() {
      this.dispensingBank = {};
      this.amount = 0;
      this.promotion = '-1';
    },
  },
  mounted() {
    //* AutoCashCount > 0 才可以使用 AutoCash
    if (this.depositInfo.AutoCashCount <= 0) {
      return this.$router.push({ home: 'TransactionDepositBase' });
    }
  },
};
