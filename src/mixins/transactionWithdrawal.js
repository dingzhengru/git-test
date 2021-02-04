import { mapGetters } from 'vuex';
import { apiGetWithdrawalInfo, apiWithdrawal } from '@/api/transaction-withdrawal';
import { apiTransferAllGamePointToMain } from '@/api/transaction-transfer';

export default {
  name: 'TransactionWithdrawal',
  computed: {
    ...mapGetters(['lang', 'siteFullCss', 'userGamePointWallet']),
    amountMax() {
      if (this.withdrawalInfo.Lst_Point < this.withdrawalInfo.WithalUplimit) {
        return this.withdrawalInfo.Lst_Point;
      }
      return this.withdrawalInfo.WithalUplimit;
    },
  },
  data() {
    return {
      withdrawalInfo: {},
      bankList: [],
      currencyList: [],
      bank: {},
      currency: 'THB',
      amount: 0,
      password: '',
      noticeList: ['transaction.withdrawal.notice.contact'],
    };
  },
  methods: {
    async getWithdrawalInfo() {
      const result = await apiGetWithdrawalInfo();
      this.withdrawalInfo = result.RetObj;
      this.bankList = result.RetObj.Add_MemberBankAccountList;
      this.currencyList = result.RetObj.BaseCurrencyItem;

      if (this.bankList.length == 1) {
        this.bank = this.bankList[0];
      }

      //* 若會員的 Add_MemberBankAccountList 為空，則轉去會員中心
      if (this.bankList.length <= 0) {
        this.$router.replace({ name: 'UserProfile' });
      }
    },
    async transferToMain() {
      const result = await apiTransferAllGamePointToMain();
      if (result.Code == 200) {
        this.withdrawalInfo.Lst_Point = result.RetObj.GameSitePoints.find(item => item.Product_id == 9999).Point;
        window.alert(result.RetObj.MsgString);
      }
    },
    async submitWithdrawal() {
      const requestData = {
        Add_RealName: this.withdrawalInfo.Add_RealName,
        Add_MemberBankID: this.bank.Lst_BankID,
        Add_MemberBankName: this.bank.Lst_Bank_name,
        Add_MemberBankBranchesName: this.bank.Lst_Bank_Branches,
        Add_MemberBankAccount: this.bank.Lst_BankAccount,
        Add_WithdrswalsPoint: this.amount,
        Add_Withdrawals_Password: this.password,
        Add_Request_Currency: this.currency || 'THB',
        Add_Exchange_Rate: 1,
        Add_PayMemo: '',
        Add_SelectBank: this.bank.Value,
      };

      const result = await apiWithdrawal(requestData);
      if (result.Code == 200) {
        this.$router.push({ name: 'TransactionWithdrawal' });
      }
    },
    changeAmount() {
      if (this.amount > this.amountMax) {
        this.amount = this.amountMax;
      } else if (this.amount < this.withdrawalInfo.WithalDownlimit) {
        this.amount = this.withdrawalInfo.WithalDownlimit;
      }

      //* 取最小整數、並轉換最後兩位為 0
      if (this.amount % 100 != 0) {
        const amountStringList = String(Math.floor(this.amount)).split('');
        amountStringList[amountStringList.length - 1] = 0;
        amountStringList[amountStringList.length - 2] = 0;
        this.amount = Number(amountStringList.join(''));
      }
    },
    validateForm() {
      if (
        this.amount < this.withdrawalInfo.WithalDownlimit ||
        this.amount > this.withdrawalInfo.WithalUplimit ||
        this.amount > this.withdrawalInfo.Lst_Point ||
        this.amount % 100 != 0
      ) {
        return false;
      } else if (this.bank == '' || Object.keys(this.bank).length == 0) {
        return false;
      } else if (this.password == '' || this.password.length < 6) {
        return false;
      }
      return true;
    },
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/transaction-withdrawal.scss`);

    this.getWithdrawalInfo();
  },
  watch: {
    lang() {
      this.getWithdrawalInfo();
    },
  },
};
