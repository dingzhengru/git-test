<template>
  <div class="home" @click="isShowMainNotice = false">
    <HomeSwiper
      :list="bannerList"
      :resourceUrl="resourceUrl"
      :siteIsNewPromotion="siteIsNewPromotion"
      @open-banner="openBanner"
    />

    <div class="home-game">
      <HomeLotteryGameBlock :lotteryList="lotteryList" @openLotteryGame="openLotteryGame" v-if="isLoggedIn" />

      <HomeGameBlock
        :list="productList"
        :resourceUrl="resourceUrl"
        :isLoggedIn="isLoggedIn"
        @handleGameLink="handleGameLink"
      />
    </div>
    <transition name="fade">
      <div
        :id="idMapper.home.MainNotice"
        class="main-notice"
        :style="{ 'background-image': `url(${siteMainPageNoticeUrl})` }"
        v-if="isShowMainNotice"
      ></div>
    </transition>

    <div class="Box" v-if="isShowAlertBox && alertMessageList.length > 0">
      <div class="Boxinner">
        <h1 class="h1-tit">
          <p v-for="(message, index) in alertMessageList" :key="index">
            {{ message.Lst_Content }}
          </p>
        </h1>
        <button class="lnk-boxSubmit" @click="isShowAlertBox = false">OK</button>
      </div>
    </div>

    <div class="ui-overlay" v-if="isShowWinWheel || isShowRedEnvelope" @click.self="closeLotteryGame"></div>
    <div class="wheel-container" v-show="isShowWinWheel">
      <!-- <div class="ui-box-close"  @click="closeLotteryGame"></div> -->
      <WinWheel
        :wheelStyle="wheelStyle"
        :wheelOptions="wheelOptions"
        :wheelSegmentsPrize="wheelSegmentsPrize"
        :gameChance="gameChance"
        :gamePrize="gamePrize"
        :isWheelLoading="isWheelLoading"
        :errMsg="lotteryErrorMessage"
        @startHandler="startHandlerWheel"
      >
        <template v-slot:game-chance>
          <div class="acticityWinwheel__title">
            {{ $t('home.lottery.winWheel.homeTitle', { count: gameChance }) }}
          </div>
        </template>
        <template v-slot:game-dialog>
          <!-- <div class="acticityWinwheel__result">恭喜獲得</div> -->
          <div class="acticityWinwheel__prize">{{ gamePrize.text }}</div>
        </template>
      </WinWheel>
    </div>

    <div class="red-envelope-container" v-show="isShowRedEnvelope">
      <RedEnvelope
        :gameStyle="redEnvelopeStyle"
        :prizeList="redEnvelopePrizeList"
        :gameChance="gameChance"
        :gamePrize="gamePrize"
        :errMsg="lotteryErrorMessage"
        @startHandler="startHandlerRedEnvelope"
        @selectHandeler="lotteryHandlerRedEnvelope"
      >
        <template v-slot:game-result>
          <div class="acticityRedEnvelepe__result">
            {{ $t('home.lottery.redEnvelope.gameResult') }}
            <br />
            【 {{ gamePrize.text }} 】
          </div>
        </template>
        <template v-slot:game-chance>
          <div class="acticityRedEnvelepe__chance">
            {{ $t('home.lottery.redEnvelope.startButton', { count: gameChance }) }}
          </div>
        </template>
      </RedEnvelope>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getBannerListOld, getBannerList } from '@/api/banner';
import { getProductList } from '@/api/product';
import { getGameRedirectUrl } from '@/api/game';
import { getMessageList } from '@/api/alert';
import { getLotteryCount, playLottery, playLotteryResult } from '@/api/lottery';
import { isIos, openNewWindowURL, openNewWindowHTML } from '@/utils/device';
import idMapper from '@/idMapper';

