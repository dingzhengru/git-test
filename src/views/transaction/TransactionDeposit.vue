<template>
  <form class="deposit" @submit.prevent="submitDeposit">
    <div class="deposit__main theme-content-box">
      <h3 class="deposit__main__title theme-h3-boxTitle">Fill in Cash Voucher</h3>

      <div class="deposit__main__field theme-input-box" v-for="field in fieldList" :key="field.name">
        <span class="deposit__main__field__title theme-input-header">{{ field.title }}</span>

        <template v-if="field.name == 'bankDeposit'">
          <select class="deposit__main__field__select ui-ddl" v-model="bankDeposit">
            <option :value="{}" selected>Select Deposit Bank</option>
            <option :value="bank" v-for="bank in bankDepositList" :key="bank.value">
              {{ bank.name }}
            </option>
          </select>
          <template v-for="(value, key) in bankDeposit">
            <span class="deposit__main__field__info__header theme-input-header" :key="key" v-if="key != 'value'">
              {{ key }}
            </span>
            <p class="deposit__main__field__info__text" :key="value" v-if="key != 'value'">{{ value }}</p>
          </template>
        </template>

        <template v-if="field.name == 'bankTransfer'">
          <select class="deposit__main__field__select ui-ddl" v-model="bankDeposit">
            <option :value="{}" selected>Select Deposit Bank</option>
            <option :value="bank" v-for="bank in bankDepositList" :key="bank.value">
              {{ bank.name }}
            </option>
          </select>
        </template>

        <template v-if="field.name == 'datetime'">
          <input class="ui-ipt" type="datetime-local" v-model="datetime" />
        </template>

        <template v-if="field.name == 'method'">
          <select class="deposit__main__field__select ui-ddl" v-model="method">
            <option :value="{}">Please select</option>
            <option :value="method" v-for="methodItem in methodList" :key="methodItem.value">
              {{ methodItem.name }}
            </option>
          </select>
        </template>

        <template v-if="field.name == 'amount'">
          <input class="ui-ipt" type="number" step="0.01" v-model="amount" />
        </template>

        <template v-if="field.name == 'receipt'">
          <label class="deposit__receipt-upload__label ui-btn01 ui-btn-long" for="deposit__receipt-upload__input">
            Upload
            <input
              class="deposit__receipt-upload__input"
              id="deposit__receipt-upload__input"
              type="file"
              accept=".jpg,.png"
              @change="onFileChange"
            />
          </label>
          <p class="deposit__main__field__notice deposit__main__field__notice--receipt-upload">
            {{ receipt.name }}
          </p>
        </template>

        <template v-if="field.name == 'remark'">
          <input class="ui-ipt" type="text" v-model="remark" />
        </template>

        <template v-if="field.name == 'promotion'">
          <select class="deposit__main__field__select ui-ddl" v-model="promotion">
            <option :value="{}">Please select</option>
            <option :value="promotion" v-for="promotionItem in promotionList" :key="promotionItem.value">
              {{ promotionItem.name }}
            </option>
          </select>
        </template>

        <p class="deposit__main__field__notice" v-html="field.notice"></p>
      </div>

      <ol class="ui-ol-memberNotice">
        <li v-for="(notice, index) in memberNoticeList" :key="`memberNotice${index}`">
          {{ notice }}
        </li>
      </ol>
    </div>
    <div class="deposit__button-div">
      <button class="ui-btn deposit__button-div--submit" type="submit">Submit</button>
      <router-link class="ui-btn deposit__button-div--cancel" :to="{ name: 'Home' }">Cancellation</router-link>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TransactionDeposit',
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss']),
  },
  data() {
    return {
      fieldList: [
        {
          name: 'bankDeposit',
          title: 'Select Deposit Bank',
          notice: ``,
        },
        {
          name: 'bankTransfer',
          title: 'Bank Transfer',
          notice: ``,
        },
        {
          name: 'datetime',
          title: 'Deposit Time',
          notice: ``,
        },
        {
          name: 'method',
          title: 'Deposit Method',
          notice: ``,
        },
        {
          name: 'amount',
          title: 'Deposit Amount',
          notice: `Baht Maximum 100000.00 , Minimum 200.00 <br />
          Note: Please enter a whole number, when you are making a deposit Ex.1,001.00 in order to avoid an unsuccessful
          deposit. <br />`,
        },
        {
          name: 'receipt',
          title: 'Remittance Receipt',
          notice: `<br />
          <span class="lay-txt-mask">The Format of Image Allow Only JPG / PNG</span>
          <br />
          <span class="lay-txt-mask">File size cannot exceed 2MB</span>`,
        },
        {
          name: 'remark',
          title: 'Remark',
          notice: ``,
        },
        {
          name: 'promotion',
          title: 'Favorable Project on Payment',
          notice: `Note: Non-selection regarded as abdication.`,
        },
      ],
      bankDepositList: [
        {
          name: 'bank01',
          branch: 'bank branch 01',
          accountName: 'account name 01',
          accountNumber: 'account number 01',
          value: 'value 01',
        },
        {
          name: 'bank02',
          branch: 'bank branch 02',
          accountName: 'account name 02',
          accountNumber: 'account number 02',
          value: 'value 02',
        },
      ],
      bankTransferList: [
        {
          name: 'bank01',
          value: 'value 01',
        },
        {
          name: 'bank02',
          value: 'value 02',
        },
      ],
      methodList: [
        {
          name: 'WebATM',
          value: '15',
        },
        {
          name: 'CDM cash',
          value: '16',
        },
        {
          name: 'ATM',
          value: '17',
        },
        {
          name: 'WebATM',
          value: '18',
        },
        {
          name: 'Bank Counter Transfer',
          value: '19',
        },
      ],
      promotionList: [
        {
          name: 'promotion name 01',
          value: 'promotion value 01',
        },
        {
          name: 'promotion name 02',
          value: 'promotion value 02',
        },
      ],
      memberNoticeList: [
        `only for Baht transaction.`,
        `Please note that the lowest and higest limiation on Deposit.`,
        `The minimum and maximum values listed above are to act as a guideline only.`,
        `Please conduct deposit according to the deposit method as above, otherwise members shall bear any additional expense by themselves.`,
        `Members shall bear any additional expense resulted from any failure transfer or drawback occurred.`,
        `It can accelerate the review procedure in case of deposit of non-integer amount.(eg. deposit amout of 123).`,
        `If you have any additional questions about your Withdrawal details ,please contact our online service.`,
      ],
      bankDeposit: {},
      bankTransfer: {},
      datetime: '2018-06-12T19:30',
      method: {},
      amount: '',
      receipt: {
        name: '',
        image: '',
      },
      remark: '',
      promotion: {},
    };
  },
  methods: {
    submitDeposit() {
      console.log('submitDeposit');
      console.log(`
        bankDeposit: ${this.bankDeposit}
        bankTransfer: ${this.bankTransfer}
        datetime: ${this.datetime}
        method: ${this.method}
        amount: ${this.amount}
        receipt: ${this.receipt}
        remark: ${this.remark}
        promotion: ${this.promotion}
      `);
    },
    onFileChange(event) {
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
        console.log(e.target.result);
      };
      reader.readAsDataURL(file);
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/transaction/deposit.scss`);
      },
    },
  },
};
</script>

<style scoped>
.deposit {
  margin-top: 40px;
}

.deposit__main__field {
  margin: 20px 0;
}

.deposit__main__field__select {
  padding: 0 1.5%;
}

.deposit__main__field__info {
  margin: 20px 0;
}
.deposit__main__field__info__text {
  margin: 0 0 20px;
  font-size: 2.307em;
}

.deposit__button-div {
  margin: 40px 0;
  text-align: center;
}

.deposit__button-div--submit,
.deposit__button-div--cancel {
  margin: 0 10px;
}

.deposit__receipt-upload__label {
  display: block;
  margin: 0 auto;
}

.deposit__receipt-upload__input {
  display: none;
}

.deposit__main__field__notice {
  margin: 10px 0;
  font-size: 2.153em;
}
.deposit__main__field__notice--receipt-upload {
  text-align: center;
}

/* .theme-input-box > .ddl-hour,
.theme-input-box > .ddl-minute {
  min-width: auto;
  width: 310px;
  margin-top: 20px;
  margin-right: 14px;
}
.theme-input-box > .ddl-minute {
  margin-right: 0;
} */
</style>
