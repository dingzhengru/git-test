<template>
  <div>
    <HomeSwiper :list="swiperList"></HomeSwiper>
    <HomeGameBlock :list="productList" :resourceUrl="resourceUrl" :token="token"></HomeGameBlock>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSwiperList } from '@/api/swiper';
import { getProductList } from '@/api/product';
export default {
  name: 'Home',
  components: {
    HomeSwiper: () => import('@/components/Y/home/HomeSwiper'),
    HomeGameBlock: () => import('@/components/Y/home/HomeGameBlock'),
  },
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteFullCss', 'resourceUrl']),
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
          bNewPromotion: true,
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
        bNewPromotion: true,
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
<style scoped></style>
