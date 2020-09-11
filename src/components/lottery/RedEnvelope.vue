<template>
  <div class="pageEnvelope">
    <div class="redEnvelope">
      <div class="redEnvelope__title">
        <img
          :src="activityImgUrl"
          alt=""
        >
      </div>
      <div
        class="redEnvelope__container"
        v-show="!gamePrize"
      >
        <div
          class="redEnvelope__card"
          v-for="(item, index) in prizeHolder"
          :key="item.text"
          :class="{'card-select' : item.selected}"
          @click="lotteryHandler(item, index)"
        >
          <div class="redEnvelope__card__inner">
            <div class="redEnvelope__card__front">
              <img
                :src="gameStyle.cardFrontImgUrl"
                alt=""
              >
            </div>
            <div class="redEnvelope__card__back">
              <img
                :src="gameStyle.cardBackImgUrl"
                alt=""
              >
            </div>
          </div>
        </div>
      </div>
      <div
        class="redEnvelope__container"
        v-show="gamePrize"
      >
        <div
          class="redEnvelope__card redEnvelope__card-result"
          v-for="(item, index) in prizeList"
          :key="item.Lst_PrizeKey"
          :class="{'card-result' : gameSelect == index }"
        >
          <div class="redEnvelope__card__inner">
            <div class="redEnvelope__card__front">
              <img
                :src="item.Lst_ImageUrl"
                alt=""
              >
              <p class="text-test">{{ item.Lst_PrizeName }}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="overlay"
        v-show="!prizeList.length"
      >
        <p
          v-if="errMsg"
          class="redEnvelope__errorMsg"
        >{{ errMsg }}</p>
        <img
          v-else
          :src="gameStyle.loadingImgUrl"
          alt=""
        >
      </div>
      <transition name="dialogTransition">
        <div
          class="redEnvelope__dialog"
          v-show="isModalShow"
        >
          <div
            class="redEnvelope__dialog__title"
            v-show="gamePrize"
          >
            恭喜獲得獎品
            <br>
            [ {{ gamePrize.Lst_PrizeName }} ]
          </div>
          <div
            class="redEnvelope__dialog__btn"
            @click="startHandler"
          >
            剩餘抽獎機會 ({{ gameChance }})
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// API
import { apiSiteLotteryInfo, apisiteLotteryResult } from "@/apis/site";

export default {
  data() {
    return {
      // 元素樣式
      gameStyle: {
        cardFrontImgUrl: "/activity/redEnvelope/lucky--close1.png",
        cardBackImgUrl: "/activity/redEnvelope/lucky--open3.png",
        loadingImgUrl: "/activity/loading.svg",
      },
      // 紅包列表，抽獎前顯示
      prizeHolder: [
        {
          text: "Prize 1",
        },
        {
          text: "Prize 2",
        },
        {
          text: "Prize 3",
        },
        {
          text: "Prize 4",
        },
        {
          text: "Prize 5",
        },
        {
          text: "Prize 6",
        },
        {
          text: "Prize 7",
        },
        {
          text: "Prize 8",
        },
        {
          text: "Prize 9",
        },
        {
          text: "Prize 10",
        },
      ],
      // API回傳紅包獎項列表，抽獎後接露
      prizeList: [],

      gameChance: "",
      gamePrize: "",
      gameSelect: -1,

      activityImgUrl: "", //活動標題圖片，由抽獎表單取得
      billNo: "", // 活動單號，由抽獎表單取得，需夾帶給抽獎API

      isFirstTry: true,
      isGameEnable: false,
      isModalShow: true,
      // 錯誤訊息
      msgLibrary: {
        noChance: "機會已用完",
        apiError: "發生錯誤，請再試一次",
      },
      errMsg: "",
    };
  },
  mounted() {
    this.initHandler();
  },
  methods: {
    // 取得獎項列表
    initHandler() {
      return apiSiteLotteryInfo({ ActivityType: 1 })
        .then((res) => {
          if (res.data.RetObj) {
            const data = res.data.RetObj;

            this.gameChance = data.LotteryCount;
            this.billNo = data.BillNo;
            this.activityImgUrl = data.ActivityImageUrl;
            this.prizeList = this.randomPrizeList(data.prizesList);
            console.log("------START------");
          } else {
            this.errMsg = this.msgLibrary.noChance;
          }
        })
        .catch((err) => {
          this.errMsg = err;
        });
    },
    // 抽獎事件
    async lotteryHandler(item, index) {
      if (!this.isGameEnable) return;

      this.isGameEnable = false;
      this.gameSelect = index;
      this.$set(item, "selected", true);

      // 非首次開起遊戲時，重新取得獎項列表
      if (!this.isFirstTry) {
        await this.initHandler();
      }

      // call 抽獎 api 取得抽獎結果
      apisiteLotteryResult({
        ActivityType: 1,
        BillNo: this.billNo,
      })
        .then((res) => {
          this.gamePrize = res.data.RetObj;
          this.gameChance--;
          this.resultHandler();

          console.log("------FINISH------");
        })
        .catch((err) => {
          this.errMsg = err;
        });

      // 測試抽獎用
      // setTimeout(() => {
      //   this.gameChance--;
      //   this.gamePrize = this.prizeList[2];
      //   this.resultHandler();
      // }, 2000);
    },
    // 重設遊戲
    startHandler() {
      if (this.gameChance <= 0) return;

      this.gamePrize = "";
      this.gameSelect = -1;
      this.isModalShow = false;
      this.isGameEnable = true;

      this.prizeHolder.map((item) => {
        this.$set(item, "selected", false);
      });
    },
    // 抽獎結果顯示
    resultHandler() {
      // 將抽獎結果的圖片位置與點選的位置做交換
      let prizeIndex = this.prizeList.findIndex(
        (item) => item.Lst_PrizeKey == this.gamePrize.Lst_PrizeKey
      );
      let temp = this.prizeList[prizeIndex];
      this.prizeList[prizeIndex] = this.prizeList[this.gameSelect];
      this.prizeList[this.gameSelect] = temp;

      this.isFirstTry = false;
      // 彈跳獎項視窗
      setTimeout(() => {
        this.isModalShow = true;
      }, 2500);
    },

    // 因回傳的列表為固定位置，隨機化列表
    randomPrizeList(prizeList) {
      let resultLength = prizeList.length;
      let randomResult = [];

      while (resultLength--) {
        let j = Math.floor(Math.random() * (resultLength + 1));
        randomResult.push(prizeList[j]);
        prizeList.splice(j, 1);
      }

      return randomResult;
    },
  },
};
</script>

