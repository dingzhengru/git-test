<template>
  <div id="app" :lang="lang" :class="lang">
    <intersect
      @enter="$store.commit('setIsShowGoTopButton', false)"
      @leave="$store.commit('setIsShowGoTopButton', true)"
    >
      <div></div>
    </intersect>

    <div v-if="!loadingListIncludeSiteInfo">
      <template v-if="$route.meta.header !== false">
        <component :is="AppHeader" @changeLang="changeLang" @logout="$store.dispatch('user/logout')"></component>
        <component :is="AppHeaderSub" v-if="(!userIsLoggedIn && this.$route.name === 'Home') || userIsLoggedIn" />
      </template>

      <div class="main">
        <router-view />
      </div>

      <component :is="AppFooter" :isLoggedIn="userIsLoggedIn" v-if="$route.meta.footer !== false" />
    </div>

    <AppLoading v-show="loadingList.length > 0" />

    <div v-if="userIsLoggedIn">
      <ModalTransfer v-if="modalTransferIsShow" />
      <component :is="ModalWinWheel" v-if="modalWinWheelIsShow" />
      <component :is="ModalRedEnvelope" v-if="modalRedEnvelopeIsShow" />
    </div>

    <component :is="AppLotteryButtonBlock" v-show="siteIsActive && userIsLoggedIn" />
    <component :is="AppGoTopButton" v-show="isShowGoTopButton" />
    <ModalMessageSiteBlocked
      v-if="modalMessageSiteBlockedIsShow"
      @close="$store.commit('setModalMessageSiteBlockedIsShow', false)"
    />
    <ModalMessageApkDownload
      v-if="modalMessageApkDownloadIsShow"
      @close="$store.commit('setModalMessageApkDownloadIsShow', false)"
    />

    <component :is="ModalContact" v-if="modalContactIsShow" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinStyleLoader from '@/mixins/_styleLoader';
import mixinLang from '@/mixins/lang';
import mixinPwa from '@/mixins/pwa';
import Intersect from 'vue-intersect';

