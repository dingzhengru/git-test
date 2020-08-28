<template>
  <div>
    <form class="deposit" @submit.prevent="submitDeposit">
      <div class="theme-content-box">
        <h3 class="deposit__title theme-h3-boxTitle">{{ $t('transaction.deposit.title') }}</h3>

        <div class="deposit__field theme-input-box" v-for="field in fieldList" :key="field.name">
          <span
            class="deposit__field__title theme-input-header"
            v-if="
              field.name != 'bankDepositAccount' ||
                (field.name == 'bankDepositAccount' &&
                  JSON.stringify(bankDepositList) === JSON.stringify(bankTransferList))
            "
          >
            {{ $t(`transaction.deposit.field.${field.name}`) }}
          </span>

          <template v-if="field.name == 'bankDeposit'">
            <select
              class="deposit__field__select ui-ddl"
              :id="idMapper.transaction.deposit.field[field.name]"
              v-model="bankDeposit"
            >
              <option :value="{}" selected>{{ $t(`transaction.deposit.placeholder.${field.name}`) }}</option>
              <option :value="bank" v-for="bank in bankDepositList" :key="bank.value">
                {{ bank.Text }}
              </option>
            </select>
            <template v-for="(value, key) in bankDeposit">
              <div
                v-if="key == 'BankName' || key == 'BankBranchName' || key == 'BankAccountName' || key == 'BankAccount'"
                :key="key"
              >
                <span class="deposit__field__info__header theme-input-header">
                  {{ $t(`transaction.deposit.field.${key}`) }}
                </span>
                <p class="deposit__field__info__text">
                  {{ value }}
                </p>
              </div>
            </template>
          </template>

          <template
            v-if="
              field.name == 'bankDepositAccount' && JSON.stringify(bankDepositList) === JSON.stringify(bankTransferList)
            "
          >
            <input
              class="ui-ipt"
              :id="idMapper.transaction.deposit.field[field.name]"
              type="text"
              v-model="bankDepositAccount"
            />
          </template>

          <template v-if="field.name == 'bankTransfer'">
            <select
              class="deposit__field__select ui-ddl"
              :id="idMapper.transaction.deposit.field[field.name]"
              v-model="bankTransfer"
            >
              <option :value="{}" selected>{{ $t(`transaction.deposit.placeholder.${field.name}`) }}</option>
              <option :value="bank" v-for="bank in bankTransferList" :key="bank.Value">
                {{ bank.Text }}
              </option>
            </select>
          </template>

          <template v-if="field.name == 'datetime'">
            <input required class="ui-ipt" type="datetime-local" v-model="datetime" />
          </template>

          <template v-if="field.name == 'method'">
            <select
              class="deposit__field__select ui-ddl"
              :id="idMapper.transaction.deposit.field[field.name]"
              required
              v-model="method"
            >
              <option :value="{}">{{ $t(`transaction.deposit.placeholder.${field.name}`) }}</option>
              <option :value="methodItem" v-for="methodItem in methodList" :key="methodItem.Value">
                {{ methodItem.Text }}
              </option>
            </select>
          </template>

          <template v-if="field.name == 'amount'">
            <input
              class="ui-ipt"
              :id="idMapper.transaction.deposit.field[field.name]"
              type="number"
              required
              :min="depositLimit.min"
              :max="depositLimit.max"
              step="100"
              v-model.number="amount"
              @input="inputAmount"
            />
          </template>

          <template v-if="field.name == 'receipt'">
            <label
              class="deposit__receipt-upload__label ui-btn ui-btn-long"
              :for="idMapper.transaction.deposit.button.upload"
            >
              {{ $t('transaction.deposit.button.upload') }}
              <input
                class="deposit__receipt-upload__input"
                :id="idMapper.transaction.deposit.button.upload"
                type="file"
                accept=".jpg,.png"
                @change="onFileChange"
              />
            </label>
            <p class="deposit__field__notice deposit__field__notice--receipt-upload">
              {{ receipt.name }}
            </p>
          </template>

          <template v-if="field.name == 'remark'">
            <input class="ui-ipt" :id="idMapper.transaction.deposit.field[field.name]" type="text" v-model="remark" />
          </template>

          <template v-if="field.name == 'promotion'">
            <select
              class="deposit__field__select ui-ddl"
              :id="idMapper.transaction.deposit.field[field.name]"
              v-model="promotion"
            >
              <!-- <option :value="{}">{{ $t(`transaction.deposit.placeholder.${field.name}`) }}</option> -->
              <option :value="promotionItem.Value" v-for="promotionItem in promotionList" :key="promotionItem.Value">
                {{ promotionItem.Text }}
              </option>
            </select>
          </template>

          <p
            class="deposit__field__notice"
            v-html="$t(`transaction.deposit.hint.${field.name}`)"
            v-if="promotion == -1"
          ></p>
        </div>

        <ol class="ui-ol-memberNotice">
          <li v-for="(notice, index) in noticeList" :key="`memberNotice${index}`">
            <span v-html="$t(`transaction.deposit.notice.${notice}`)"></span>
          </li>
        </ol>
      </div>
      <div class="deposit__button-div">
        <button class="ui-btn deposit__button-div--submit" type="submit" :disabled="!validateForm()">
          {{ $t('ui.button.submit') }}
        </button>
        <router-link class="ui-btn deposit__button-div--cancel" :to="{ name: 'Home' }">
          {{ $t('ui.button.cancel') }}
        </router-link>
      </div>
    </form>
    <DepositDialog v-if="isShowDepositDialog" @close="isShowDepositDialog = false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import idMapper from '@/idMapper';
