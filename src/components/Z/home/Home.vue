<template>
  <div class="home" :class="{ 'home-auth': userIsLoggedIn }">
    <component :is="HomeBanner" />
    <component :is="NewsMarquee" />
    <div class="home-main">
      <component :is="HomeProductNav" :classify="productClassifyCurrent" @change-product-nav="changeProductNav" />
      <component :is="HomeProductBlock" :list="productListByClassify(productClassifyCurrent)" />
    </div>

    <ModalNoticeImage :isShow="isShowMainNotice" :image="siteMainPageNoticeUrl" @close="isShowMainNotice = false" />
    <ModalMessage :isShow="isShowModalMessage && !userIsLoggedIn" @close="isShowModalMessage = false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {
    ModalNoticeImage: () => import('@/components/ModalNoticeImage'),
    ModalMessage: () => import('@/components/ModalMessage'),
  },
  computed: {
    ...mapGetters([
      'lang',
      'siteSetting',
      'siteFullCss',
      'siteMainPageNoticeUrl',
      'siteIsShowMainNotice',
      'userIsLoggedIn',
      'productList',
      'productListByClassify',
    ]),
    HomeBanner() {
      return () => import(`@/${this.siteSetting.components.home.HomeBanner}`);
    },
    NewsMarquee() {
      return () => import(`@/${this.siteSetting.components.home.NewsMarquee}`);
    },
    HomeProductNav() {
      return () => import(`@/${this.siteSetting.components.home.HomeProductNav}`);
    },
    HomeProductBlock() {
      return () => import(`@/${this.siteSetting.components.home.HomeProductBlock}`);
    },
    HomeLotteryGameBlock() {
      return () => import(`@/${this.siteSetting.components.home.HomeLotteryGameBlock}`);
    },
  },
  data() {
    return {
      isShowMainNotice: false,
      isShowModalMessage: true,
      productClassifyCurrent: 0,
    };
  },
  methods: {
    changeProductNav(classify) {
      this.productClassifyCurrent = classify;
    },
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/home.scss`);

    //* 沒登入就顯示 MainNotice
    this.isShowMainNotice = this.siteIsShowMainNotice && !this.userIsLoggedIn;
  },
};
</script>
