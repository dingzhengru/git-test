<template>
  <ValidationObserver class="deposit-third-party" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="deposit-third-party-form" @submit.prevent="handleSubmit(submitDeposit)" @reset.prevent="reset">
      <ValidationProvider
        class="deposit-third-party__field--btn deposit-third-party__field--platform"
        tag="div"
        :rules="{ 'object-not-empty': true }"
      >
        <div class="deposit-third-party__field--btn__title">{{ $t('transaction.deposit.field.payPlatform') }}</div>
        <div class="deposit-third-party__field--btn__option">
          <button
            class=""
            type="button"
            :class="{ active: platform === item }"
            v-for="item in getPlatformListByMethod"
            :key="item.spp_key"
            :disabled="item.isMaintenance"
            @click="changePlatform(item)"
          >
            {{ item.st_service_name }}
            <span v-if="item.isMaintenance">({{ $t('ui.label.underMaintenance') }})</span>
          </button>
        </div>
        <select v-model="platform" v-show="false">
          <option :value="{}"></option>
          <option :value="item" v-for="item in getPlatformListByMethod" :key="item.spp_key"></option>
        </select>
      </ValidationProvider>

      <ValidationProvider
        class="deposit-third-party__field--btn deposit-third-party__field--amount"
        tag="div"
        :rules="{ required: true, min_value: amountMin, max_value: amountMax }"
      >
        <div class="deposit-third-party__field--btn__title">{{ $t('transaction.deposit.field.amount') }}</div>
        <div class="deposit-third-party__field--btn__option" v-show="!$isObjEmpty(platform)">
          <button
            class=""
            type="button"
            v-for="item in amountList"
            :key="item"
            :class="{ active: amount == item && !isShowInputAmount }"
            @click="changeAmountByButton(item)"
            v-show="item >= amountMin && item <= amountMax"
          >
            {{ item }}
          </button>
          <button class="" type="button" :class="{ active: isShowInputAmount }" @click="showInputAmount">
            {{ $t('transaction.deposit.third-party.amountEnter') }}
          </button>
        </div>
        <div class="ui-field" v-show="isShowInputAmount">
          <div class="ui-field__group">
            <label class="ui-field__group__label">{{ $t('transaction.deposit.field.amount') }}</label>
            <input
              class="ui-field__group__input"
              type="number"
              step="1"
              v-model.number="amount"
              @change="inputAmount"
            />
          </div>
        </div>
        <div class="ui-notice">
          <ul>
            <li
              v-html="
                $t('transaction.deposit.hint.amount01', {
                  currency: $t('ui.label.baht'),
                  amountLimitMin: $numeral(amountMin).format('0,0.00'),
                  amountLimitMax: $numeral(amountMax).format('0,0.00'),
                })
              "
            ></li>
          </ul>
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
          <option :value="item.Value" v-for="item in depositInfo.AllActivityList" :key="item.Value">{{
            item.Text
          }}</option>
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
            autocomplete="off"
            v-model="captcha"
          />
          <img
            class="ui-field__captcha"
            :src="`data:image/png;base64,${captchaImage.ImgBase64}`"
            :width="captchaImage.Width"
            :height="captchaImage.Height"
            @click="changeCaptcha"
            v-if="captchaImage.ImgBase64 != ''"
          />
        </div>
      </ValidationProvider>

      <div class="deposit-third-party__btn">
        <button class="deposit-third-party__btn deposit-third-party__btn--submit" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
        </button>
        <button class="deposit-third-party__btn deposit-third-party__btn--reset" type="reset" @click="resetForm">
          {{ $t('ui.button.reset') }}
        </button>

        <div class="ui-question" @click="isShowModalNotice = true"></div>
      </div>
    </form>
    <div v-if="iframe.isShow">
      <ModalDepositThirdParty
        :src="iframe.src"
        :width="platform.sp_MobileWidth || 720"
        :height="platform.sp_MobileHeight || 500"
        :isOrderSuccess="isOrderSuccess"
        @close="closeIframe"
        v-if="iframe.isShow"
      />
    </div>

    <component
      :is="ModalNoticeList"
      :noticeList="noticeList"
      v-if="isShowModalNotice"
      @close="isShowModalNotice = false"
    />
  </ValidationObserver>
</template>

<script>
import { mapGetters } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import mixinTransactionDepositThirdParty from '@/mixins/transactionDepositThirdParty';
export default {
  name: 'TransactionDepositThirdParty',
  mixins: [mixinTransactionDepositThirdParty],
  components: {
    ValidationObserver,
    ValidationProvider,
    ModalDepositThirdParty: () => import('@/components/ModalDepositThirdParty'),
  },
  computed: {
    ...mapGetters(['siteSetting']),
    ModalNoticeList() {
      return () => import(`@/${this.siteSetting.components.transaction.ModalNoticeList}`);
    },
  },
  data() {
    return {
      isShowModalNotice: false,

      noticeList: [
        {
          text: 'transaction.deposit.notice.currency',
          params: { currency: this.$t('ui.label.baht') },
        },
        'transaction.deposit.notice.depositLimit01',
        'transaction.deposit.notice.depositLimit02',
        'transaction.deposit.notice.userBear01',
        'transaction.deposit.notice.userBear02',
        'transaction.deposit.notice.contact',
      ],
    };
  },
};
</script>