<style lang="scss">
// 圖片url
$envelope-container-bg: "/activity/redEnvelope/bg.jpg";
$envelope-loading: "/activity/redEnvelope/eclipse.svg";
$envelope-dialog: "/activity/redEnvelope/bg-winPrize.png";

.pageEnvelope {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 80px;
  background: url($envelope-container-bg) center no-repeat;
  background-size: contain;
  @media screen and (max-width: 600px) {
    background-size: cover;
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

  .text-test {
    position: absolute;
    top: 50%;
    font-size: 18px;
    padding-left: 10px;
  }
}

.redEnvelope {
  position: relative;
  text-align: center;
  padding: 150px 50px 50px 50px;
  width: 800px;
  @media screen and (max-width: 600px) {
    padding: 50px 0px 20px 0px;
  }
  &__title {
    img {
      display: inline-block;
    }
  }
  &__container {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }
  &__card {
    width: 120px;
    height: 140px;
    position: relative;
    background-color: transparent;
    perspective: 1000px;
    cursor: pointer;
    @media screen and (max-width: 600px) {
      width: 100px;
      height: 120px;
    }
    @for $i from 1 through 10 {
      &:nth-child(#{$i}) {
        .redEnvelope__card__inner::after {
          animation-delay: $i * 0.2s;
        }
      }
    }
    &.card-select {
      &:after {
        content: "";
        width: 50px;
        height: 50px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        background: url($envelope-loading) center no-repeat;
      }
      .redEnvelope__card__inner {
        transform: rotateY(-180deg);
      }
    }
    &-result {
      opacity: 0.5;
      &.card-result {
        animation: anim-card-result 1s linear;
        opacity: 1;
      }
      .redEnvelope__card__inner::after {
        display: none;
      }
    }
    &__inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.5s;
      transform-style: preserve-3d;
      &:after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 65%;
        height: 70%;
        border-radius: 20%;
        transform: rotateZ(15deg) translate(-65%, -40%);
        backface-visibility: hidden;
        animation: anim-card-glow 2s both linear infinite;
      }
    }
    &__front,
    &__back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }
    &__back {
      transform: rotateY(180deg);
    }
  }
  &__dialog {
    position: absolute;
    left: 50%;
    top: 50%;
    background: url($envelope-dialog) center no-repeat;
    background-size: contain;
    transform: translate(-50%, -60%);
    padding: 40px 50px;
    min-height: 100px;
    white-space: nowrap;
    &__title {
      font-size: 36px;
      color: #eee;
    }
    &__btn {
      font-size: 24px;
      letter-spacing: 2px;
      margin-top: 20px;
      margin-bottom: 20px;
      padding: 10px 20px;
      border-radius: 50px;
      line-height: 1;
      background: linear-gradient(
        0deg,
        rgba(246, 245, 167, 1) 0%,
        rgba(255, 253, 103, 1) 50%,
        rgba(246, 245, 167, 1) 100%
      );
      color: #d00402;
      cursor: pointer;
    }
  }
  &__errorMsg {
    color: #fff;
    font-size: 24px;
    letter-spacing: 2px;
  }
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