import { getDepositInfo } from '@/api/transaction-deposit';

export default {
  name: 'TransactionDeposit',
  components: {
    DepositDialog: () => import('@/components/transaction/deposit/DepositDialog'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss']),
  },
  data() {
    return {
      idMapper: idMapper,
      fieldList: [
        {
          name: 'bankDeposit',
        },
        {
          name: 'bankDepositAccount',
        },
        {
          name: 'bankTransfer',
        },
        {
          name: 'datetime',
        },
        {
          name: 'method',
        },
        {
          name: 'amount',
        },
        {
          name: 'receipt',
        },
        {
          name: 'remark',
        },
        {
          name: 'promotion',
        },
      ],
      bankDepositList: [],
      bankTransferList: [],
      methodList: [],
      promotionList: [],
      noticeList: ['currency', 'depositLimit01', 'depositLimit02', 'userBear01', 'userBear02', 'suggest', 'contact'],
      bankDeposit: {},
      bankTransfer: {},
      datetime: '2018-06-12T19:30',
      method: {},
      amount: 0,
      receipt: { name: '', image: '' },
      remark: '',
      promotion: '-1',
      bankDepositAccount: '', //* 當存款銀行列表為空時，則要填入此欄位
      depositLimit: { min: 100, max: 100000 },
      isShowDepositDialog: true,
    };
  },
  methods: {
    submitDeposit() {
      if (!this.validateForm()) {
        return;
      }
      console.log('[SubmitDeposit]', this.bankDeposit, this.bankTransfer);

      if (JSON.stringify(this.bankDepositList) === JSON.stringify(this.bankTransferList)) {
        //* 代表回傳的 bankDepositList 是空的，需使用者自行輸入銀行帳戶
        console.log('使用者自行輸入銀行帳戶', this.bankDepositAccount);
      }
    },
    inputAmount() {
      if (this.amount < this.depositLimit.min) {
        this.amount = this.depositLimit.min;
      } else if (this.amount > this.depositLimit.max) {
        this.amount = this.depositLimit.max;
      }
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
    validateForm() {
      if (Object.keys(this.bankDeposit).length === 0) {
        return false;
      } else if (Object.keys(this.bankTransfer).length === 0) {
        return false;
      } else if (this.datetime == '') {
        return false;
      } else if (Object.keys(this.method).length === 0) {
        return false;
      } else if (this.amount < this.depositLimit.min || this.amount > this.depositLimit.max) {
        return false;
      }

      return true;
    },
  },
  watch: {
    siteID: {
      immediate: true,
      async handler() {
        if (!this.siteID) {
          return;
        }
        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/transaction/deposit.scss`);

        //* 取得存款資訊
        const result = await getDepositInfo();
        console.log('[DepositInfo]', result.RetObj);

        //* 250_23223223323299||2||250||SCB||23223223323299||test1111||test1111||SICOTHBK

        if (result.RetObj.BankAccount.length > 0) {
          this.bankDepositList = result.RetObj.BankAccount;
        } else {
          this.bankDepositList = result.RetObj.BankURL;
        }

        this.bankTransferList = result.RetObj.BankURL;
        this.methodList = result.RetObj.DepositMethod;
        this.promotionList = result.RetObj.AllActivityList;
        this.depositLimit.min = result.RetObj.DepositDownlimit;
        this.depositLimit.max = result.RetObj.DepositUplimit;

        //* 關掉 loading
        this.$store.commit('setIsLoading', false);
      },
    },
  },
};
</script>

<style scoped>
.deposit {
  margin-top: 40px;
}

.deposit__field {
  margin: 20px 0;
}

.deposit__field__select {
  padding: 0 1.5%;
}

.deposit__field__info {
  margin: 20px 0;
}
.deposit__field__info__text {
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

.deposit__field__notice {
  margin: 10px 0;
  font-size: 2.153em;
}
.deposit__field__notice--receipt-upload {
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
