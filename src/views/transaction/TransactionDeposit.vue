<template>
  <form class="deposit" @submit.prevent="submitDeposit">
    <div class="deposit__main theme-content-box">
      <h3 class="theme-h3-boxTitle deposit__main__title">Fill in Cash Voucher</h3>
      <div class="theme-input-box deposit__main__select">
        <span class="theme-input-header deposit__main__select__header">Select Desposit Bank</span>
        <select class="ui-ddl" v-model="bankDesposit">
          <option :value="{}" selected>Select Desposit Bank</option>
          <option :value="bank" v-for="bank in bankDespositList" :key="bank.value">
            {{ bank.name }}
          </option>
        </select>

        <div class="theme-input-box deposit__main__info">
          <template v-for="(value, key, index) in bankDesposit">
            <span class="theme-input-header deposit__main__info__header" :key="index" v-if="key != 'value'">{{
              key
            }}</span>
            <p class="deposit__main__info__text" id="txt_BankName" :key="index" v-if="key != 'value'">{{ value }}</p>
          </template>
        </div>
        <div class="theme-input-box deposit__main__select">
          <span class="theme-input-header">Bank Transfer</span>
          <select class="ui-ddl ddl-transferBank" v-model="bankTransfer">
            <option :value="{}" selected>please choose your payment bank.</option>
            <option :value="bank" v-for="bank in bankTransferList" :key="bank.value">
              {{ bank.name }}
            </option>
          </select>
        </div>
        <div class="theme-input-box deposit__main__select">
          <span class="theme-input-header">Deposit Time</span>
          <input
            class="ui-ipt ui-ipt-date ipt-deposit-date"
            id="Date_Add_Pay_Method02"
            type="datetime-local"
            v-model="datetime"
          />
          <!-- <select class="ui-ddl ddl-hour" v-model="hour">
            <option value="" selected>Hour</option>
            <option :value="h" v-for="h in 24" :key="h">{{ h >= 10 ? h : '0' + h }}</option>
          </select>
          <select class="ui-ddl ddl-minute" v-model="minute">
            <option value="" selected>Minute</option>
            <option :value="m" v-for="m in 60" :key="m">{{ m >= 10 ? m : '0' + m }}</option>
          </select> -->

          <div class="theme-input-box deposit__main__select">
            <span class="theme-input-header">Deposit Method</span>
            <select class="ui-ddl ddl-payType" id="Add_SDM_Key_Method02" v-model="method">
              <option :value="{}">Please select</option>
              <option :value="method" v-for="methodItem in methodList" :key="methodItem.value">
                {{ methodItem.name }}
              </option>
            </select>
          </div>
          <div class="theme-input-box deposit__main__select">
            <span class="theme-input-header">Deposit Amount</span>
            <input class="ui-ipt ipt-deposit" id="Add_Pay_Money_Method02" type="number" step="0.01" v-model="amount" />
            <p class="txt-notice">
              Baht Maximum 100000.00 , Minimum 200.00 <br />
              Note: Please enter a whole number, when you are making a deposit Ex.1,001.00 in order to avoid an
              unsuccessful deposit. <br />
            </p>
          </div>

          <div class="deposit__main__select deposit__main__select--receipt-upload theme-input-box">
            <span class="theme-input-header">Remittance Receipt</span>
            <label class="deposit__receipt-upload__label ui-btn01 ui-btn-long" for="deposit__receipt-upload__input">
              Upload
              <input
                class="deposit__receipt-upload__input "
                id="deposit__receipt-upload__input"
                type="file"
                accept="image/*"
                @change="onFileChange"
              />
            </label>

            <p class="txt-UploadName" id="UploadReceiptName">{{ receipt.name }}</p>
            <input type="file" name="upfile" id="UploadReceipt" accept=".png, .jpg" style="visibility:hidden" />
            <p class="txt-notice">
              <br />
              <span class="lay-txt-mask">The Format of Image Allow Only JPG / PNG</span>
              <br />
              <span class="lay-txt-mask">File size cannot exceed 2MB</span>
            </p>
          </div>

          <div class="theme-input-box deposit__main__select">
            <span class="theme-input-header">Remark</span>
            <input class="ui-ipt ipt-deposit" name="Add_Pay_Memo_Method02" type="text" id="Add_Pay_Memo_Method02" />
          </div>
          <div class="theme-input-box deposit__main__select">
            <span class="theme-input-header">Favorable Project on Payment</span>
            <select class="ui-ddl ddl-promType" id="Add_Activity_Method02" v-model="promotion">
              <option :value="{}">Please select</option>
              <option :value="promotion" v-for="promotionItem in promotionList" :key="promotionItem.value">
                {{ promotionItem.name }}
              </option>
            </select>
            <p class="txt-notice txt-notice-ps">Note: Non-selection regarded as abdication.</p>
          </div>
          <ol class="ui-ol-memberNotice">
            <li>only for Bahttransaction.</li>
            <li>Please note that the lowest and higest limiation on Deposit.</li>
            <li>The minimum and maximum values listed above are to act as a guideline only.</li>
            <li>
              Please conduct deposit according to the deposit method as above, otherwise members shall bear any
              additional expense by themselves.
            </li>
            <li>Members shall bear any additional expense resulted from any failure transfer or drawback occurred.</li>
            <li>
              It can accelerate the review procedure in case of deposit of non-integer amount.(eg. deposit amout of
              123).
            </li>
            <li>
              If you have any additional questions about your Withdrawal details ,please contact our online service.
            </li>
          </ol>
        </div>
      </div>
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
      bankDespositList: [
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
      bankDesposit: {},
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
      bankTransfer: {},
      datetime: '2018-06-12T19:30',
      date: '2020-07-15',
      hour: '',
      minute: '',
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
      method: {},
      amount: '',
      receipt: {
        name: '',
        image: '',
      },
      remark: '',
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
      promotion: {},
    };
  },
  methods: {
    submitDeposit() {
      console.log('submitDeposit');
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

.deposit__main {
  margin-bottom: 20px;
}
.deposit__main__select {
  margin: 20px 0;
}
.deposit__main__info {
  margin: 20px 0;
}
.deposit__main__info__text {
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

.li-paytype {
  padding: 20px 0;
  font-size: 2.461em;
  text-align: center;
}
.li-paytype:last-child {
  border-bottom: none;
}
.lnk-paytype {
  display: block;
  width: 408px;
  height: 136px;
  background: no-repeat;
  margin: 0 auto 10px;
}

.li-bank {
  padding: 20px 0;
  font-size: 2.461em;
  text-align: center;
}
.li-bank:last-child {
  border-bottom: none;
}
.lnk-bank {
  display: block;
  width: 588px;
  height: 137px;
  background: no-repeat;
  margin: 0 auto 10px;
}

.theme-input-box > .ddl-hour,
.theme-input-box > .ddl-minute {
  min-width: auto;
  width: 310px;
  margin-top: 20px;
  margin-right: 14px;
}
.theme-input-box > .ddl-minute {
  margin-right: 0;
}
.txt-notice,
.txt-UploadName {
  margin: 10px 0;
  font-size: 2.153em;
}
.txt-deposit21-paytype {
  margin: 0 0 20px;
  font-size: 2.307em;
}
.txt-UploadName {
  text-align: center;
}
</style>
