<template>
  <div id="app" :lang="lang" :class="lang">
    <div v-show="!loadingListIncludeSiteInfo">
      <component
        :is="AppHeader"
        @changeLang="changeLang"
        @logout="$store.dispatch('user/logout')"
        v-if="$route.meta.header != false"
      ></component>

      <component :is="AppHeaderSub" v-show="(!userIsLoggedIn && this.$route.name == 'Home') || userIsLoggedIn" />

      <div class="main">
        <router-view />
      </div>

      <component :is="AppFooter" :isLoggedIn="userIsLoggedIn" v-if="$route.meta.footer != false" />
    </div>

    <AppLoading v-show="loadingList.length > 0" />
    <ModalWinWheel :isShow="modalWinWheelIsShow" />
    <ModalRedEnvelope :isShow="modalRedEnvelopeIsShow" />

    <component :is="AppLotteryButtonBlock" v-show="siteIsActive && userIsLoggedIn" />
    <component :is="AppGoTopButton" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import langMixin from '@/mixins/lang';

export default {
  name: 'App',
  mixins: [langMixin],
  components: {
    AppLoading: () => import('@/components/AppLoading'),
    AppGoTopButton: () => import('@/components/AppGoTopButton'),
    ModalWinWheel: () => import('@/components/lottery/ModalWinWheel'),
    ModalRedEnvelope: () => import('@/components/lottery/ModalRedEnvelope'),
  },
  computed: {
    ...mapGetters([
      'lang',
      'loadingList',
      'loadingListIncludeSiteInfo',
      'modalWinWheelIsShow',
      'modalRedEnvelopeIsShow',
      'pwaInstallStatus',
      'pwaPrompt',
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
    ]),
    AppHeader() {
      return () => import(`@/${this.siteSetting.components.app.AppHeader}`);
    },
    AppHeaderSub() {
      return () => import(`@/${this.siteSetting.components.app.AppHeaderSub}`);
    },
    AppFooter() {
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
  },
  mounted() {
    console.log('[SiteFullCss]', this.siteFullCss);

    import(`@/styles/${this.siteFullCss}/_layout.scss`);
    import(`@/styles/${this.siteFullCss}/header.scss`);
    import(`@/styles/${this.siteFullCss}/footer.scss`);
    import(`@/styles/${this.siteFullCss}/pagination.scss`);

    //* 載入 manifest
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
    if (!this.siteIsActive && this.$route.name != 'Maintenance') {
      this.$router.replace({ name: 'Maintenance' });
      return;
    }

    //* 確認是否要顯示假電郵(未登入一律轉至假電郵登入頁)
    if (this.siteIsSpare === true && this.siteEnableSpareDomain === true && this.userIsLoggedIn === false) {
      this.$router.replace({ name: 'SignIn' });
      return;
    }

    //* PWA 一秒後沒觸發 beforeinstallprompt 的話，就視為已下載
    setTimeout(() => {
      if (this.pwaInstallStatus == null) {
        this.$store.commit('pwa/setStatus', 'installed');
      }
    }, 1000);

    //* PWA
    window.addEventListener('beforeinstallprompt', event => {
      console.log('beforeinstallprompt event');

      //* 能進來此事件代表: 未安裝 pwa
      this.$store.commit('pwa/setStatus', 'notInstalled');

      event.preventDefault();
      this.$store.commit('pwa/setPrompt', event);

      // pwa下載視窗的選擇處理
      this.pwaPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          this.$store.commit('pwa/setStatus', 'installing');

          //* 五秒後設為已下載，因目前無事件可以確認是否安裝完成
          setTimeout(() => {
            this.$store.commit('pwa/setStatus', 'installed');
          }, 5000);
        }
      });
    });
  },
  watch: {
    lang() {
      if (this.userIsLoggedIn) {
        this.$store.dispatch('user/getPointInfo');
      }

      this.$store.dispatch('product/getList');
    },
  },
};
</script>

<style></style>
