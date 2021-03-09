import { mapGetters } from 'vuex';
import { apiGetDepositInfo, apiDeposit } from '@/api/transaction-deposit';
export default {
  name: 'TransactionDepositBase',
  computed: {
    ...mapGetters(['lang']),
    amountMin() {
      return this.depositInfo.DepositDownlimit;
    },
    amountMax() {
      return this.depositInfo.DepositUplimit;
    },
  },
  data() {
    return {
      depositBank: {},
      // depositBankAccount: '',
      transferBank: {},
      datetime: this.$dayjs().format('YYYY-MM-DDTHH:mm:00'),
      method: '',
      currency: 'THB',
      amount: 0,
      receipt: { name: '', image: '' },
      remark: '',
      promotion: '-1',

      depositInfo: {},

      noticeList: [
        // 'transaction.deposit.notice.currency',
        'transaction.deposit.notice.depositLimit01',
        'transaction.deposit.notice.depositLimit02',
        'transaction.deposit.notice.userBear01',
        'transaction.deposit.notice.userBear02',
        'transaction.deposit.notice.suggest',
        'transaction.deposit.notice.contact',
      ],
      isShowDepositNotice: false,
    };
  },
  methods: {
    async getDepositInfo() {
      const result = await apiGetDepositInfo();

      if (result.Code == 200) {
        this.depositInfo = result.RetObj;
        this.$parent.$emit('baseBankInfo', this.depositInfo);
      }
    },
    async submitDeposit() {
      //* BankAccount.length == 0 的時候，會讓使用者自己輸入銀行帳號(this.depositBankAccount)

      //* Add_Request_Currency: 幣別，目前預設為泰幣
      //* Add_Pay_Type: 存款單的付款型態(1客服 2存簿)，BankAccount.length > 0 是存簿，否則為客服

      //* 匯率判斷
      let exchangeRage = 1;
      if (this.currency == 'MMK') {
        exchangeRage = this.depositInfo.hid_MMKtoTHBrate;
      }

      let requestData = {
        rsaData: {
          Add_Company_ServiceKey: this.depositBank.Value.split('||')[2],
          Add_Pay_BankAccount: this.depositBank.BankAccount,
          Add_BankAccountName: this.depositBank.BankAccountName,
          // Add_BankId: this.transferBank.BankId,
          Add_BankId: this.transferBank.Value.split('_')[0],
          Add_MemberBankName: this.transferBank.Value,
          Add_Pay_Date: this.datetime.replace('T', ' '),
          Add_Pay_Money: this.amount,
          Add_Activity: this.promotion,
          Add_Pay_Memo: this.remark,
          Add_SDM_Key: this.method,
          Add_Request_Currency: this.currency,
          Add_Exchange_Rate: exchangeRage,
          Add_Pay_Type: this.depositInfo.BankAccount.length > 0 ? 2 : 1,
        },
        noRsaData: {
          upfile_name: this.receipt.name,
          upfile: this.receipt.image.split(',')[1] || '',
        },
      };

      const result = await apiDeposit(requestData);

      if (result.Code == 200) {
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
    uploadReceipt() {
      this.$refs.receipt.click();
    },
    async onFileChange(event, validate) {
      //* validate: vee-validate 的函式，根據 rules 檢查(這裡是檢查是否為 image)
      const validResult = await validate(event);
      if (!validResult.valid) {
        return;
      }

      const files = event.target.files || event.dataTransfer.files;
      if (!files.length || files.length <= 0) {
        return;
      }
      this.receipt.name = files[0].name;

      //* 將圖片轉成 base64 url
      this.createImage(files[0]);
    },
    createImage(file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.receipt.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    copyBankAccount() {
      if (Object.keys(this.depositBank).length === 0) {
        return;
      }

      //* 只有 input 可以複製
      const copyElement = this.$refs.depositBankAccount;
      copyElement.select();
      copyElement.setSelectionRange(0, 99999);
      document.execCommand('copy');
      copyElement.blur();
    },
  },
  mounted() {
    this.getDepositInfo();
  },
  watch: {
    lang() {
      this.getDepositInfo();
    },
  },
};
