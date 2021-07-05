import { mapGetters } from 'vuex';
import { apiDepositAutoCash } from '@/api/transaction-deposit';
export default {
  name: 'MixinTransactionDepositThirdParty',
  props: {
    depositInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapGetters(['lang', 'userBindBank']),
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
      dispensingBank: {},
      amount: 0,
      promotion: '-1',

      remark: '',
    };
  },
  methods: {
    async submitDepositAutoCash() {
      const requestData = {
        Add_Company_ServiceKey: this.depositInfo.AutoCashData.Service_Setting,
        Add_Pay_BankAccount: this.depositInfo.AutoCashData.Lst_BankAccount,
        Add_BindAccount: this.dispensingBank.Value,
        Add_Pay_Money: this.amount,
        Add_Activity: this.promotion,
        Add_Pay_Date: this.$dayjs().format('YYYY-MM-DD HH:mm:ss.SSS'),
        Add_Pay_Memo: this.payMemo,
      };

      console.log(requestData);

      const result = await apiDepositAutoCash(requestData);

      if (result.Code === 200) {
        window.alert(
          this.$t('alert.submitDepositAutoCash', { amount: result.RetObj, currency: this.$t('ui.currency.thaiBaht') })
        );
        this.$router.push({ name: 'TransactionRecordDeposit' });
      } else if (result.Code == 500) {
        window.alert(result.ErrMsg);
      }
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
    //* AutoCashCount > 0 才可以進入 AutoCash
    if (this.depositInfo.AutoCashCount <= 0) {
      return this.$router.push({ name: 'TransactionDepositBase' });
    }

    if (this.userBindBank <= 0) {
      window.alert(`${this.$t('alert.goProfileSetting')}\n${this.$t('alert.NotSetBankDefault')}`);
      return this.$router.push({ name: 'TransactionDepositBase' });
      // return this.$router.push({ name: 'UserProfile' });
    }

    if (this.depositInfo.AutoCashData.Lst_MemberBank.length > 0) {
      this.dispensingBank = this.depositInfo.AutoCashData.Lst_MemberBank[0];
    }
  },
};