export default {
  name: 'App',
  mixins: [mixinStyleLoader, mixinLang, mixinPwa],
  components: {
    AppLoading: () => import('@/components/AppLoading'),
    AppGoTopButton: () => import('@/components/AppGoTopButton'),
    ModalTransfer: () => import('@/components/ModalTransfer'),
    // ModalWinWheel: () => import('@/components/lottery/ModalWinWheel'),
    // ModalRedEnvelope: () => import('@/components/lottery/ModalRedEnvelope'),
    ModalMessageSiteBlocked: () => import('@/components/ModalMessageSiteBlocked'),
    ModalMessageApkDownload: () => import('@/components/ModalMessageApkDownload'),
    Intersect,
  },
  computed: {
    ...mapGetters([
      'isLandscape',
      'lang',
      'loadingList',
      'loadingListIncludeSiteInfo',
      'modalTransferIsShow',
      'modalWinWheelIsShow',
      'modalRedEnvelopeIsShow',
      'modalMessageSiteBlockedIsShow',
      'modalMessageApkDownloadIsShow',
      'isShowGoTopButton',
      'siteSetting',
      'siteFullCss',
      'siteIsActive',
      'siteIsSpare',
      'siteEnableSpareDomain',
      'siteManifestUrl',
      'siteFaviconUrl',
      'siteAppIconUrl',
      'siteIOSUrl',
      'userIsLoggedIn',
      'siteNoticeLinkMain',
      'modalContactIsShow',
    ]),
    AppHeader() {
      return () => import(`@/${this.siteSetting.components.app.AppHeader}`);
    },
    AppHeaderSub() {
      if (!this.siteSetting.components.app.AppHeaderSub) {
        return '';
      }
      return () => import(`@/${this.siteSetting.components.app.AppHeaderSub}`);
    },
    AppFooter() {
      if (!this.siteSetting.components.app.AppFooter) {
        return '';
      }
      return () => import(`@/${this.siteSetting.components.app.AppFooter}`);
    },
    AppLotteryButtonBlock() {
      if (this.siteSetting.components.app.AppLotteryButtonBlock) {
        return () => import(`@/${this.siteSetting.components.app.AppLotteryButtonBlock}`);
      }
      return '';
    },
    AppGoTopButton() {
      if (this.siteSetting.components.app.AppGoTopButton) {
        return () => import(`@/${this.siteSetting.components.app.AppGoTopButton}`);
      }
      return '';
    },
    ModalWinWheel() {
      if (this.siteSetting.components.app.ModalWinWheel) {
        return () => import(`@/${this.siteSetting.components.app.ModalWinWheel}`);
      }
      return '';
    },
    ModalRedEnvelope() {
      if (this.siteSetting.components.app.ModalRedEnvelope) {
        return () => import(`@/${this.siteSetting.components.app.ModalRedEnvelope}`);
      }
      return '';
    },
    //* 橫版
    ModalContact() {
      if (this.siteSetting.components.app.ModalContact) {
        return () => import(`@/${this.siteSetting.components.app.ModalContact}`);
      }
      return '';
    },
  },
  mounted() {
    console.log('[SiteFullCss]', this.siteFullCss);

    if (this.isLandscape) {
      const viewport = document.querySelector('meta[name=viewport]');
      viewport.content = 'width=device-width';
      // document.querySelector('body').style.transform = 'rotate(90deg)';
    }

    // import(`@/styles/${this.siteFullCss}/_layout.scss`);
    // import(`@/styles/${this.siteFullCss}/header.scss`);
    // import(`@/styles/${this.siteFullCss}/footer.scss`);
    // import(`@/styles/${this.siteFullCss}/pagination.scss`);
    this.importStyleByFilename('_layout');
    this.importStyleByFilename('header');
    this.importStyleByFilename('footer');
    this.importStyleByFilename('pagination');

    //* 載入 manifest
    // document.querySelector('link[rel=manifest]').setAttribute('href', '/manifest01.json');
    document.querySelector('link[rel=manifest]').setAttribute('href', this.siteManifestUrl);

    //* 設置 Favicon
    document.querySelector('link[rel=icon]').setAttribute('href', this.siteFaviconUrl);

    //* 設置 IOS apple-mobile-web-app-title
    // document.querySelector('#apple-title').setAttribute('content', 'AppTitle');

    //* 設置 IOS apple-touch-icon
    document.querySelector('#apple-touch-icon').setAttribute('href', this.siteAppIconUrl('192x192'));

    //* 設置 IOS apple-touch-startup-image
    document.querySelector('#apple-startup-image-750x1334').setAttribute('href', this.siteIOSUrl('750x1334'));
    document.querySelector('#apple-startup-image-828x1792').setAttribute('href', this.siteIOSUrl('828x1792'));
    document.querySelector('#apple-startup-image-1125x2436').setAttribute('href', this.siteIOSUrl('1125x2436'));
    document.querySelector('#apple-startup-image-1242x2208').setAttribute('href', this.siteIOSUrl('1242x2208'));

    //* 確認是否維護
    if (!this.siteIsActive && this.$route.name !== 'Maintenance') {
      this.$router.replace({ name: 'Maintenance' });
      return;
    }

    //* 確認是否要顯示假電郵(未登入一律轉至假電郵登入頁)
    if (this.siteIsSpare === true && this.siteEnableSpareDomain === true && this.userIsLoggedIn === false) {
      this.$router.replace({ name: 'SignIn' });
      return;
    }

    //* PWA
    this.initPwa();
  },
  watch: {
    lang() {
      if (this.userIsLoggedIn) {
        this.$store.dispatch('user/getPointInfo');
      }

      const requestDataProductList = { Lang: this.lang };
      this.$store.dispatch('product/getList', requestDataProductList);

      const requestDataSeo = { Lang: this.lang };
      this.$store.dispatch('site/getSeoInfo', requestDataSeo);
    },
  },
};
</script>

<style></style>
