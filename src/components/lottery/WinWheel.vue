<template>
  <div class="pageWinwheel">
    <div class="vue-winwheel">
      <div class="vue-winWheel__title">
        <img
          :src="activityImgUrl"
          alt=""
        >
      </div>
      <div class="vue-winwheel__dialog vue-winwheel__dialog-chance">
        剩餘 {{ gameChance }} 次機會
      </div>
      <div class="vue-winwheel__wrapper">
        <canvas
          class="vue-winwheel__body"
          id="winwheel"
          :width="wheelStyle.width"
          :height="wheelStyle.height"
        >
          <p
            style="{color: white}"
            align="center"
          >Sorry, your browser doesn't support canvas. Please try Google Chrome.</p>
        </canvas>

        <div
          class="vue-winwheel__btn"
          :class="{loading: isWheelLoading}"
          @click.prevent="startHandler"
        >
          <img
            :src="wheelStyle.pointerImgUrl"
            alt=""
          >
        </div>
      </div>
      <transition name="modalTransition">
        <div
          class="vue-winwheel__dialog vue-winwheel__dialog-prize"
          v-show="isModalShow"
        >
          <div
            class="close"
            @click="isModalShow = false"
          ></div>
          <h2>
            恭喜獲得
          </h2>
          <h1> {{gamePrize.Lst_PrizeName}}</h1>
        </div>
      </transition>
      <div
        class="overlay"
        v-show="!wheelSegmentsPrize.length"
      >
        <p
          v-if="errMsg"
          class="vue-winwheel__errorMsg"
        >{{ errMsg }}</p>
        <img
          v-else
          :src="wheelStyle.loadingImgUrl"
          alt=""
        >
      </div>
    </div>
  </div>
</template>


<script>
// 引入轉盤套件
import { Winwheel } from "@/utils/winWheel";
// API
import { apiSiteLotteryInfo, apisiteLotteryResult } from "@/apis/site";

