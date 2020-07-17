<template>
  <div>
    <HomeSwiper :list="swiperList"></HomeSwiper>
    <HomeGameBlock></HomeGameBlock>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getSwiperList } from '@/api/swiper';
export default {
  name: 'Home',
  components: {
    HomeSwiper: () => import('@/components/Y/home/HomeSwiper'),
    HomeGameBlock: () => import('@/components/Y/home/HomeGameBlock'),
  },
  computed: {
    ...mapGetters(['lang', 'token', 'siteID', 'siteCssClass', 'siteCssVersion', 'siteCssType', 'siteCssFestival']),
  },
  data() {
    return {
      swiperList: [],
    };
  },
  mounted() {
    const cssPath = `${this.siteCssClass}/${this.siteCssVersion}/${this.siteCssType}`;
    import(`@/styles/${cssPath}/home.scss`);
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }

        const requestData = {
          siteID: this.siteID,
          DeviceType: 1,
          lang: 'zh-cn',
          bNewPromotion: true,
        };

        // * 取得輪播列表
        getSwiperList(requestData).then(result => {
          if (result.Code == 200) {
            this.swiperList = result.RetObj;
            console.log('[Swiper]', this.swiperList);
          }
        });
      },
    },
  },
};
</script>
<style scoped></style>
