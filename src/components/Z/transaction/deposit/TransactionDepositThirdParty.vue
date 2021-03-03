<template>
  <ValidationObserver class="deposit-third-party" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="deposit-third-party-form" @submit.prevent="handleSubmit(submitDeposit)" @reset.prevent="reset">
      <ValidationProvider
        class="deposit-third-party__field--btn deposit-third-party__field--method"
        tag="div"
        :rules="{ required: true }"
      >
        <div class="deposit-third-party__field--btn__title">支付方式</div>
        <div class="deposit-third-party__field--btn__option">
          <button
            class="ui-btn ui-btn--block"
            type="button"
            :class="{ active: method == item.Value }"
            v-for="item in depositInfo.paymentSelect"
            :key="item.Value"
            @click="method = item.Value"
          >
            {{ item.Text }}
          </button>
        </div>
        <select v-model="method" v-show="false">
          <option value="">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </ValidationProvider>

      <ValidationProvider
        class="deposit-third-party__field--btn deposit-third-party__field--platform"
        tag="div"
        :rules="{ 'object-not-empty': true }"
      >
        <div class="deposit-third-party__field--btn__title">支付平台</div>
        <div class="deposit-third-party__field--btn__option">
          <button
            class="ui-btn ui-btn--block"
            type="button"
            :class="{ active: platform === item }"
            v-for="item in getPlatformListByMethod"
            :key="item.spp_key"
            @click="platform = item"
          >
            {{ item.dm_title }}
          </button>
        </div>
        <select v-model="platform" v-show="false">
          <option value="">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </ValidationProvider>

      <ValidationProvider
        class="deposit-third-party__field--btn deposit-third-party__field--amount"
        tag="div"
        :rules="{ required: true, min_value: amountMin, max_value: amountMax }"
      >
        <div class="deposit-third-party__field--btn__title">存款金額</div>
        <div class="deposit-third-party__field--btn__option">
          <button
            class="ui-btn ui-btn--block"
            type="button"
            v-for="item in amountList"
            :key="item"
            :class="{ active: amount == item && !isShowInputAmount }"
            @click="changeAmountByButton(item)"
          >
            {{ item }}
          </button>
          <button
            class="ui-btn ui-btn--block"
            type="button"
            :class="{ active: isShowInputAmount }"
            @click="showInputAmount"
          >
            自行輸入
          </button>
        </div>
        <div class="ui-field" v-show="isShowInputAmount">
          <div class="ui-field__group">
            <label class="ui-field__group__label">存款金額</label>
            <input
              class="ui-field__group__input"
              type="number"
              step="1"
              v-model.number="amount"
              @change="inputAmount"
            />
          </div>
        </div>
      </ValidationProvider>

      <div class="ui-field deposit-third-party__field deposit-third-party__field--remark">
        <div class="ui-field__group">
          <label class="ui-field__group__label" for="deposit-bank-account">
            {{ $t('transaction.deposit.field.remark') }}
          </label>
          <input class="ui-field__group__input" type="text" v-model="remark" />
        </div>
      </div>

      <ValidationProvider class="ui-field deposit-base__field deposit-base__field--bank" tag="div">
        <select class="ui-field__select" v-model="promotion">
          <option :value="item.Value" v-for="item in promotionList" :key="item.Value">{{ item.Text }}</option>
        </select>
        <div class="ui-field__error" v-if="promotion == -1">
          {{ $t('transaction.deposit.hint.promotion') }}
        </div>
      </ValidationProvider>

      <ValidationProvider class="ui-field" tag="div" :rules="{ required: true, min: 4, max: 4, regex: '^[0-9]*$' }">
        <div class="ui-field__group">
          <label class="ui-field__group__label">{{ $t('login.placeholder.captcha') }}</label>
          <input
            class="ui-field__group__input"
            type="code"
            :placeholder="$t('login.placeholder.captcha')"
            v-model="captcha"
          />
          <img
            class="ui-field__captcha"
            :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
            :width="captchaImage.Width"
            :height="captchaImage.Height"
            v-if="captchaImage.ImgBase64 != ''"
          />
        </div>
      </ValidationProvider>

      <div class="ui-notice">
        <ul>
          <li v-for="item in noticeList" :key="item" v-html="$t(item)"></li>
        </ul>
      </div>

      <div class="deposit-third-party__btn">
        <button class="ui-btn ui-btn--block deposit-third-party__btn--submit" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
        <button class="ui-btn ui-btn--block deposit-third-party__btn--reset" type="reset" @click="resetForm">
          {{ $t('ui.button.reset') }}
        </button>
      </div>
    </form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import mixinTransactionDepositThirdParty from '@/mixins/transactionDepositThirdParty';
export default {
  name: 'TransactionDepositThirdParty',
  mixins: [mixinTransactionDepositThirdParty],
  components: {
    ValidationObserver,
    ValidationProvider,
  },
};
</script>
