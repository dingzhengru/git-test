<template>
  <div class="red-envelope" :style="{ 'background-image': `url(${imgBg})` }">
    <!-- <img class="red-envelope__title" :src="imgTitle" alt="" /> -->
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
    <div class="modal-alert red-envelope__modal" v-if="isModalResultShow">
      <slot name="game-result" />
    </div>
    <div class="modal-alert red-envelope__modal" v-else-if="errorMessage">{{ errorMessage }}</div>
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
    ...mapGetters(['siteFullCss', 'lang']),
    isGameEnable() {
      return this.gameChance > 0 && this.isShowResult === false;
    },
    errorMessage() {
      if (this.gameChance <= 0) {
        return this.$t('home.lottery.redEnvelope.startButton', { count: this.gameChance });
      }
      return '';
    },
    imgBg() {
      try {
        return require(`@/assets/common/lottery/redEnvelope/landscape/bg-${this.lang}.png`);
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
// $red-envelop-bg: url(~@/assets/common/lottery/redEnvelope/landscape/bg-th-th.png) center/cover no-repeat;
$red-envelop-item-bg: url(~@/assets/common/lottery/redEnvelope/landscape/prize-01.png) center/contain no-repeat;
$red-envelop-loading-bg: url(~@/assets/common/ui/loading.gif) center/auto 50% no-repeat, rgba(black, 0.8);

.red-envelope {
  width: 100%;
  height: 100%;
  // background: $red-envelop-bg;

  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

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
      top: 30%;
    }
    &:nth-child(2) {
      left: 45%;
      top: 30%;
      transform: rotate(-20deg);
    }
    &:nth-child(3) {
      left: 60%;
      top: 36%;
      transform: rotate(-5deg);
    }
    &:nth-child(4) {
      left: 73%;
      top: 42%;
      transform: rotate(-65deg);
    }
    &:nth-child(5) {
      left: 35%;
      top: 42%;
      transform: rotate(-55deg);
    }
    &:nth-child(6) {
      left: 22%;
      top: 54%;
      transform: rotate(-65deg);
    }
    &:nth-child(7) {
      left: 50%;
      top: 54%;
      transform: rotate(-55deg);
    }
    &:nth-child(8) {
      left: 33%;
      top: 60%;
      transform: rotate(-45deg);
    }
    &:nth-child(9) {
      left: 63%;
      top: 60%;
      transform: rotate(-55deg);
    }
    &:nth-child(10) {
      left: 46%;
      top: 73%;
    }
  }

  // &__modal {
  //   width: 100%;
  //   height: 50%;
  //   background: linear-gradient(to right, rgba(black, 0), rgba(black, 1) 40%, rgba(black, 1) 60%, rgba(black, 0) 100%);

  //   top: 50%;
  //   transform: translateY(-50%);

  //   position: absolute;

  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   justify-content: center;

  //   &,
  //   * {
  //     color: #e5bf79;
  //     font-weight: bold;
  //     font-size: 1.5rem;
  //   }
  // }

  &__loading {
    background: $red-envelop-loading-bg;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
</style>
