<template>
  <ValidationObserver class="deposit-third-party" tag="div" v-slot="{ invalid, handleSubmit }">
    <form class="deposit-third-party-form" @submit.prevent="handleSubmit(submitDeposit)" @reset.prevent="reset">
      <fieldset class="ui-fieldset">
        <legend>{{ $t('transaction.deposit.field.payPlatform') }}</legend>

        <ValidationProvider
          class="deposit-third-party__field--btn deposit-third-party__field--platform"
          tag="div"
          :rules="{ 'object-not-empty': true }"
        >
          <div class="deposit-third-party__field--btn__option">
            <button
              class="ui-btn"
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
      </fieldset>

      <fieldset class="ui-fieldset">
        <legend>{{ $t('transaction.deposit.field.amount') }}</legend>
        <ValidationProvider
          class="deposit-third-party__field--btn deposit-third-party__field--amount"
          tag="div"
          :rules="{ required: true, min_value: amountMin, max_value: amountMax }"
          v-slot="{ errors }"
          v-show="!$isObjEmpty(platform)"
        >
          <div class="deposit-third-party__field--amount__field">
            <div class="ui-field ui-field--inside" :class="{ invalid: errors.length > 0 }">
              <input
                type="number"
                step="1"
                :placeholder="$t('transaction.deposit.third-party.amountEnter')"
                v-model.number="amount"
                @change="inputAmount"
              />
              <span>{{ $t('ui.currency.thaiBaht') }}</span>
            </div>
            <div class="deposit-third-party__field--btn__option deposit-third-party__field--amount__field__btn">
              <button
                class="ui-btn"
                type="button"
                v-for="item in amountList"
                :key="item"
                :class="{ active: amount == item && !isShowInputAmount }"
                @click="changeAmountByButton(item)"
                v-show="item >= amountMin && item <= amountMax"
              >
                {{ item }}
              </button>
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
      </fieldset>

      <fieldset class="ui-fieldset flex-row deposit-third-party__promotion">
        <legend>{{ $t('ui.label.promotion') }}</legend>
        <ValidationProvider class="ui-field deposit-third-party__field deposit-third-party__field--promotion" tag="div">
          <select class="ui-field__select" v-model="promotion">
            <option :value="item.Value" v-for="item in promotionList" :key="item.Value">{{ item.Text }}</option>
          </select>
          <div class="deposit-third-party__field--promotion__hint" v-if="promotion == -1">
            {{ $t('transaction.deposit.hint.promotion') }}
          </div>
        </ValidationProvider>
      </fieldset>

      <fieldset class="ui-fieldset">
        <legend>{{ $t('ui.label.captcha') }}</legend>
        <ValidationProvider
          class="ui-field deposit-third-party__field deposit-third-party__field--captcha"
          tag="div"
          :rules="{ required: true, min: 4, max: 4, regex: '^[0-9]*$' }"
        >
          <input
            class="ui-field__group__input"
            type="code"
            :placeholder="$t('login.placeholder.captcha')"
            maxlength="4"
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
        </ValidationProvider>
      </fieldset>

      <div class="deposit-third-party__btn">
        <button class="ui-btn ui-btn--lg" type="submit" :disabled="invalid">
          {{ $t('ui.button.submit') }}
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
