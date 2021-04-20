<template>
  <AppModal @close="closeModalTransfer">
    <div class="game-transfer-dialog">
      <div class="ui-box-close" @click="closeModalTransfer"></div>

      <div class="game-transfer-dialog__header">
        <div class="game-transfer-dialog__title">{{ $t('game.transfer.title') }}</div>
      </div>

      <ValidationObserver class="game-transfer-dialog__body" tag="div" v-slot="{ invalid, handleSubmit }">
        <form class="game-transfer-dialog__form" @submit.prevent="handleSubmit(submitTransfer)">
          <div class="game-transfer-dialog__form__content">
            <span class="game-transfer-dialog__form__label">{{ $t('game.transfer.from') }}</span>
            <span class="game-transfer-dialog__form__wallet">{{ userGamePointWallet.Product_Name }}：</span>
            <span class="game-transfer-dialog__form__amount">{{ userGamePointWallet.Point }}</span>
          </div>
          <div class="game-transfer-dialog__form__content">
            <span class="game-transfer-dialog__form__label">{{ $t('game.transfer.to') }}</span>
            <span class="game-transfer-dialog__form__wallet">{{ productPointCurrent.Product_Name }}：</span>
            <span class="game-transfer-dialog__form__amount">{{ productPointCurrent.Point }}</span>
          </div>

          <ValidationProvider tag="div" v-show="promotionList.length > 0">
            <div class="game-transfer-dialog__form__content game-transfer-dialog__form__content--promotion">
              <span class="game-transfer-dialog__form__label">{{ $t('ui.label.promotion') }}</span>
            </div>

            <div class="ui-field">
              <select class="ui-field__select" v-model="promotion">
                <option value="">{{ $t('ui.label.pleaseSelect') }}</option>
                <option :value="item.Value" v-for="item in promotionList" :key="item.Value">
                  {{ item.Text }}
                </option>
              </select>
            </div>
          </ValidationProvider>

          <div class="game-transfer-dialog__form__switch-div">
            <button
              class="game-transfer-dialog__form__switch left"
              type="button"
              :class="{ on: isTransferAll }"
              @click.capture.stop="switchTransferAll(true)"
            >
              {{ $t('game.transfer.transferAll') }}
            </button>
            <button
              class="game-transfer-dialog__form__switch right"
              type="button"
              :class="{ on: !isTransferAll }"
              @click.capture.stop="switchTransferAll(false)"
            >
              {{ $t('game.transfer.transferByEnter') }}
            </button>
          </div>

          <ValidationProvider
            :rules="{ required: true, integer: true, min_value: 1, max_value: userGamePointWallet.Point }"
          >
            <input
              class="game-transfer-dialog__form__input"
              type="number"
              v-model.number="amount"
              v-show="!isTransferAll"
              @focus="focusAmount"
              @blur="blurAmount"
              @change="changeAmount"
            />
          </ValidationProvider>

          <button
            class="game-transfer-dialog__form__button ui-btn"
            type="submit"
            :disabled="invalid"
            v-if="!isTransferAll"
          >
            {{ $t('game.transfer.submit') }}
          </button>

          <button class="game-transfer-dialog__form__button ui-btn" type="button" @click="submitTransfer" v-else>
            {{ $t('game.transfer.submit') }}
          </button>
        </form>
      </ValidationObserver>
    </div>
  </AppModal>
</template>

<script>
import mixinModalTransfer from '@/mixins/modalTransfer';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
export default {
  name: 'ModalTransfer',
  mixins: [mixinModalTransfer],
  components: {
    AppModal: () => import('@/components/AppModal'),
    ValidationObserver,
    ValidationProvider,
  },
};
</script>
