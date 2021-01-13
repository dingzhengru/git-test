<template>
  <ValidationObserver v-slot="{ invalid, handleSubmit }" tag="div">
    <form class="deposit-third-party" novalidate @submit.prevent="handleSubmit(submitDeposit)">
      <div class="theme-content-box">
        <ValidationProvider tag="div" class="deposit-third-party__field theme-input-box" :rules="{ required: true }">
          <span class="deposit-third-party__field__title theme-input-header">
            {{ $t('transaction.deposit.field.payMethod') }}
          </span>
          <select
            class="deposit-third-party__field__select ui-ddl"
            :id="$idMapper.transaction.deposit.field.method"
            v-model="method"
          >
            <option value="">{{ $t(`transaction.deposit.placeholder.method`) }}</option>
            <option :value="item.Value" v-for="item in methodList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
        </ValidationProvider>

        <ValidationProvider tag="div" class="deposit-third-party__field theme-input-box" :rules="{ required: true }">
          <span class="deposit-third-party__field__title theme-input-header">
            {{ $t('transaction.deposit.field.payPlatform') }}
          </span>
          <select
            class="deposit-third-party__field__select ui-ddl"
            :id="$idMapper.transaction.deposit.field.method"
            v-model="method"
          >
            <option value="">{{ $t(`transaction.deposit.placeholder.method`) }}</option>
            <option :value="item.Value" v-for="item in methodList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
        </ValidationProvider>
        <div class="deposit-third-party__field theme-input-box">
          <span class="deposit-third-party__field__title theme-input-header">
            {{ $t('transaction.deposit.field.amount') }}
          </span>
          <ValidationProvider :rules="{ required: true }" v-if="currencyList.length > 0">
            <select
              class="deposit-third-party__field__select ui-ddl"
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
          class="deposit-third-party__field theme-input-box"
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
            class="deposit-third-party__field__hint"
            v-html="
              $t('transaction.deposit.hint.amount', {
                amountLimitMin: depositLimit.min,
                amountLimitMax: depositLimit.max,
              })
            "
          ></p>
        </ValidationProvider>

        <ValidationProvider tag="div" class="deposit-third-party__field theme-input-box">
          <span class="deposit-third-party__field__title theme-input-header">
            {{ $t('transaction.deposit.field.remark') }}
          </span>
          <input class="ui-ipt" :id="$idMapper.transaction.deposit.field.remark" type="text" v-model="remark" />
        </ValidationProvider>

        <ValidationProvider tag="div" class="deposit-third-party__field theme-input-box">
          <span class="deposit-third-party__field__title theme-input-header">
            {{ $t('transaction.deposit.field.promotion') }}
          </span>
          <select
            class="deposit-third-party__field__select ui-ddl"
            :id="$idMapper.transaction.deposit.field.promotion"
            v-model="promotion"
          >
            <option :value="item.Value" v-for="item in promotionList" :key="item.Value">
              {{ item.Text }}
            </option>
          </select>
          <p class="deposit-third-party__field__hint ui-txt-mask" v-if="promotion == -1">
            {{ $t('transaction.deposit.hint.promotion') }}
          </p>
        </ValidationProvider>

        <ol class="ui-ol-memberNotice">
          <li v-for="item in noticeList" :key="item">
            <span v-html="$t(item)"></span>
          </li>
        </ol>
      </div>
      <div class="deposit-third-party__button-div">
        <button class="ui-btn deposit-third-party__button-div--submit" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
        <router-link class="ui-btn deposit-third-party__button-div--cancel" :to="{ name: 'Home' }">
          {{ $t('ui.button.cancel') }}
        </router-link>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
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
      methodList: [],
      currencyList: [],
      promotionList: [],
      depositLimit: { min: 0, max: 0 },
      hid_MMKtoTHBrate: '', //* MMK:THB 匯率(緬甸:泰銖)
      hid_THBtoMMKrate: '', //* THB:MMK 匯率(泰銖:緬甸)
      method: '',
      currency: '',
      amount: 0,
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
    async getDepositInfo() {},
    async submitDeposit() {},
    inputAmount() {
      if (this.amount < this.depositLimit.min) {
        this.amount = this.depositLimit.min;
      } else if (this.amount > this.depositLimit.max) {
        this.amount = this.depositLimit.max;
      }
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

<style lang="scss" scoped>
.deposit-third-party {
  margin-top: 40px;
  &__field {
    margin: 20px 0;

    &__select {
      padding: 0 1.5%;
    }

    &__info {
      margin: 20px 0;

      &__text {
        margin: 0 0 20px;
        font-size: 2.307em;
      }
    }
    &__receipt-upload {
      &__label {
        display: block;
        margin: 0 auto;
      }
      &__input {
        display: none;
      }
    }
    &__hint {
      margin: 10px 0;
      font-size: 2.153em;

      &--receipt-upload {
        text-align: center;
      }
    }
  }

  &__button-div {
    margin: 40px 0;
    text-align: center;

    button {
      margin: 0 10px;
    }
  }
}
</style>
