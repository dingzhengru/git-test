<template>
  <AppModal :isShow="isShow" @close="$emit('close')">
    <div class="game-transfer-dialog">
      <div class="ui-box-close" @click="$emit('close')"></div>
      <div class="game-transfer-dialog__title">{{ $t('game.transfer.title') }}</div>

      <ValidationObserver v-slot="{ invalid, handleSubmit }">
        <form class="game-transfer-dialog__form" @submit.prevent="handleSubmit(submitTransfer)">
          <div class="game-transfer-dialog__form__text">
            {{ $t('game.transfer.from') }} <span>{{ wallet.Product_Name }}：{{ wallet.Point }}</span>
          </div>
          <div class="game-transfer-dialog__form__text">
            {{ $t('game.transfer.to') }}
            <span>{{ currentPointProduct.Product_Name }}： {{ currentPointProduct.Point }}</span>
          </div>

          <div class="game-transfer-dialog__form__switch-div">
            <button
              class="game-transfer-dialog__form__switch left"
              type="button"
              :class="{ on: isTransferAll }"
              @click.capture.stop="isTransferAll = true"
            >
              {{ $t('game.transfer.transferAll') }}
            </button>
            <button
              class="game-transfer-dialog__form__switch right"
              type="button"
              :class="{ on: !isTransferAll }"
              @click.capture.stop="isTransferAll = false"
            >
              {{ $t('game.transfer.transferByEnter') }}
            </button>
          </div>

          <ValidationProvider :rules="{ required: true, integer: true, min_value: 1, max_value: wallet.Point }">
            <input
              class="game-transfer-dialog__form__input"
              type="number"
              v-model.number="amount"
              v-if="!isTransferAll"
              @focus="focusAmount"
              @blur="blurAmount"
              @change="changeAmount"
            />
          </ValidationProvider>

          <button class="game-transfer-dialog__form__button ui-btn" type="submit" :disabled="invalid">
            {{ $t('game.transfer.submit') }}
          </button>
        </form>
      </ValidationObserver>
    </div>
  </AppModal>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate';
export default {
  name: 'GameTransferDialog',
  components: {
    AppModal: () => import('@/components/AppModal'),
    ValidationObserver,
    ValidationProvider,
  },
  props: {
    wallet: {
      type: Object,
      default: () => {},
    },
    currentPointProduct: {
      type: Object,
      default: () => {},
    },
    isShow: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    walletPoint() {
      return Math.floor(this.wallet.Point);
    },
  },
  data() {
    return {
      amount: 0,
      isTransferAll: true,
    };
  },
  methods: {
    submitTransfer() {
      if (this.isTransferAll) {
        this.amount = this.walletPoint;
      }
      this.$emit('submit-transfer', this.amount);
      this.amount = 0;
    },
    focusAmount() {
      if (this.amount <= 0) {
        this.amount = '';
      }
    },
    blurAmount() {
      if (this.amount == '') {
        this.amount = 0;
      }
    },
    changeAmount() {
      if (this.amount > this.wallet.Point) {
        this.amount = this.walletPoint;
      } else if (this.amount < 1) {
        this.amount = 1;
      }
    },
  },
};
</script>
