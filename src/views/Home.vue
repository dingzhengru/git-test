<template>
  <div class="home" @click="isShowNoneLoginPopup = false">
    <HomeSwiper :list="swiperList" :resourceUrl="resourceUrl" :siteIsNewPromotion="siteIsNewPromotion"></HomeSwiper>
    <HomeGameBlock
      :list="productList"
      :resourceUrl="resourceUrl"
      :isLoggedIn="isLoggedIn"
      @clickGameLink="clickGameLink"
    ></HomeGameBlock>
    <transition name="fade">
      <div id="noneLoginPopup" class="noneLoginPopup" v-if="isShowNoneLoginPopup"></div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSwiperList } from '@/api/swiper';
import { getProductList } from '@/api/product';
import { getGameUrl } from '@/api/game';
export default {
  name: 'Home',
  components: {
    HomeSwiper: () => import('@/components/home/HomeSwiper'),
    HomeGameBlock: () => import('@/components/home/HomeGameBlock'),
  },
  computed: {
    ...mapGetters(['siteID', 'siteFullCss', 'lang', 'isLoggedIn', 'resourceUrl', 'siteIsNewPromotion']),
  },
  data() {
    return {
      isShowNoneLoginPopup: false,
      swiperList: [],
      productList: [],
    };
  },
  mounted() {
    if (this.isLoggedIn) {
      this.isShowNoneLoginPopup = false;
    } else {
      this.isShowNoneLoginPopup = true;
    }

    //* 取得遊戲館列表，因不需要 siteID 所以放這即可
    this.getProductList();
  },
  methods: {
    getProductList() {
      const requestDataProductList = { DeviceType: 1 };
      getProductList(requestDataProductList).then(result => {
        if (result.Code == 200) {
          this.productList = result.RetObj;

          /* 設置 ID */
          this.productList = this.productList.map(item => {
            if (item.sGameID == '1080') {
              item.id = 'SABA';
            } else if (item.sGameID == '11902400-02') {
              item.id = 'BBIN';
            } else if (item.sGameID == '11902100-02') {
              item.id = 'DS';
            } else if (item.sGameID == '11901030-01') {
              item.id = 'liveGame';
            } else if (item.sGameID == '11902300-02') {
              item.id = 'JDB';
            } else if (item.sGameID == '11902200-02') {
              item.id = 'CQ9';
            } else if (item.sGameID == '11901031-02') {
              item.id = 'RGSlot';
            } else if (item.sGameID == '1190-04') {
              item.id = 'RGLottery';
            } else if (item.sGameID == '11902602-02') {
              item.id = 'MGPlus';
            } else if (item.sGameID == '12203100-03') {
              item.id = 'SBO';
            }
            return item;
          });

          console.log('[Product]', this.productList);
        }
      });
    },
    getSwiperList() {
      const requestDataSwiperList = { bNewPromotion: this.siteIsNewPromotion };
      getSwiperList(requestDataSwiperList).then(result => {
        if (result.Code == 200) {
          this.swiperList = result.RetObj;
          console.log('[Swiper]', this.swiperList);
        }
      });
    },
    clickGameLink(game) {
      console.log('[Game Click]', game);
      const requestDataGetGameUrl = {
        Tag: game.Lst_Product_Proxy_Tag,
        Gameid: game.sGameID,
        Freeplay: '0',
      };

      console.log('[Game RequestData]',requestDataGetGameUrl)

      getGameUrl(requestDataGetGameUrl).then(result => {
        console.log('[Game URL]', result);
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
        this.getSwiperList();
      },
    },
    lang() {
      // * 取得輪播列表
      this.getSwiperList();

      //* 取得遊戲館列表
      this.getProductList();
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