//* 轉盤遊戲的圖片
import lotteryLoadingImage from '@/assets/common/imgs/lottery/loading.svg';
// import wheelContainerBackgroundImage from '@/assets/common/imgs/lottery/winWheel/container-bg.png';
import wheelPrizeImage from '@/assets/common/imgs/lottery/winWheel/prize.png';
import wheelPointerImage from '@/assets/common/imgs/lottery/winWheel/pointercn.png';
import wheelLodaingImage from '@/assets/common/imgs/lottery/winWheel/wheel-loading.svg';
import wheelBackgroundImage from '@/assets/common/imgs/lottery/winWheel/wheel-bg.png';

//* 紅包遊戲的圖片
import cardFrontImgage from '@/assets/common/imgs/lottery/redEnvelope/lucky--close1.png';
import cardBackImgage from '@/assets/common/imgs/lottery/redEnvelope/lucky--open3.png';
import dialogImgage from '@/assets/common/imgs/lottery/redEnvelope/bg-winPrize.png';
import envelopeLoadingImgage from '@/assets/common/imgs/lottery/redEnvelope/eclipse.svg';

export default {
  name: 'Home',
  components: {
    HomeSwiper: () => import('@/components/home/HomeSwiper'),
    HomeGameBlock: () => import('@/components/home/HomeGameBlock'),
    HomeLotteryGameBlock: () => import('@/components/home/HomeLotteryGameBlock'),
    WinWheel: () => import('@/components/lottery/WinWheel'),
    RedEnvelope: () => import('@/components/lottery/RedEnvelope'),
  },
  computed: {
    ...mapGetters([
      'siteID',
      'siteFullCss',
      'lang',
      'isLoggedIn',
      'resourceUrl',
      'siteIsNewPromotion',
      'siteMainPageNoticeUrl',
      'siteIsShowMainNotice',
    ]),
  },
  data() {
    return {
      idMapper: idMapper,
      isShowMainNotice: false,
      isShowAlertBox: false,
      alertMessageList: [],
      bannerList: [],
      productList: [],
      lotteryList: [],

      isShowWinWheel: false,
      isShowRedEnvelope: false,

      //* 轉盤樣式
      wheelStyle: {
        width: 580, //轉盤寬度
        height: 580, //轉盤高度
        loadingImgUrl: lotteryLoadingImage, //遊戲loading
        activityImgUrl: '', //(獎項表單API)活動標題圖片
        prizeImgUrl: wheelPrizeImage, //禮物
        pointerImgUrl: wheelPointerImage, //開始抽獎按鈕
        wheelLodaingImgUrl: wheelLodaingImage, //轉盤loading
        wheelBackgroundImgUrl: wheelBackgroundImage, //轉盤背景
        wheelColor1: '#FFFFFF', //轉盤顏色1
        wheelColor2: '#FFF4D6', //轉盤顏色2
      },
      //* 轉盤設定
      wheelOptions: {
        textFontSize: 18,
        outerRadius: 255, //外圓半徑
        innerRadius: 0, //內圓半徑(預設0)
        lineWidth: 0,
        drawMode: 'segmentImage', // code: 以文字及style顯示, image: 背景圖片顯示, segmentImage: 每個欄位一張圖片
        segmentImageBackground: true, // 欄位圖片是否繪製背景色(fillStyle)
        // wheelImage: "/planes.png", // (選)背景圖片位置
        animation: {
          type: 'spinToStop',
          duration: 2,
          spins: 5,
        },
      },
      wheelSegmentsPrize: [], // (獎項列表API)獎項列表，抽獎後接露
      isWheelLoading: false, //控制抽獎 loading 動畫

      //* 紅包
      redEnvelopeStyle: {
        loadingImgUrl: lotteryLoadingImage, //遊戲loading
        activityImgUrl: '', //(獎項列表API)活動標題圖片
        cardFrontImgUrl: cardFrontImgage, //翻牌前
        cardBackImgUrl: cardBackImgage, //翻牌後
        dialogImgUrl: dialogImgage, //彈跳視窗背景
        envelopeLoadingImgUrl: envelopeLoadingImgage, //紅包loading
      },
      redEnvelopePrizeList: [],

      billNo: '', // (獎項列表API)活動單號，需夾帶給抽獎API
      gameChance: '', //(抽獎API)剩餘抽獎次數
      gamePrize: '', //(抽獎API)回傳獎項

      lotteryErrorMessage: '',
    };
  },
  mounted() {
    //* 取得遊戲館列表，因不需要 siteID 所以放這即可
    this.getProductList();
  },
  methods: {
    async getMessageList() {
      const requestDataMessageList = { msgtype: 'C' };
      const result = await getMessageList(requestDataMessageList);
      if (result.Code == 200) {
        this.alertMessageList = result.RetObj;
        console.log('[Message]', this.alertMessageList);
      }
    },
    async getBannerList() {
      if (this.siteIsNewPromotion) {
        const result = await getBannerList();
        if (result.Code == 200) {
          this.bannerList = result.RetObj;
          console.log('[BannerList]', this.bannerList);
        }
      } else {
        const result = await getBannerListOld();
        if (result.Code == 200) {
          this.bannerList = result.RetObj;
          console.log('[BannerList]', this.bannerList);
        }
      }
    },
    async getProductList() {
      const requestDataProductList = { DeviceType: 1 };
      const result = await getProductList(requestDataProductList);
      if (result.Code == 200) {
        this.productList = result.RetObj;

        /* 設置 ID */
        this.productList = this.productList.map(item => {
          if (item.sGameID == '1080') {
            item.id = idMapper.home.product.saba;
          } else if (item.sGameID == '11902400-02' || item.sGameID == '1270') {
            item.id = idMapper.home.product.bbin;
          } else if (item.sGameID == '11902100-02' || item.sGameID == '1240') {
            item.id = idMapper.home.product.ds;
          } else if (item.sGameID == '11901030-01' || item.sGameID == '1230') {
            item.id = idMapper.home.product.liveGame;
          } else if (item.sGameID == '11902300-02' || item.sGameID == '1260') {
            item.id = idMapper.home.product.jdb;
          } else if (item.sGameID == '11902200-02' || item.sGameID == '1250') {
            item.id = idMapper.home.product.cq9;
          } else if (item.sGameID == '11901031-02') {
            item.id = idMapper.home.product.rgSlot;
          } else if (item.sGameID == '1190-04' || item.sGameID == '1290') {
            item.id = idMapper.home.product.rgLottery;
          } else if (item.sGameID == '11902602-02' || item.sGameID == '1280') {
            item.id = idMapper.home.product.mgplus;
          } else if (item.sGameID == '12203100-03' || item.sGameID == '1220') {
            item.id = idMapper.home.product.sbo;
          } else if (item.sGameID == '1300') {
            item.id = idMapper.home.product.png;
          }
          return item;
        });

        console.log('[Product]', this.productList);
      }
    },
    async getLotteryCountList() {
      const result = await getLotteryCount();
      if (result.Code == 200) {
        this.lotteryList = result.RetObj;
      }
      console.log('[LotteryList]', result.RetObj);
    },
    openBanner(banner) {
      console.log('[BannerOpen]', banner);

      const bannerType = this.isLoggedIn ? banner.Lst_Login_Type : banner.Lst_Nonelogin_Type;
      const bannerUrl = this.isLoggedIn ? banner.Lst_Login_Url : banner.Lst_Nonelogin_Url;

      if (bannerType == 1) {
        window.open(banner.Lst_LinkUrl, banner.Lst_Target);
      } else if (bannerType == 2 || bannerType == 0) {
        if (bannerUrl > 0) {
          this.$router.push({
            name: 'PromotionDetail',
            params: { id: bannerUrl },
          });
        } else {
          this.$router.push({ name: 'Promotion' });
        }
      }
    },
    async handleGameLink(game) {
      /*
       * Lst_Game_Classify 分類分別是
       * 1: 真人(站內大廳)，2: 電子(站內大廳)，3: 運動(站外大廳)，4: 皇家彩票(站外大廳)
       */

      if (game.Lst_Site_Product_Status != 0) {
        window.alert(this.$t('game.alert.maintenance'));
        return;
      }

      if (game.GetGameRedirectUrl == false) {
        this.$router.push({
          name: 'GameLobby',
          params: {
            type: game.Lst_Game_Classify,
            id: game.Lst_Product_id,
            key: game.Lst_Proxy_Product_Key,
          },
          query: { category: '' },
        });
      } else if (game.GetGameRedirectUrl == true) {
        const requestDataGameRedirectUrl = {
          Pid: game.Lst_Product_id,
          gameclassify: game.Lst_Game_Classify,
          proxypid: game.Lst_Proxy_Product_Key,
        };

        //* 因 IOS 預設會擋非同步後開啟的視窗，所以需於送出請求前打開
        let newWindow;
        if (isIos()) {
          newWindow = window.open();
        }

        const result = await getGameRedirectUrl(requestDataGameRedirectUrl);
        console.log('[Game Redirect URL]', result.RetObj);

        if (result.Code == 200) {
          //* iGameOpenType: 判斷回傳內容類型，1: 一般URL，2: HTML

          if (result.RetObj.iGameOpenType == 1) {
            openNewWindowURL(newWindow, result.RetObj.RedirectUrl);
          } else if (result.RetObj.iGameOpenType == 2) {
            openNewWindowHTML(newWindow, result.RetObj.RedirectUrl, game.Lst_Name);
          }
        } else {
          if (newWindow != null) {
            newWindow.close();
          }
          window.setTimeout(() => window.alert(result.ErrMsg), 500);
        }
      }
    },
    closeLotteryGame() {
      this.isShowWinWheel = false;
      this.isShowRedEnvelope = false;
      this.billNo = '';
      this.gameChance = '';
      this.gamePrize = '';
      console.log('[CloseLotteryGame]', this.billNo, this.gameChance, this.gamePrize);
    },
    endLotteryGame() {
      //* 結束遊戲後，要執行的程式

      //* 更新取得抽獎次數列表來更新首頁
      this.getLotteryCountList();

      //* 更新用戶點數
      this.$store.dispatch('user/getInfo');
    },
    async openLotteryGame(lottery) {
      console.log('[OpenLotteryGame]', lottery);

      if (lottery.Type == 0) {
        console.log('[InitWheel]');
        this.initHandlerWheel();
      } else if (lottery.Type == 1) {
        console.log('[InitRedEnvelope]');
        this.initHandlerRedEnvelope();
      }
    },
    // 遊戲開始(轉盤)
    async startHandlerWheel() {
      await this.initHandlerWheel();
      this.lotteryHandlerWheel();
    },
    // 獲取轉盤資料，初始化遊戲
    initHandlerWheel() {
      this.billNo = '';
      this.gameChance = '';
      this.gamePrize = '';
      this.isWheelLoading = true;
      return playLottery({ ActivityType: 0 })
        .then(res => {
          if (res.RetObj) {
            console.log('[PlayLottery]', res);

            const data = res.RetObj;

            this.gameChance = data.LotteryCount;
            this.billNo = data.BillNo;
            this.wheelStyle.activityImgUrl = data.ActivityImageUrl;
            this.isWheelLoading = false;

            let prizeApiList = [];

            data.prizesList.map((item, index) => {
              let bgColor = index % 2 == 0 ? this.wheelStyle.wheelColor1 : this.wheelStyle.wheelColor2;
              prizeApiList[index] = {
                image: item.Lst_ImageUrl,
                text: item.Lst_PrizeName,
                key: item.Lst_PrizeKey,
                fillStyle: bgColor,
              };
            });
            this.wheelSegmentsPrize = prizeApiList;

            //* 顯示
            this.isShowWinWheel = true;

            console.log(this.wheelSegmentsPrize);
          } else {
            this.lotteryErrorMessage = this.msgLibrary.noChance;
          }
        })
        .catch(err => {
          console.log('[initHandlerWheel Error]', err);
          this.lotteryErrorMessage = err;
        });
    },
    // 獲取中獎資料，啟動轉盤遊戲
    lotteryHandlerWheel() {
      this.isWheelLoading = true;
      // 呼叫得獎API
      playLotteryResult({ ActivityType: 0, BillNo: this.billNo })
        .then(res => {
          console.log('[PlayLotteryResult]', res);

          this.gamePrize = {
            text: res.RetObj.Lst_PrizeName,
            key: res.RetObj.Lst_PrizeKey,
          };
          this.gameChance--;
          this.isWheelLoading = false;

          this.endLotteryGame();
        })
        .catch(err => {
          this.lotteryErrorMessage = err;
        });
    },
    startHandlerRedEnvelope() {
      this.gamePrize = '';
    },
    // 取得獎項列表
    initHandlerRedEnvelope() {
      this.billNo = '';
      this.gameChance = '';
      this.gamePrize = '';
      return playLottery({ ActivityType: 1 })
        .then(res => {
          console.log('[PlayLottery]', res);
          if (res.RetObj) {
            const data = res.RetObj;

            this.gameChance = data.LotteryCount;
            this.billNo = data.BillNo;
            this.redEnvelopeStyle.activityImgUrl = data.ActivityImageUrl;

            let list = [];
            data.prizesList.map((item, index) => {
              list[index] = {
                image: item.Lst_ImageUrl,
                text: item.Lst_PrizeName,
                key: item.Lst_PrizeKey,
              };
            });

            this.redEnvelopePrizeList = list;
            this.isShowRedEnvelope = true;
          } else {
            this.lotteryErrorMessage = this.msgLibrary.noChance;
          }
        })
        .catch(err => {
          this.lotteryErrorMessage = err;
        });
    },
    // 抽獎事件
    async lotteryHandlerRedEnvelope() {
      await this.initHandlerRedEnvelope();
      // call 抽獎 api 取得抽獎結果
      playLotteryResult({ ActivityType: 1, BillNo: this.billNo })
        .then(res => {
          console.log('[PlayLotteryResult]', res);
          this.gamePrize = {
            text: res.RetObj.Lst_PrizeName,
            key: res.RetObj.Lst_PrizeKey,
          };
          this.gameChance--;

          this.endLotteryGame();
        })
        .catch(err => {
          this.lotteryErrorMessage = err;
        });
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/home.scss`);

        // * 取得輪播列表
        this.getBannerList();

        // * 取得訊息列表(msgtype: C 彈出)
        this.getMessageList();

        //* 取得抽獎列表
        if (this.isLoggedIn) {
          this.getLotteryCountList();
        }

        //* 沒登入就顯示 MainNotice
        this.isShowMainNotice = this.siteIsShowMainNotice && !this.isLoggedIn;
      },
    },
    lang() {
      // * 取得輪播列表
      this.getBannerList();

      //* 取得遊戲館列表
      this.getProductList();

      // * 取得訊息列表(msgtype: C 彈出)
      this.getMessageList();
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding-bottom: 119px;
}

.main-notice {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.8);
  background-repeat: no-repeat;
  background-position: center;
  z-index: 5;
}

.wheel-container {
  position: fixed;
  left: 5%;
  top: 15%;
  right: 5%;
  background-image: url('~@/assets/common/imgs/lottery/winWheel/container-bg.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #860103;
  background-position: center;
  z-index: 9999;
}

.acticityWinwheel__title {
  color: black;
  font-size: 2rem;
}

.acticityWinwheel__result {
  color: red;
  font-size: 3rem;
}

.acticityWinwheel__prize {
  color: black;
  font-size: 3rem;
}

.red-envelope-container {
  position: fixed;
  height: 50%;
  /* width: 50%; */
  left: 5%;
  top: 20%;
  right: 5%;
  background-image: url('~@/assets/common/imgs/lottery/redEnvelope/bg.jpg');
  background-repeat: no-repeat;
  background-size: contain;
  background-color: #860103;
  background-position: center;
  z-index: 9999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
