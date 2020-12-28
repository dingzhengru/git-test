<template>
  <div class="home">
    <HomeBanner :list="bannerList" @open-banner="openBanner" />

    <div class="home-game">
      <HomeLotteryGameBlock :lotteryList="lotteryList" @openLotteryGame="openLotteryGame" v-if="userIsLoggedIn" />
      <HomeGameBlock :list="productList" />
    </div>

    <ModalMainNotice v-show="isShowMainNotice" @click.native="isShowMainNotice = false" />

    <ModalMessage
      :messageList="messageList"
      v-show="isShowModalMessage && messageList.length > 0 && !userIsLoggedIn"
      @close="isShowModalMessage = false"
    />

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
import { apiGetMessageList } from '@/api/message';
import { apiGetLotteryCount } from '@/api/lottery';

export default {
  name: 'Home',
  mixins: [mixinLotteryRedEnvelope, mixinLotteryWinWheel],
  components: {
    HomeBanner: () => import('@/components/home/HomeBanner'),
    HomeGameBlock: () => import('@/components/home/HomeGameBlock'),
    HomeLotteryGameBlock: () => import('@/components/home/HomeLotteryGameBlock'),
    AppModal: () => import('@/components/AppModal'),
    ModalMainNotice: () => import('@/components/ModalMainNotice'),
    ModalMessage: () => import('@/components/ModalMessage'),
    WinWheel: () => import('@/components/lottery/WinWheel'),
    RedEnvelope: () => import('@/components/lottery/RedEnvelope'),
  },
  computed: {
    ...mapGetters([
      'lang',
      'siteFullCss',
      'siteIsNewPromotion',
      'siteMainPageNoticeUrl',
      'siteIsShowMainNotice',
      'userIsLoggedIn',
    ]),
  },
  data() {
    return {
      isShowMainNotice: false,
      isShowModalMessage: true,
      messageList: [],
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
        this.messageList = result.RetObj;

        this.messageList = [
          {
            Lst_Content: '测试',
          },
          {
            Lst_Content: '测试2',
          },
        ];
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

.wheel-container {
  position: fixed;
  left: 5%;
  top: 15%;
  right: 5%;
  background-image: url('~@/assets/common/lottery/winWheel/container-bg.png');
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
  background-image: url('~@/assets/common/lottery/redEnvelope/bg.jpg');
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
