<template>
  <div class="home">
    <component :is="HomeBanner" />

    <div class="home-main">
      <component :is="HomeLotteryGameBlock" v-if="userIsLoggedIn" />
      <component :is="HomeProductBlock" :list="productList" />
    </div>

    <ModalNoticeImage :isShow="isShowMainNotice" :image="siteMainPageNoticeUrl" @close="isShowMainNotice = false" />
    <!-- <ModalMessage :isShow="isShowModalMessage && !userIsLoggedIn" @close="isShowModalMessage = false" /> -->
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
    ]),
    HomeBanner() {
      return () => import(`@/${this.siteSetting.components.home.HomeBanner}`);
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
    };
  },
  mounted() {
    import(`@/styles/${this.siteFullCss}/home.scss`);

    //* 沒登入就顯示 MainNotice
    this.isShowMainNotice = this.siteIsShowMainNotice && !this.userIsLoggedIn;
  },
};
</script>