export default {
  data() {
    return {
      // 轉盤實例
      wheelObject: null,
      // 轉盤樣式
      wheelStyle: {
        width: 580,
        height: 580,
        prizeImgUrl: "/activity/winWheel/prize.png",
        pointerImgUrl: "/activity/winWheel/pointercn.png",
        loadingImgUrl: "/activity/loading.svg",
        wheelLodaingImgUrl: "/activity/wheel-loading.svg",
        wheelColor1: "#FFFFFF",
        wheelColor2: "#FFF4D6",
      },
      // 轉盤設定
      wheelOptions: {
        textFontSize: 18,
        outerRadius: 255, //外圓半徑
        innerRadius: 50, //內圓半徑(預設0)
        lineWidth: 0,
        drawMode: "segmentImage", // code: 以文字及style顯示, image: 背景圖片顯示, segmentImage: 每個欄位一張圖片
        segmentImageBackground: true, // 欄位圖片是否繪製背景色(fillStyle)
        // wheelImage: "/planes.png", // (選)背景圖片位置
        animation: {
          type: "spinToStop",
          duration: 2,
          spins: 5,
        },
      },
      // 轉盤內容，抽獎前顯示
      wheelSegments: [],
      // API回傳轉盤獎項列表，抽獎後接露
      wheelSegmentsPrize: [],
      // 保存選轉角度，做於揭露獎項後的旋轉位置
      wheelPrizeAngle: 0,

      gameChance: "",
      gamePrize: {},
      activityImgUrl: "", //活動標題圖片
      billNo: "", // 活動單號，由抽獎表單取得，需夾帶給抽獎API

      isFirstTry: true,
      isGameEnable: true,
      isWheelLoading: false,
      isWheelSpinning: false,
      isModalShow: false,

      // 錯誤訊息
      msgLibrary: {
        noChance: "機會已用完",
        apiError: "發生錯誤，請再試一次",
      },
      errMsg: "",
    };
  },
  beforeMount() {
    // 產出蓋牌轉盤列表
    for (let i = 0; i <= 11; i++) {
      let bgColor =
        i % 2 == 0 ? this.wheelStyle.wheelColor1 : this.wheelStyle.wheelColor2;
      let prizeText = "TestPrize" + (i + 1);
      this.wheelSegments.push({
        text: prizeText,
        image: this.wheelStyle.prizeImgUrl,
        fillStyle: bgColor,
      });
    }
  },
  mounted() {
    this.initHandler();
  },
  methods: {
    // 獲取轉盤資料，初始化遊戲
    initHandler() {
      this.initWheel();
      this.isWheelLoading = true;
      return apiSiteLotteryInfo({ ActivityType: 0 })
        .then((res) => {
          if (res.data.RetObj) {
            const data = res.data.RetObj;

            this.gameChance = data.LotteryCount;
            this.billNo = data.BillNo;
            this.activityImgUrl = data.ActivityImageUrl;
            this.isWheelLoading = false;

            data.prizesList.map((item, index) => {
              let bgColor =
                index % 2 == 0
                  ? this.wheelStyle.wheelColor1
                  : this.wheelStyle.wheelColor2;
              this.wheelSegmentsPrize[index] = {
                image: item.Lst_ImageUrl,
                text: item.Lst_PrizeName,
                Lst_PrizeKey: item.Lst_PrizeKey,
                fillStyle: bgColor,
              };
            });
          } else {
            this.errMsg = this.msgLibrary.noChance;
          }
        })
        .catch((err) => {
          this.errMsg = err;
        });
    },
    // 獲取中獎資料，啟動轉盤遊戲
    lotteryHandler() {
      console.log("[---抽獎----]");
      this.isWheelLoading = true;
      // 呼叫得獎API
      apisiteLotteryResult({
        ActivityType: 0,
        BillNo: this.billNo,
      })
        .then((res) => {
          this.gameChance--;
          this.gamePrize = res.data.RetObj;
          this.isWheelLoading = false;
          this.startWheel(this.gamePrize);
        })
        .catch((err) => {
          this.errMsg = err;
        });
      // 測試抽獎用;
      // setTimeout(() => {
      //   this.gameChance--;
      //   this.gamePrize = this.wheelSegmentsPrize[4];
      //   this.isWheelLoading = false;
      //   this.startWheel(this.gamePrize);
      // }, 2000);
    },
    // 遊戲開始
    async startHandler() {
      if (!this.isGameEnable || this.gameChance <= 0) return;
      this.isGameEnable = false;
      this.isModalShow = false;

      console.log("-------------------start---------------------");
      // 如果不是首次開啟，重新取得轉盤，再呼叫抽獎API
      if (!this.isFirstTry) {
        await this.initHandler();
        this.lotteryHandler();
      } else {
        this.isFirstTry = false;
        this.lotteryHandler();
      }
    },
    // 遊戲結束
    finishHandler(indicatedSegment) {
      this.revealWheel();
      this.isWheelSpinning = false;
      this.isModalShow = true;
      this.isGameEnable = true;
      console.log("-------------------end---------------------");
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
          if (prize.Lst_PrizeKey == item.Lst_PrizeKey) {
            prizeNumber = index + 1;
          }
        });

        let stopAt =
          (360 / this.wheelSegmentsPrize.length) * prizeNumber -
          360 / this.wheelSegmentsPrize.length / 2; // center pin

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
};
</script>

<style lang="scss">
$container-bg: "/activity/winWheel/container-bg.png";
$wheel-bg: "/activity/winWheel/wheel-bg.png";
$wheel-loading: "/activity/winWheel/wheel-loading.svg";

.pageWinwheel {
  margin-top: 80px;
  background: url($container-bg) center no-repeat;
  background-size: contain;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
.vue-winwheel {
  padding: 50px;
  position: relative;
  /* 轉盤背景 */
  &__body {
    margin-left: auto;
    margin-right: auto;
    background: url($wheel-bg) center no-repeat;
    background-size: cover;
  }
  /* 轉盤按鈕 */
  &__btn {
    cursor: pointer;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55%);
    &.loading {
      &:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 8%);
        background: url($wheel-loading) center no-repeat;
        background-size: cover;
        width: 120%;
        padding-bottom: 120%;
      }
    }
  }
  /* 對話框元件 */
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
      box-shadow: 0 0 10px 2px rgba(#000, 0.3);
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
        content: "";
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
  @media screen and (max-width: 600px) {
    padding: 20px;
  }
}

.vue-winwheel h1 {
  color: #850001;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 36px;
  line-height: 60px;
  letter-spacing: 1px;
  margin: 0;
}
.vue-winwheel h2 {
  margin: 0;
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

// 手機板
@media screen and (max-width: 600px) {
  #winwheel {
    width: 100%;
  }
  .pageWinwheel {
    background-size: cover;
  }
  .vue-winwheel__btn {
    width: 80px;
    transform: translate(-50%, -60%);
  }
}
</style>
