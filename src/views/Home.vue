<template>
  <div class="home" @click="isShowNoneLoginPopup = false">
    <HomeSwiper :list="swiperList" :resourceUrl="resourceUrl" :siteIsNewPromotion="siteIsNewPromotion" />

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
      <div :id="idMapper.home.noneLoginPopup" class="noneLoginPopup" v-if="isShowNoneLoginPopup"></div>
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSwiperList } from '@/api/swiper';
import { getProductList } from '@/api/product';
import { getGameRedirectUrl } from '@/api/game';
import { getMessageList } from '@/api/alert';
import { getLotteryCount } from '@/api/lottery';
import idMapper from '@/idMapper';
export default {
  name: 'Home',
  components: {
    HomeSwiper: () => import('@/components/home/HomeSwiper'),
    HomeGameBlock: () => import('@/components/home/HomeGameBlock'),
    HomeLotteryGameBlock: () => import('@/components/home/HomeLotteryGameBlock'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss', 'lang', 'isLoggedIn', 'resourceUrl', 'siteIsNewPromotion']),
  },
  data() {
    return {
      idMapper: idMapper,
      isShowNoneLoginPopup: false,
      isShowAlertBox: false,
      alertMessageList: [],
      swiperList: [],
      productList: [],
      lotteryList: [],
    };
  },
  mounted() {
    this.$store.commit('setIsLoading', false);
    //* 沒登入就顯示 NoneLoginPopup
    this.isShowNoneLoginPopup = !this.isLoggedIn;

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
    async getSwiperList() {
      const requestDataSwiperList = { bNewPromotion: this.siteIsNewPromotion };
      const result = await getSwiperList(requestDataSwiperList);
      if (result.Code == 200) {
        this.swiperList = result.RetObj;
        console.log('[Swiper]', this.swiperList);
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
          } else if (item.sGameID == '11902400-02') {
            item.id = idMapper.home.product.bbin;
          } else if (item.sGameID == '11902100-02') {
            item.id = idMapper.home.product.ds;
          } else if (item.sGameID == '11901030-01') {
            item.id = idMapper.home.product.liveGame;
          } else if (item.sGameID == '11902300-02') {
            item.id = idMapper.home.product.jdb;
          } else if (item.sGameID == '11902200-02') {
            item.id = idMapper.home.product.cq9;
          } else if (item.sGameID == '11901031-02') {
            item.id = idMapper.home.product.rgSlot;
          } else if (item.sGameID == '1190-04') {
            item.id = idMapper.home.product.rgLottery;
          } else if (item.sGameID == '11902602-02') {
            item.id = idMapper.home.product.mgplus;
          } else if (item.sGameID == '12203100-03') {
            item.id = idMapper.home.product.sbo;
          }
          return item;
        });

        console.log('[Product]', this.productList);
      }
    },
    async getLotteryList() {
      const result = await getLotteryCount();
      if (result.Code == 200) {
        this.lotteryList = result.RetObj;
      }
      console.log('[LotteryList]', result.RetObj);
    },
    async handleGameLink(game) {
      /*
       * Lst_Game_Classify 分類分別是
       * 1: 真人(站內大廳)，2: 電子(站內大廳)，3: 運動(站外大廳)，4: 皇家彩票(站外大廳)
       */

      if (game.Lst_Site_Product_Status != 0) {
        return;
      }

      if (game.GetGameRedirectUrl == false) {
        this.$router.push({
          name: 'GameLobby',
          params: { type: game.Lst_Game_Classify, id: game.Lst_Product_id, key: game.Lst_Proxy_Product_Key },
          query: { category: '' },
        });
      } else if (game.GetGameRedirectUrl == true) {
        const requestDataGameRedirectUrl = {
          Pid: game.Lst_Product_id,
          gameclassify: game.Lst_Game_Classify,
          proxypid: game.Lst_Proxy_Product_Key,
        };

        const result = await getGameRedirectUrl(requestDataGameRedirectUrl);
        console.log('[Game Redirect URL]', result.RetObj);

        if (result.Code == 200) {
          /**
           ** iGameOpenType: 判斷回傳內容類型
           ** 1: 一般URL，2: HTML
           */
          if (result.RetObj.iGameOpenType == 1) {
            window.open(result.RetObj.RedirectUrl);
          } else if (result.RetObj.iGameOpenType == 2) {
            const gameWindow = open('', game.Lst_Name);
            gameWindow.document.write(result.RetObj.RedirectUrl);
          }
        }
      }
    },
    openLotteryGame(lottery) {
      console.log('[OpenLotteryGame]', lottery);
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
        this.getSwiperList();

        // * 取得訊息列表(msgtype: C 彈出)
        this.getMessageList();

        //* 取得抽獎列表
        if (this.isLoggedIn) {
          this.getLotteryList();
        }
      },
    },
    lang() {
      // * 取得輪播列表
      this.getSwiperList();

      //* 取得遊戲館列表
      this.getProductList();

      // * 取得訊息列表(msgtype: C 彈出)
      this.getMessageList();
    },
  },
};
</script>
<style scoped>
.home {
  padding-bottom: 119px;
}
.noneLoginPopup {
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.8) url(imgs/main/Bg-noneLoginPopup.jpg) center center no-repeat; */
  position: fixed;
  top: 0;
  z-index: 5;
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
