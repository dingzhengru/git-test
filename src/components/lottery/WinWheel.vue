<template>
  <div class="vue-winwheel">
    <div class="vue-winWheel__title" style="text-align: center;">
      <img :src="wheelStyle.activityImgUrl" alt="" style="width: 100%;" />
    </div>
    <div class="vue-winwheel__dialog vue-winwheel__dialog-chance" style="margin-top: -4px;">
      <slot name="game-chance" />
    </div>
    <div class="vue-winwheel__wrapper">
      <canvas
        class="vue-winwheel__body"
        id="winwheel"
        :style="{ backgroundImage: 'url(' + wheelStyle.wheelBackgroundImgUrl + ')' }"
        :width="wheelStyle.width"
        :height="wheelStyle.height"
      >
        <p style="{color: white}" align="center">
          Sorry, your browser doesn't support canvas. Please try Google Chrome.
        </p>
      </canvas>

      <div class="vue-winwheel__btn" @click.prevent="startHandler">
        <img v-show="isWheelLoading" :src="wheelStyle.wheelLodaingImgUrl" class="vue-winwheel__loading" alt="" />
        <img :src="wheelStyle.pointerImgUrl" alt="" />
      </div>
    </div>
    <transition name="modalTransition">
      <div class="vue-winwheel__dialog vue-winwheel__dialog-prize" v-show="isModalShow && gamePrize">
        <div class="close" @click="isModalShow = false"></div>
        <slot name="game-dialog" />
      </div>
    </transition>
    <div class="overlay" v-show="!wheelSegmentsPrize.length">
      <p v-if="errMsg" class="vue-winwheel__errorMsg">{{ errMsg }}</p>
      <img v-else :src="wheelStyle.loadingImgUrl" alt="" />
    </div>
  </div>
</template>

<script>
import { Winwheel } from '@/utils/winWheel';

export default {
  props: {
    wheelStyle: {
      require: true,
    },
    wheelOptions: {
      require: true,
    },
    wheelSegmentsPrize: {
      require: true,
    },
    gameChance: {
      require: true,
    },
    gamePrize: {
      require: true,
    },
    isWheelLoading: {
      require: true,
    },
    errMsg: {
      require: false,
    },
  },
  data() {
    return {
      // 轉盤實例
      wheelObject: null,
      // 轉盤內容，抽獎前顯示
      wheelSegments: [],
      // 保存選轉角度，做於揭露獎項後的旋轉位置
      wheelPrizeAngle: 0,

      isGameEnable: true,
      isWheelSpinning: false,
      isModalShow: false,
      isFirstTry: true,
    };
  },
  methods: {
    // 依照回傳獎項數量產出蓋牌轉盤列表
    defaultSegemetsHandler() {
      this.wheelSegmentsPrize.map((item, index) => {
        console.log(item);
        let prizeText = '' + (index + 1);
        this.wheelSegments.push({
          text: prizeText,
          // image: this.wheelStyle.prizeImgUrl,
          image: item.image,
          fillStyle: item.fillStyle,
        });
      });
      this.initWheel();
    },
    // 開始抽獎
    startHandler() {
      if (!this.isGameEnable || this.gameChance <= 0) return;
      this.isGameEnable = false;
      this.isModalShow = false;

      this.$emit('startHandler');
    },
    // 遊戲結束
    finishHandler() {
      this.revealWheel();
      this.isWheelSpinning = false;
      this.isModalShow = true;
      this.isGameEnable = true;
    },
    // 創建轉盤
    createWheel() {
      this.wheelOptions.animation.callbackFinished = this.finishHandler;
      let option = {
        ...this.wheelOptions,
        numSegments: this.wheelSegments.length,
        segments: this.wheelSegments,
      };
      this.wheelObject = new Winwheel(option);
    },
    // 初始化轉盤數據，繪製轉盤
    initWheel() {
      this.createWheel();

      if (this.isWheelSpinning) {
        this.wheelObject.stopAnimation(false); // Stop the animation, false as param so does not call callback function.
      }

      this.wheelObject.rotationAngle = 0; // Re-set the wheel angle to 0 degrees.
      this.wheelObject.draw(); // Call draw to render changes to the wheel.
      this.isWheelSpinning = false; // Reset to false to power buttons and spin can be clicked again.
    },
    // 轉盤旋轉
    startWheel(prize) {
      if (this.isWheelSpinning === false) {
        this.isModalShow = false;
        this.isWheelSpinning = true;
        this.createWheel();

        // 帶入中獎獎品的 index
        let prizeNumber;

        this.wheelSegmentsPrize.forEach((item, index) => {
          if (prize.key == item.key) {
            prizeNumber = index + 1;
          }
        });

        let stopAt = (360 / this.wheelSegmentsPrize.length) * prizeNumber - 360 / this.wheelSegmentsPrize.length / 2; // center pin

        this.wheelPrizeAngle = stopAt;
        this.wheelObject.animation.stopAngle = stopAt;
        this.wheelObject.startAnimation();
      }
    },
    // 轉盤獎項揭露
    revealWheel() {
      let option = {
        ...this.wheelOptions,
        numSegments: this.wheelSegmentsPrize.length,
        segments: this.wheelSegmentsPrize,
      };
      this.wheelObject = new Winwheel(option);

      this.wheelObject.rotationAngle = 360 - this.wheelPrizeAngle;
      this.wheelObject.draw();
    },
  },
  watch: {
    wheelSegmentsPrize: {
      deep: true,
      handler() {
        if (this.isFirstTry) {
          this.defaultSegemetsHandler();
          this.isFirstTry = false;
        }
      },
    },
    gamePrize: {
      deep: true,
      handler(val) {
        if (val) {
          this.startWheel(val);
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.vue-winwheel {
  position: relative;

  &__title {
    text-align: center;
  }
  &__body {
    margin-left: auto;
    margin-right: auto;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
  &__btn {
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55%);
  }
  &__loading {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0%);
    width: 100%;
  }
  &__dialog {
    background-color: rgba(#fff, 0.9);
    border-radius: 5px;
    padding: 15px;
    text-align: center;
    &-chance {
      margin-bottom: 10px;
    }
    &-prize {
      padding: 20px 25px 10px 25px;
      position: absolute;
      left: 50%;
      bottom: 20px;
      transform: translateX(-50%);
      z-index: 2;
    }
    &-ovelay {
      font-size: 20px;
    }
    .close {
      position: absolute;
      right: 5px;
      top: 10px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
      &:before,
      &:after {
        content: '';
        display: block;
        width: 16px;
        height: 3px;
        background-color: #000;
        border-radius: 10px;
      }
      &:before {
        transform: rotate(45deg);
      }
      &:after {
        transform: translateY(-3px) rotate(-45deg);
      }
    }
  }
  &__wrapper {
    display: flex;
    position: relative;
  }
  &__errorMsg {
    color: #fff;
    font-size: 24px;
    letter-spacing: 2px;
  }
  .overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(#000, 0.7);
    z-index: 1;
  }
}

.modalTransition-enter-active,
.modalTransition-leave-active {
  transition: opacity 0.2s, transform 0.3s;
}

.modalTransition-enter,
.modalTransition-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}
</style>
