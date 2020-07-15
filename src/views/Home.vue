<template>
  <div>
    <HomeSwiper></HomeSwiper>
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
    ...mapGetters(['lang', 'templateType', 'templateVersion', 'templateVersionNumber']),
  },
  data() {
    return {};
  },
  mounted() {
    const templatePath = `${this.templateType}/${this.templateVersion}/${this.templateVersionNumber}`;
    // import(`@/styles/${this.templateType}/common/home.css`);
    import(`@/styles/${templatePath}/home.scss`);

    const siteID = 'C';
    const requestData = { siteID };
    
    // * 取得輪播列表
    getSwiperList(requestData).then(result => {
      if (result.Code == 200) {
        this.swiperList = result.RetObj;
        console.log(this.swiperList);
      }
    });
  },
};
</script>
<style scoped></style>
