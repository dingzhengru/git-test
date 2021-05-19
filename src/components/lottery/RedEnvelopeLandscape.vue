<template>
  <div class="red-envelope">
    <img class="red-envelope__title" :src="imgTitle" alt="" />
    <div class="red-envelope__content">
      <div
        class="red-envelope__item"
        :class="{ open: isShowResult, selected: gamePrize.key == item.key }"
        v-for="item in prizeListClone"
        :key="item.key"
        @click="selectHandler(item)"
      >
        <img :src="item.image" alt="" v-if="isShowResult" />
      </div>
    </div>
    <div class="red-envelope__modal" v-if="isModalResultShow">
      <slot name="game-result" />
    </div>
    <div class="red-envelope__modal" v-else-if="errorMessage">{{ errorMessage }}</div>
    <div class="red-envelope__loading" v-show="isLoading"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    prizeList: {
      require: true,
    },
    gamePrize: {
      require: true,
    },
    gameStyle: {
      require: true,
    },
    gameChance: {
      require: true,
    },
    errMsg: {
      require: false,
    },
  },
  computed: {
    ...mapGetters(['siteFullCss']),
    isGameEnable() {
      return this.gameChance > 0 && this.isShowResult === false;
    },
    errorMessage() {
      if (this.gameChance <= 0) {
        return this.$t('home.lottery.redEnvelope.startButton', { count: this.gameChance });
      }
      return '';
    },
    imgTitle() {
      try {
        return require(`@/assets/common/lottery/redEnvelope/landscape/title.png`);
      } catch {
        return '';
      }
    },
  },
  data() {
    return {
      prizeListClone: [],
      selectedPrize: '',
      isShowResult: false,
      isModalResultShow: false,
      isLoading: true,
    };
  },
  methods: {
    // 選擇紅包
    selectHandler(item) {
      if (this.isLoading || this.isGameEnable === false) {
        return;
      }

      this.isLoading = true;
      this.selectedPrize = item;
      this.$emit('selectHandler');
    },
    // 顯示結果
    resultHandler() {
      // 將抽獎結果的圖片位置與點選的位置做交換
      const prize = this.prizeListClone.find(item => item.key == this.gamePrize.key);
      const selectedPrize = this.prizeListClone.find(item => item.key == this.selectedPrize.key);

      const prizeIndex = this.prizeListClone.findIndex(item => item.key == this.gamePrize.key);
      const selectedPrizeIndex = this.prizeListClone.findIndex(item => item.key == this.selectedPrize.key);

      this.prizeListClone[prizeIndex] = this.$deepClone(selectedPrize);
      this.prizeListClone[selectedPrizeIndex] = this.$deepClone(prize);

      window.setTimeout(() => {
        this.isShowResult = true;
        this.isLoading = false;
        this.isModalResultShow = true;
      }, 1000);
    },
  },
  watch: {
    prizeList: {
      deep: true,
      handler() {
        this.prizeListClone = this.$deepClone(this.prizeList);
        this.prizeListClone = this.$shuffleArray(this.prizeListClone);

        this.isLoading = false;
      },
    },
    gamePrize: {
      deep: true,
      handler() {
        if (!this.gamePrize) {
          return;
        }
        //* 開獎
        this.resultHandler();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
$red-envelop-bg: url(~@/assets/common/lottery/redEnvelope/landscape/bg.png) center/cover no-repeat;
$red-envelop-item-bg: url(~@/assets/common/lottery/redEnvelope/landscape/prize-01.png) center/contain no-repeat;
$red-envelop-loading-bg: url(~@/assets/common/ui/loading.gif) center/auto 50% no-repeat, rgba(black, 0.8);

.red-envelope {
  width: 100%;
  height: 100%;
  background: $red-envelop-bg;

  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    width: 50%;
  }

  &__content {
    width: 100%;
    flex-grow: 1;
    position: relative;
  }

  &__item {
    background: $red-envelop-item-bg;
    width: 50px;
    height: 60px;
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 50px;
      max-height: 60px;
    }

    &.open {
      background: none;
      transform: rotate(0deg) !important;
      opacity: 0.5;
    }

    &.selected {
      opacity: 1 !important;
    }

    &:nth-child(1) {
      left: 25%;
      top: 5%;
    }
    &:nth-child(2) {
      left: 45%;
      top: 5%;
      transform: rotate(-20deg);
    }
    &:nth-child(3) {
      left: 60%;
      top: 15%;
      transform: rotate(-5deg);
    }
    &:nth-child(4) {
      left: 73%;
      top: 20%;
      transform: rotate(-65deg);
    }
    &:nth-child(5) {
      left: 35%;
      top: 20%;
      transform: rotate(-55deg);
    }
    &:nth-child(6) {
      left: 22%;
      top: 37%;
      transform: rotate(-65deg);
    }
    &:nth-child(7) {
      left: 50%;
      top: 37%;
      transform: rotate(-55deg);
    }
    &:nth-child(8) {
      left: 33%;
      top: 45%;
      transform: rotate(-45deg);
    }
    &:nth-child(9) {
      left: 63%;
      top: 45%;
      transform: rotate(-55deg);
    }
    &:nth-child(10) {
      left: 46%;
      top: 60%;
    }
  }

  &__modal {
    width: 100%;
    height: 50%;
    background: linear-gradient(to right, rgba(black, 0), rgba(black, 1) 40%, rgba(black, 1) 60%, rgba(black, 0) 100%);

    top: 50%;
    transform: translateY(-50%);

    position: absolute;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &,
    * {
      color: #e5bf79;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }

  &__loading {
    background: $red-envelop-loading-bg;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  // position: relative;
  // text-align: center;
  // // padding: 150px 50px 50px 50px;
  // // width: 800px;
  // height: 100%;
  // @media screen and (max-width: 600px) {
  //   padding: 50px 0px 20px 0px;
  // }
  // &__title {
  //   img {
  //     display: inline-block;
  //   }
  // }
  // &__container {
  //   width: 80%;
  //   margin-left: auto;
  //   margin-right: auto;
  //   margin-top: 30px;
  //   display: flex;
  //   flex-wrap: wrap;
  //   justify-content: center;
  //   @media screen and (max-width: 600px) {
  //     width: 100%;
  //   }
  // }
  // &__card {
  //   width: 120px;
  //   height: 140px;
  //   position: relative;
  //   background-color: transparent;
  //   perspective: 1000px;
  //   cursor: pointer;
  //   @media screen and (max-width: 600px) {
  //     width: 100px;
  //     height: 120px;
  //   }
  //   @for $i from 1 through 10 {
  //     &:nth-child(#{$i}) {
  //       .redEnvelope__card__inner::after {
  //         animation-delay: $i * 0.2s;
  //       }
  //     }
  //   }
  //   &.card-select {
  //     // &:after {
  //     //   content: "";
  //     //   width: 50px;
  //     //   height: 50px;
  //     //   left: 50%;
  //     //   top: 50%;
  //     //   transform: translate(-50%, -50%);
  //     //   position: absolute;
  //     //   background: url($envelope-loading);
  //     //   background-position: center;
  //     //   background-repeat: no-repeat;
  //     // }
  //     .redEnvelope__card__inner {
  //       transform: rotateY(-180deg);
  //     }
  //   }
  //   &-result {
  //     opacity: 0.5;
  //     &.card-result {
  //       animation: anim-card-result 1s linear;
  //       opacity: 1;
  //     }
  //     .redEnvelope__card__inner::after {
  //       display: none;
  //     }
  //   }
  //   &__inner {
  //     position: relative;
  //     width: 100%;
  //     height: 100%;
  //     text-align: center;
  //     transition: transform 0.3s;
  //     transform-style: preserve-3d;
  //     &:after {
  //       content: '';
  //       position: absolute;
  //       left: 50%;
  //       top: 50%;
  //       width: 65%;
  //       height: 70%;
  //       border-radius: 20%;
  //       transform: rotateZ(15deg) translate(-65%, -40%);
  //       backface-visibility: hidden;
  //       animation: anim-card-glow 2s both linear infinite;
  //     }
  //   }
  //   &__front,
  //   &__back {
  //     position: absolute;
  //     width: 100%;
  //     height: 100%;
  //     backface-visibility: hidden;
  //   }
  //   &__back {
  //     transform: rotateY(180deg);
  //   }
  // }
  // &__loading {
  //   width: 100%;
  //   height: 150%;
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  // }
  // &__dialog {
  //   width: 422px;
  //   height: 257px;
  //   font-size: 2rem;

  //   position: absolute;
  //   left: 50%;
  //   top: 50%;
  //   background-size: contain;
  //   background-position: center;
  //   background-repeat: no-repeat;
  //   transform: translate(-50%, -60%);
  //   padding: 40px 50px;
  //   // min-height: 100px;
  //   white-space: nowrap;
  //   &__btn {
  //     // margin-top: 20px;
  //     // margin-bottom: 20px;
  //     margin-top: 20%;
  //     padding: 10px 20px;
  //     border-radius: 50px;
  //     line-height: 1;
  //     background: linear-gradient(
  //       0deg,
  //       rgba(246, 245, 167, 1) 0%,
  //       rgba(255, 253, 103, 1) 50%,
  //       rgba(246, 245, 167, 1) 100%
  //     );
  //     color: #d00402;
  //     cursor: pointer;
  //   }
  // }
  // &__errorMsg {
  //   color: #fff;
  //   font-size: 24px;
  //   letter-spacing: 2px;
  // }
}

.overlay {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  background-color: rgba(#000, 0.7);
}

@keyframes anim-card-glow {
  0%,
  100% {
    box-shadow: 0 0 10px 10px rgba(#f1ae3d, 0.3);
  }
  50% {
    box-shadow: 0 0 15px 20px rgba(#f1ae3d, 0.5);
  }
}

@keyframes anim-card-result {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}

.dialogTransition-enter-active,
.dialogTransition-leave-active {
  transition: opacity 0.2s, transform 0.6s;
}

.dialogTransition-enter,
.dialogTransition-leave-to {
  opacity: 0;
  transform: translate(-50%, -50%);
}
</style>
