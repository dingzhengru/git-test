<template>
  <div class="home" @click="isShowMainNotice = false">
    <HomeBanner
      :list="bannerList"
      :siteResourceUrl="siteResourceUrl"
      :siteIsNewPromotion="siteIsNewPromotion"
      @open-banner="openBanner"
    />

    <div class="home-game">
      <HomeLotteryGameBlock :lotteryList="lotteryList" @openLotteryGame="openLotteryGame" v-if="userIsLoggedIn" />

      <HomeGameBlock
        :list="productList"
        :siteResourceUrl="siteResourceUrl"
        :isLoggedIn="userIsLoggedIn"
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

    <!-- <div class="ui-overlay" v-if="isShowWinWheel || isShowRedEnvelope" @click.self="closeLotteryGame"></div> -->
    <AppModal :isShow="isShowWinWheel" @close="closeWinWheel">
      <div class="wheel-container">
        <WinWheel
          :wheelStyle="wheelStyle"
          :wheelOptions="wheelOptions"
          :wheelSegmentsPrize="wheelSegmentsPrize"
          :gameChance="wheelGameChance"
          :gamePrize="wheelGamePrize"
          :isWheelLoading="isWinWheelLoading"
          :errMsg="wheelErrorMessage"
          @startHandler="startWheelHandler"
        >
          <template v-slot:game-chance>
            <div class="acticityWinwheel__title">
              {{ $t('home.lottery.winWheel.homeTitle', { count: wheelGameChance }) }}
            </div>
          </template>
          <template v-slot:game-dialog>
            <!-- <div class="acticityWinwheel__result">恭喜獲得</div> -->
            <div class="acticityWinwheel__prize">{{ wheelGamePrize.text }}</div>
          </template>
        </WinWheel>
      </div>
    </AppModal>

    <AppModal :isShow="isShowRedEnvelope" @close="closeRedEnvelope">
      <div class="red-envelope-container">
        <RedEnvelope
          :gameStyle="redEnvelopeStyle"
          :prizeList="redEnvelopePrizeList"
          :gameChance="redEnvelopeGameChance"
          :gamePrize="redEnvelopeGamePrize"
          :errMsg="redEnvelopeErrorMessage"
          @startHandler="initHandlerRedEnvelope"
          @selectHandler="selectRedEnvelopeHandler"
        >
          <template v-slot:game-result>
            <div class="acticityRedEnvelepe__result">
              {{ $t('home.lottery.redEnvelope.gameResult') }}
              <br />
              【 {{ redEnvelopeGamePrize.text }} 】
            </div>
          </template>
          <template v-slot:game-chance>
            <div class="acticityRedEnvelepe__chance">
              {{ $t('home.lottery.redEnvelope.startButton', { count: redEnvelopeGameChance }) }}
            </div>
          </template>
        </RedEnvelope>
      </div>
    </AppModal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import mixinLotteryRedEnvelope from '@/mixins/lotteryRedEnvelope';
import mixinLotteryWinWheel from '@/mixins/lotteryWinWheel';

import { apiGetBannerListOld, apiGetBannerList } from '@/api/banner';
import { apiGetProductList } from '@/api/product';
import { apiGetGameRedirectUrl } from '@/api/game';
import { apiGetMessageList } from '@/api/message';
import { apiGetLotteryCount /*apiPlayLottery, apiPlayLotteryResult*/ } from '@/api/lottery';
import { isIos, openNewWindowURL, openNewWindowHTML } from '@/utils/device';
import idMapper from '@/idMapper';

export default {
  name: 'Home',
  mixins: [mixinLotteryRedEnvelope, mixinLotteryWinWheel],
  components: {
    HomeBanner: () => import('@/components/home/HomeBanner'),
    HomeGameBlock: () => import('@/components/home/HomeGameBlock'),
    HomeLotteryGameBlock: () => import('@/components/home/HomeLotteryGameBlock'),
    AppModal: () => import('@/components/AppModal'),
    WinWheel: () => import('@/components/lottery/WinWheel'),
    RedEnvelope: () => import('@/components/lottery/RedEnvelope'),
  },
  computed: {
    ...mapGetters([
      'lang',
      'siteFullCss',
      'siteResourceUrl',
      'siteIsNewPromotion',
      'siteMainPageNoticeUrl',
      'siteIsShowMainNotice',
      'userIsLoggedIn',
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
    };
  },
  methods: {
    async getMessageList() {
      const requestDataMessageList = { msgtype: 'C' };
      const result = await apiGetMessageList(requestDataMessageList);
      if (result.Code == 200) {
        this.alertMessageList = result.RetObj;
      }
    },
    async getBannerList() {
      if (this.siteIsNewPromotion) {
        const result = await apiGetBannerList();
        if (result.Code == 200) {
          this.bannerList = result.RetObj;
        }
      } else {
        const result = await apiGetBannerListOld();
        if (result.Code == 200) {
          this.bannerList = result.RetObj;
        }
      }
    },
    async getProductList() {
      const result = await apiGetProductList();
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
      }
    },
    async getLotteryCountList() {
      const result = await apiGetLotteryCount();
      if (result.Code == 200) {
        this.lotteryList = result.RetObj;
      }
    },
    openBanner(banner) {
      const bannerType = this.userIsLoggedIn ? banner.Lst_Login_Type : banner.Lst_Nonelogin_Type;
      const bannerUrl = this.userIsLoggedIn ? banner.Lst_Login_Url : banner.Lst_Nonelogin_Url;

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
        window.alert(this.$t('alert.gameMaintenance'));
        return;
      }

      //* GetGameRedirectUrl，true: 外部連結
      if (game.GetGameRedirectUrl == false) {
        let gameLobby = 'GameLobbySlot';
        switch (game.Lst_Game_Classify) {
          case 1: {
            gameLobby = 'GameLobbyLive';
            break;
          }
          case 2: {
            gameLobby = 'GameLobbySlot';
            break;
          }
        }

        this.$router.push({
          name: gameLobby,
          params: {
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
        let newWindow = null;
        if (isIos()) {
          newWindow = window.open();
        }

        const result = await apiGetGameRedirectUrl(requestDataGameRedirectUrl);

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
  },
  mounted() {
    // * 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/home.scss`);

    //* 取得產品列表
    this.getProductList();

    // * 取得輪播列表
    this.getBannerList();

    // * 取得訊息列表(msgtype: C 彈出)
    this.getMessageList();

    //* 取得抽獎列表
    if (this.userIsLoggedIn) {
      this.getLotteryCountList();
    }

    //* 沒登入就顯示 MainNotice
    this.isShowMainNotice = this.siteIsShowMainNotice && !this.userIsLoggedIn;
  },
  watch: {
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
