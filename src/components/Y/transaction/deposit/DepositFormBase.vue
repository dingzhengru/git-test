<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }" tag="div">
    <form class="deposit-form" novalidate @submit.prevent="handleSubmit(submitDeposit)">
      <div class="theme-content-box">
        <h3 class="deposit-form__title theme-h3-boxTitle">{{ $t('transaction.deposit.title') }}</h3>

        <ValidationProvider
          tag="div"
          class="deposit-form__field theme-input-box"
          :rules="{ required: JSON.stringify(depositBankList) === JSON.stringify(transferBankList) }"
          v-if="JSON.stringify(depositBankList) === JSON.stringify(transferBankList)"
        >
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.bankDepositAccount') }}
          </span>
          <input class="ui-ipt" type="text" v-model="depositBankAccount" />
        </ValidationProvider>

        <ValidationProvider
          tag="div"
          class="deposit-form__field theme-input-box"
          :rules="{ 'object-not-empty': true }"
          v-else
        >
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.depositBank') }}
          </span>
          <select
            class="deposit-form__field__select ui-ddl"
            :id="$idMapper.transaction.deposit.field.depositBank"
            v-model="depositBank"
          >
            <option :value="{}" selected>{{ $t(`transaction.deposit.placeholder.depositBank`) }}</option>
            <option :value="item" v-for="item in depositBankList" :key="item.value">
              {{ item.Text }}
            </option>
          </select>

          <div v-if="depositBank && Object.keys(depositBank).length > 0">
            <span class="deposit-form__field__info__header theme-input-header">
              {{ $t('transaction.deposit.field.bankName') }}
            </span>
            <p class="deposit-form__field__info__text">{{ depositBank.BankName }}</p>
            <span class="deposit-form__field__info__header theme-input-header">
              {{ $t('transaction.deposit.field.bankBranchName') }}
            </span>
            <p class="deposit-form__field__info__text">{{ depositBank.BankBranchName }}</p>
            <span class="deposit-form__field__info__header theme-input-header">
              {{ $t('transaction.deposit.field.bankAccountName') }}
            </span>
            <p class="deposit-form__field__info__text">{{ depositBank.BankAccountName }}</p>
            <span class="deposit-form__field__info__header theme-input-header">
              {{ $t('transaction.deposit.field.bankAccount') }}
            </span>
            <p class="deposit-form__field__info__text">{{ depositBank.BankAccount }}</p>
          </div>
        </ValidationProvider>

        <ValidationProvider tag="div" class="deposit-form__field theme-input-box" :rules="{ 'object-not-empty': true }">
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.transferBank') }}
          </span>
          <select
            class="deposit-form__field__select ui-ddl"
            :id="$idMapper.transaction.deposit.field.transferBank"
            v-model="transferBank"
          >
            <option :value="{}" selected>{{ $t('transaction.deposit.placeholder.transferBank') }}</option>
            <option :value="item" v-for="item in transferBankList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
        </ValidationProvider>

        <ValidationProvider
          tag="div"
          class="deposit-form__field theme-input-box"
          :rules="{ required: true, 'date-max': $dayjs().format('YYYY-MM-DDTHH:mm') }"
        >
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.datetime') }}
          </span>
          <input
            required
            class="ui-ipt"
            type="datetime-local"
            v-model="datetime"
            :max="$dayjs().format('YYYY-MM-DDTHH:mm')"
          />
        </ValidationProvider>

        <ValidationProvider tag="div" class="deposit-form__field theme-input-box" :rules="{ required: true }">
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.method') }}
          </span>
          <select
            class="deposit-form__field__select ui-ddl"
            :id="$idMapper.transaction.deposit.field.method"
            v-model="method"
          >
            <option value="">{{ $t(`transaction.deposit.placeholder.method`) }}</option>
            <option :value="item.Value" v-for="item in methodList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
        </ValidationProvider>

        <div class="deposit-form__field theme-input-box">
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.amount') }}
          </span>
          <ValidationProvider :rules="{ required: true }" v-if="currencyList.length > 0">
            <select
              class="deposit-form__field__select ui-ddl"
              :id="$idMapper.transaction.deposit.field.currency"
              v-model="currency"
            >
              <option value="">{{ $t(`transaction.deposit.placeholder.currency`) }}</option>
              <option :value="item.Value" v-for="item in currencyList" :key="item.Value">
                {{ item.Text }}
              </option>
            </select>
          </ValidationProvider>
        </div>

        <ValidationProvider
          tag="div"
          class="deposit-form__field theme-input-box"
          :rules="{ required: true, min_value: depositLimit.min, max_value: depositLimit.max }"
        >
          <input
            class="ui-ipt"
            :id="$idMapper.transaction.deposit.field.amount"
            type="number"
            step="100"
            v-model.number="amount"
            @change="inputAmount"
          />
          <p
            class="deposit-form__field__hint"
            v-html="
              $t('transaction.deposit.hint.amount', {
                amountLimitMin: depositLimit.min,
                amountLimitMax: depositLimit.max,
              })
            "
          ></p>
        </ValidationProvider>

        <ValidationProvider
          tag="div"
          class="deposit-form__field theme-input-box"
          :rules="{ image: true }"
          v-slot="{ validate }"
        >
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.receipt') }}
          </span>
          <label
            class="deposit-form__field__receipt-upload__label ui-btn ui-btn--long"
            :for="$idMapper.transaction.deposit.button.upload"
          >
            {{ $t('transaction.deposit.button.upload') }}
            <input
              class="deposit-form__field__receipt-upload__input"
              :id="$idMapper.transaction.deposit.button.upload"
              type="file"
              accept=".jpg,.png"
              @change="onFileChange($event, validate)"
            />
          </label>
          <p class="deposit-form__field__hint deposit-form__field__hint--receipt-upload">{{ receipt.name }}</p>
          <p class="deposit-form__field__hint" v-html="$t('transaction.deposit.hint.receipt')"></p>
        </ValidationProvider>

        <ValidationProvider tag="div" class="deposit-form__field theme-input-box">
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.remark') }}
          </span>
          <input class="ui-ipt" :id="$idMapper.transaction.deposit.field.remark" type="text" v-model="remark" />
        </ValidationProvider>

        <ValidationProvider tag="div" class="deposit-form__field theme-input-box">
          <span class="deposit-form__field__title theme-input-header">
            {{ $t('transaction.deposit.field.promotion') }}
          </span>
          <select
            class="deposit-form__field__select ui-ddl"
            :id="$idMapper.transaction.deposit.field.promotion"
            v-model="promotion"
          >
            <option :value="item.Value" v-for="item in promotionList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
          <p class="deposit-form__field__hint ui-txt-mask" v-if="promotion == -1">
            {{ $t('transaction.deposit.hint.promotion') }}
          </p>
        </ValidationProvider>

        <ol class="ui-ol-memberNotice">
          <li v-for="item in noticeList" :key="item">
            <span v-html="$t(item)"></span>
          </li>
        </ol>
      </div>
      <div class="deposit-form__button-div">
        <button class="ui-btn deposit-form__button-div--submit" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
        <router-link class="ui-btn deposit-form__button-div--cancel" :to="{ name: 'Home' }">
          {{ $t('ui.button.cancel') }}
        </router-link>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import { apiGetDepositInfo, apiDeposit } from '@/api/transaction-deposit';
export default {
  name: 'DepositFormBase',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
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
      currency: '',
      amount: 0,
      receipt: { name: '', image: '' },
      remark: '',
      promotion: '-1',

      noticeList: [
        'transaction.deposit.notice.currency',
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
        this.$router.push({ name: 'TransactionRecordContent', params: { name: 'deposit' } });
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
</script>
