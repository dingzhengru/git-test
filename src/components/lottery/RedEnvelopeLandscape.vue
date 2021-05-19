<template>
  <div class="red-envelope">
    <img class="red-envelope__title" :src="imgTitle" alt="" />
    <div class="red-envelope__content">
      <div class="red-envelope__item"></div>
      <div class="red-envelope__item"></div>
      <div class="red-envelope__item"></div>
      <div class="red-envelope__item"></div>
      <div class="red-envelope__item"></div>
      <div class="red-envelope__item"></div>
      <div class="red-envelope__item"></div>
      <div class="red-envelope__item"></div>
      <div class="red-envelope__item"></div>
      <div class="red-envelope__item"></div>
    </div>
    <!-- <div class="-eedEnvelope__title">
      <img :src="gameStyle.activityImgUrl" alt="" />
    </div>
    <div class="-eedEnvelope__container" v-show="!gamePrize">
      <div
        class="-eedEnvelope__card"
        v-for="(item, index) in prizeHolder"
        :key="item.text"
        :class="{ 'card-select': item.selected }"
        @click="selectHandler(item, index)"
      >
        <div class="redEnvelope__card__inner">
          <div class="redEnvelope__card__front">
            <img :src="gameStyle.cardFrontImgUrl" alt="" />
          </div>
          <div class="redEnvelope__card__back">
            <img :src="gameStyle.cardBackImgUrl" alt="" />
            <img class="redEnvelope__loading" :src="gameStyle.envelopeLoadingImgUrl" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="redEnvelope__container" v-show="gamePrize">
      <div
        class="redEnvelope__card redEnvelope__card-result"
        v-for="(item, index) in randomResult"
        :key="item.key"
        :class="{ 'card-result': gameSelect == index }"
      >
        <div class="redEnvelope__card__inner">
          <div class="redEnvelope__card__front">
            <img :src="item.image" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="overlay" v-show="!prizeList.length">
      <p v-if="errMsg" class="redEnvelope__errorMsg">{{ errMsg }}</p>
      <img v-else :src="gameStyle.loadingImgUrl" alt="" />
    </div>
    <transition name="dialogTransition">
      <div
        class="redEnvelope__dialog"
        :style="{ backgroundImage: 'url(' + gameStyle.dialogImgUrl + ')' }"
        v-show="isModalShow"
      >
        <div v-show="gamePrize">
          <slot name="game-result" />
        </div>
        <div class="redEnvelope__dialog__btn" @click="startHandler">
          <slot name="game-chance" />
        </div>
      </div>
    </transition> -->
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
      prizeHolder: [],
      randomResult: [],
      gameSelect: -1,
      isModalShow: true,
    };
  },
  methods: {
    // 依照回傳獎項數量產出蓋牌紅包列表
    defaultPrizeHandler() {
      this.prizeList.map((item, index) => {
        let prizeText = '' + (index + 1);
        this.prizeHolder.push({
          text: prizeText,
        });
      });
      console.log(this.prizeHolder);
      console.log(this.gamePrize);
    },
    // 因回傳的列表為固定位置，隨機化列表
    randomPrizeHandler() {
      let sourcePrize = [...this.prizeList];
      let resultLength = sourcePrize.length;
      let arr = [];
      while (resultLength--) {
        let j = Math.floor(Math.random() * (resultLength + 1));
        arr.push(sourcePrize[j]);
        sourcePrize.splice(j, 1);
      }

      this.randomResult = arr;
    },
    // 開始遊戲
    startHandler() {
      if (this.gameChance <= 0) return;
      this.gameSelect = -1;
      this.isModalShow = false;
      this.isGameEnable = true;

      this.prizeHolder.map(item => {
        this.$set(item, 'selected', false);
      });

      this.$emit('startHandler');
    },
    // 選擇紅包
    selectHandler(item, index) {
      if (!this.isGameEnable) return;
      this.isGameEnable = false;
      this.gameSelect = index;
      this.$set(item, 'selected', true);
      this.$emit('selectHandler');
    },
    // 顯示結果
    resultHandler() {
      // 將抽獎結果的圖片位置與點選的位置做交換
      let prizeIndex = this.randomResult.findIndex(item => item.key == this.gamePrize.key);
      let temp = this.randomResult[prizeIndex];
      this.randomResult[prizeIndex] = this.randomResult[this.gameSelect];
      this.randomResult[this.gameSelect] = temp;

      // 彈跳獎項視窗
      window.setTimeout(() => {
        this.isModalShow = true;
      }, 2500);
    },
  },
  watch: {
    prizeList: {
      deep: true,
      handler() {
        console.log(this.prizeHolder);
        console.log(this.gamePrize);
        this.randomPrizeHandler();
      },
    },
    gamePrize: {
      deep: true,
      handler(val) {
        if (!val) return;
        this.resultHandler();
      },
    },
  },
  mounted() {
    
  }
};
</script>

<style lang="scss" scoped>
$red-envelop-bg: url(~@/assets/common/lottery/redEnvelope/landscape/bg.png) center/cover no-repeat;
$red-envelop-item-bg: url(~@/assets/common/lottery/redEnvelope/landscape/prize-01.png) center/contain no-repeat;
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
