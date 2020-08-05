<template>
  <div class="home">
    <HomeSwiper :list="swiperList" :resourceUrl="resourceUrl" :siteIsNewPromotion="siteIsNewPromotion"></HomeSwiper>
    <HomeGameBlock :list="productList" :resourceUrl="resourceUrl" :isLoggedIn="isLoggedIn"></HomeGameBlock>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSwiperList } from '@/api/swiper';
import { getProductList } from '@/api/product';
export default {
  name: 'Home',
  components: {
    HomeSwiper: () => import('@/components/home/HomeSwiper'),
    HomeGameBlock: () => import('@/components/home/HomeGameBlock'),
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'siteID', 'siteFullCss', 'resourceUrl', 'siteIsNewPromotion']),
  },
  data() {
    return {
      swiperList: [],
      productList: [],
    };
  },
  mounted() {
    // * 取得遊戲館列表，因不需要 siteID 所以放這即可
    const requestDataProductList = {
      DeviceType: 1,
    };
    getProductList(requestDataProductList).then(result => {
      if (result.Code == 200) {
        this.productList = result.RetObj;
        console.log('[Product]', this.productList);
      }
    });
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
        const requestDataSwiperList = {
          DeviceType: 1,
          bNewPromotion: this.siteIsNewPromotion,
        };
        getSwiperList(requestDataSwiperList).then(result => {
          if (result.Code == 200) {
            this.swiperList = result.RetObj;
            console.log('[Swiper]', this.swiperList);
          }
        });
      },
    },
    lang() {
      // * 取得輪播列表
      const requestDataSwiperList = {
        DeviceType: 1,
        bNewPromotion: this.siteIsNewPromotion,
      };
      getSwiperList(requestDataSwiperList).then(result => {
        if (result.Code == 200) {
          this.swiperList = result.RetObj;
          console.log('[Swiper]', this.swiperList);
        }
      });
    },
  },
};
</script>
<style scoped>
.home {
  padding-bottom: 119px;
}
</style>
