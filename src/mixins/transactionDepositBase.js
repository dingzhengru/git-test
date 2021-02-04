import { mapGetters } from 'vuex';
import { apiGetDepositInfo, apiDeposit } from '@/api/transaction-deposit';
export default {
  name: 'TransactionDepositBase',
  computed: {
    ...mapGetters(['lang']),
  },
  data() {
    return {
      depositBankList: [],
      transferBankList: [],
      methodList: [],
      currencyList: [],
      promotionList: [],
      depositLimit: { min: 0, max: 0 },
      hid_MMKtoTHBrate: '', //* MMK:THB 匯率(緬甸:泰銖)
      hid_THBtoMMKrate: '', //* THB:MMK 匯率(泰銖:緬甸)
      depositBank: {},
      depositBankAccount: '',
      transferBank: {},
      // transferBankName: '',
      datetime: this.$dayjs().format('YYYY-MM-DDTHH:mm:00'),
      method: '',
      currency: 'THB',
      amount: 0,
      receipt: { name: '', image: '' },
      remark: '',
      promotion: '-1',

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
        if (result.RetObj.BankAccount.length > 0) {
          this.depositBankList = result.RetObj.BankAccount;
        } else {
          this.depositBankList = result.RetObj.BankURL;
        }

        this.transferBankList = result.RetObj.BankURL.map(item => {
          item.BankId = item.Value.split('_')[0];
          return item;
        });
        this.methodList = result.RetObj.DepositMethod;
        this.currencyList = result.RetObj.BaseCurrencyItem;
        this.promotionList = result.RetObj.AllActivityList;
        this.depositLimit.min = result.RetObj.DepositDownlimit;
        this.depositLimit.max = result.RetObj.DepositUplimit;
        this.hid_MMKtoTHBrate = result.RetObj.hid_MMKtoTHBrate;
        this.hid_THBtoMMKrate = result.RetObj.hid_THBtoMMKrate;
      }
    },
    async submitDeposit() {
      //* BankAccoun.length == 0 的時候，會讓使用者自己輸入銀行帳號(this.depositBankAccount)

      //* Add_Request_Currency: 幣別，若幣別列表為空，直接設為空值即可
      //* Add_Pay_Type: 存款單的付款型態(1客服 2存簿)，BankAccoun.length > 0 是存簿，否則為客服

      //* 幣別預設為 THB

      //* 匯率判斷
      let exchangeRage = 1;
      if (this.currency == 'MMK') {
        exchangeRage = this.hid_MMKtoTHBrate;
      }

      let requestData = {
        rsaData: {
          Add_Company_ServiceKey: this.depositBank.Value.split('||')[2] || '',
          Add_Pay_BankAccount: this.depositBank.BankAccount || this.depositBankAccount || '',
          Add_BankAccountName: this.depositBank.BankAccountName || '',
          Add_BankId: this.transferBank.BankId || '',
          Add_MemberBankName: this.transferBank.Value || '',
          Add_Pay_Date: this.datetime.replace('T', ' '),
          Add_Pay_Money: this.amount,
          Add_Activity: this.promotion,
          Add_Pay_Memo: this.remark,
          Add_SDM_Key: this.method,
          Add_Request_Currency: this.currency,
          Add_Exchange_Rate: exchangeRage,
          Add_Pay_Type: this.depositBankList.length > 0 ? 2 : 1,
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
      if (this.amount < this.depositLimit.min) {
        this.amount = this.depositLimit.min;
      } else if (this.amount > this.depositLimit.max) {
        this.amount = this.depositLimit.max;
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
