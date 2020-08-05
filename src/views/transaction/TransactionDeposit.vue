<template>
  <form class="deposit" @submit.prevent="submitDeposit">
    <div class="deposit__main theme-content-box">
      <h3 class="deposit__main__title theme-h3-boxTitle">{{ $t('transaction.deposit.title') }}</h3>

      <div class="deposit__main__field theme-input-box" v-for="field in fieldList" :key="field.name">
        <span class="deposit__main__field__title theme-input-header">{{ $t(field.title) }}</span>

        <template v-if="field.name == 'bankDeposit'">
          <select class="deposit__main__field__select ui-ddl" v-model="bankDeposit">
            <option :value="{}" selected>{{ $t(field.placeholder) }}</option>
            <option :value="bank" v-for="bank in bankDepositList" :key="bank.value">
              {{ bank.bank }}
            </option>
          </select>
          <template v-for="(value, key) in bankDeposit">
            <span class="deposit__main__field__info__header theme-input-header" :key="key" v-if="key != 'value'">
              {{ $t(`transaction.deposit.field.${key}`) }}
            </span>
            <p class="deposit__main__field__info__text" :key="value" v-if="key != 'value'">
              {{ value }}
            </p>
          </template>
        </template>

        <template v-if="field.name == 'bankTransfer'">
          <select class="deposit__main__field__select ui-ddl" v-model="bankTransfer">
            <option :value="{}" selected>{{ $t(field.placeholder) }}</option>
            <option :value="bank" v-for="bank in bankTransferList" :key="bank.value">
              {{ bank.name }}
            </option>
          </select>
        </template>

        <template v-if="field.name == 'datetime'">
          <input class="ui-ipt" type="datetime-local" v-model="datetime" />
        </template>

        <template v-if="field.name == 'method'">
          <select class="deposit__main__field__select ui-ddl" v-model="method">
            <option :value="{}">{{ $t(field.placeholder) }}</option>
            <option :value="method" v-for="methodItem in methodList" :key="methodItem.value">
              {{ methodItem.name }}
            </option>
          </select>
        </template>

        <template v-if="field.name == 'amount'">
          <input class="ui-ipt" type="number" step="0.01" v-model="amount" />
        </template>

        <template v-if="field.name == 'receipt'">
          <label class="deposit__receipt-upload__label ui-btn ui-btn-long" for="deposit__receipt-upload__input">
            {{ $t('transaction.deposit.button.upload') }}
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
            <option :value="{}">{{ $t(field.placeholder) }}</option>
            <option :value="promotion" v-for="promotionItem in promotionList" :key="promotionItem.value">
              {{ promotionItem.name }}
            </option>
          </select>
        </template>

        <p class="deposit__main__field__notice" v-html="$t(field.hint)"></p>
      </div>

      <ol class="ui-ol-memberNotice">
        <li v-for="(notice, index) in noticeList" :key="`memberNotice${index}`">
          <span v-html="$t(notice)"></span>
        </li>
      </ol>
    </div>
    <div class="deposit__button-div">
      <button class="ui-btn deposit__button-div--submit" type="submit">
        {{ $t('ui.button.submit') }}
      </button>
      <router-link class="ui-btn deposit__button-div--cancel" :to="{ name: 'Home' }">
        {{ $t('ui.button.cancel') }}
      </router-link>
    </div>
  </form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'TransactionDeposit',
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      fieldList: [
        {
          name: 'bankDeposit',
          title: 'transaction.deposit.field.selectDepositBank',
          placeholder: 'transaction.deposit.placeholder.depositBank',
          hint: '',
        },
        {
          name: 'bankTransfer',
          title: 'transaction.deposit.field.selectTransferBank',
          placeholder: 'transaction.deposit.placeholder.transferBank',
          hint: '',
        },
        {
          name: 'datetime',
          title: 'transaction.deposit.field.datetime',
          hint: '',
        },
        {
          name: 'method',
          title: 'transaction.deposit.field.method',
          placeholder: 'transaction.deposit.placeholder.method',
          hint: '',
        },
        {
          name: 'amount',
          title: 'transaction.deposit.field.amount',
          hint: 'transaction.deposit.hint.amount',
        },
        {
          name: 'receipt',
          title: 'transaction.deposit.field.receipt',
          hint: 'transaction.deposit.hint.receipt',
        },
        {
          name: 'remark',
          title: 'transaction.deposit.field.remark',
          hint: '',
        },
        {
          name: 'promotion',
          title: 'transaction.deposit.field.promotion',
          placeholder: 'transaction.deposit.placeholder.promotion',
          hint: 'transaction.deposit.hint.promotion',
        },
      ],
      bankDepositList: [
        {
          bank: 'bank01',
          bankBranch: 'bank branch 01',
          bankAccountName: 'account name 01',
          bankAccount: 'account number 01',
          value: 'value 01',
        },
        {
          bank: 'bank02',
          bankBranch: 'bank branch 02',
          bankAccountName: 'account name 02',
          bankAccount: 'account number 02',
          value: 'value 02',
        },
      ],
      bankTransferList: [
        {
          name: 'Transfer Bank01',
          value: 'value 01',
        },
        {
          name: 'Transfer Bank02',
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
      noticeList: [
        'transaction.deposit.notice.currency',
        'transaction.deposit.notice.depositLimit01',
        'transaction.deposit.notice.depositLimit02',
        'transaction.deposit.notice.userBear01',
        'transaction.deposit.notice.userBear02',
        'transaction.deposit.notice.suggest',
        'transaction.deposit.notice.contact',
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
