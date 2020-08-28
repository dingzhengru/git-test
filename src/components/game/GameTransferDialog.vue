<template>
  <div>
    <div class="ui-overlay"></div>
    <div class="game-transfer-dialog-wrapper" @click="$emit('close')">
      <div class="game-transfer-dialog">
        <div class="ui-box-close" @click.capture.stop="$emit('close')"></div>
        <div class="game-transfer-dialog__title" @click.capture.stop="">{{ $t('game.transfer.title') }}</div>

        <form class="game-transfer-dialog__form" @submit.prevent="submitTransfer">
          <div class="game-transfer-dialog__form__text" @click.capture.stop="">
            {{ $t('game.transfer.from') }} <span>{{ wallet.Product_Name }}：{{ wallet.Point }}</span>
          </div>
          <div class="game-transfer-dialog__form__text" @click.capture.stop="">
            {{ $t('game.transfer.to') }}
            <span>{{ currentPointProduct.Product_Name }}： {{ currentPointProduct.Point }}</span>
          </div>

          <div class="game-transfer-dialog__form-switch-div">
            <button
              class="game-transfer-dialog__form-switch left"
              type="button"
              :class="{ on: isTransferAll }"
              @click.capture.stop="isTransferAll = true"
            >
              {{ $t('game.transfer.transferAll') }}
            </button>
            <button
              class="game-transfer-dialog__form-switch right"
              type="button"
              :class="{ on: !isTransferAll }"
              @click.capture.stop="isTransferAll = false"
            >
              {{ $t('game.transfer.transferByEnter') }}
            </button>
            <input
              class="game-transfer-dialog__form-input"
              type="number"
              v-model.number="amount"
              v-if="!isTransferAll"
              @click.capture.stop=""
              @focus="focusAmount"
              @blur="blurAmount"
            />
          </div>
          <button
            class="game-transfer-dialog__form__button ui-btn"
            type="submit"
            @click.capture.stop=""
            :disabled="!isTransferAll && (amount <= 0 || amount == '')"
          >
            {{ $t('game.transfer.submit') }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameTransferDialog',
  props: {
    wallet: {
      type: Object,
      default: () => {},
    },
    currentPointProduct: {
      type: Object,
      default: () => {},
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
        this.amount = this.wallet.Point;
      } else if (this.amount > this.wallet.Point || this.amount <= 0 || this.amount == '') {
        return;
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
  },
};
</script>

<style scoped>
.game-transfer-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
}
.game-transfer-dialog {
  width: 80%;
  /* height: 628px; */
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  overflow: auto;
  z-index: 9999;
  font-size: 2.5rem;
  padding: 40px 30px 40px 30px;
}
.game-transfer-dialog__title {
  margin-bottom: 30px;
  font-size: 3rem;
  text-align: center;
  font-weight: bold;
}

.game-transfer-dialog__form {
  margin-bottom: 60px;
}

.game-transfer-dialog__form__text {
  text-align: left;
  margin-left: 30px;
  color: #959595;
}

.game-transfer-dialog__form__text span {
  color: #d6c388;
}

.game-transfer-dialog__form-switch-div {
  margin-top: 20px;
}

.game-transfer-dialog__form-switch {
  display: inline-block;
  width: 261px;
  height: 100px;
  background-color: transparent;
  background-repeat: no-repeat;
  font-weight: bold;
  padding-left: 50px;
  /* padding: 25px 0px 30px 50px; */
  color: #686868;
  border: 0;
  vertical-align: middle;
}

.game-transfer-dialog__form-switch.on {
  color: black;
}

.game-transfer-dialog__form-input {
  width: 90%;
  padding: 16px 0 16px 20px;
  font-size: 34px;
  background-color: #2d2d2d;
  border-radius: 6px;
  border: 1px solid #7e7e7e;
  margin-top: 20px;
  box-sizing: border-box;
}

.game-transfer-dialog__form__button {
  margin-top: 30px;
  width: 90%;
  background-image: url(~@/assets/common/imgs/ui/btn--red.jpg);
}
</style>
