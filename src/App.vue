<template>
  <div id="app" :class="lang">
    <div v-show="loadingRequestList.length == 0">
      <AppHeader
        :siteStatus="siteStatus"
        :isLoggedIn="isLoggedIn"
        :langList="langList"
        :lang="lang"
        :logo="logo"
        :username="username"
        :totalBalance="totalBalance"
        :PILevel="PILevel"
        :PIBetAmount="PIBetAmount"
        :backIconRouteList="['PromotionDetail']"
        @changeLang="changeLang"
        @logout="logout"
        v-if="isShowHeader"
      ></AppHeader>

      <div class="main">
        <router-view />
      </div>

      <AppFooter :isLoggedIn="isLoggedIn" v-if="isShowFooter" />
    </div>

    <AppLoadingOverlay :isLoading="loadingRequestList.length > 0" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getLangList } from '@/api/lang';

import { NO_HEADER_ROUTE_LIST, NO_FOOTER_ROUTE_LIST } from '@/settings';

import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import AppLoadingOverlay from '@/components/AppLoadingOverlay';

import { getManifestUrl } from '@/api/manifest';

import langMixin from '@/mixins/lang';

export default {
  name: 'App',
  mixins: [langMixin],
  components: {
    AppHeader,
    AppFooter,
    AppLoadingOverlay,
  },
  computed: {
    ...mapGetters([
      'lang',
      'langList',
      'loadingRequestList',
      'siteFullCss',
      'siteLogoUrl',
      'siteAppIcon',
      'siteIOSUrl',
      'pwaInstallStatus',
      'pwaPrompt',
      'siteStatus',
      'isLoggedIn',
      'totalBalance',
      'username',
      'PILevel',
      'PIBetAmount',
      'resourceUrl',
      'siteIsSpare',
      'siteEnableSpareDomain',
    ]),
    isShowHeader() {
      return !NO_HEADER_ROUTE_LIST.includes(this.$route.name);
    },
    isShowFooter() {
      if (NO_FOOTER_ROUTE_LIST.includes(this.$route.name) || this.siteStatus != 0) {
        return false;
      }
      return true;
    },
  },
  mounted() {
    console.log('[SiteFullCss]', this.siteFullCss);

    //* 根據版型引入 css
    import(`@/styles/${this.siteFullCss}/layout.scss`);

    //* header css
    import(`@/styles/${this.siteFullCss}/header.scss`);

    //* footer css
    import(`@/styles/${this.siteFullCss}/footer.scss`);

    const faviconUrl = `${this.resourceUrl}/imgs/favicon/favicon.ico`;
    document.querySelector('#favicon').setAttribute('href', faviconUrl);

    //* Manifest
    //* 動態載入 manifest，已將 public/index.html 中新增 <link rel="manifest" id="manifest" />
    document.querySelector('#manifest').setAttribute('href', getManifestUrl());

    //* 使用 siteInfo 拼湊 logo url
    //* EX: http://resource.re888show.com/Site_Uploadfile/C/Logo_0.png
    this.logo = this.siteLogoUrl;
    // this.logo = `${this.resourceUrl}/imgs/header/logo.png`;
    // this.logo = `${this.siteRemoteCSSUrl}/Site_Uploadfile/${this.siteID}/Logo_0.png`;

    //* 設置 IOS apple-mobile-web-app-title
    // document.querySelector('#apple-title').setAttribute('content', 'AppTitle');

    //* 設置 IOS apple-touch-icon
    document.querySelector('#apple-touch-icon').setAttribute('href', this.siteAppIcon('192x192'));

    //* 設置 IOS apple-touch-startup-image
    document.querySelector('#apple-startup-image-750x1344').setAttribute('href', this.siteIOSUrl('750x1344'));
    document.querySelector('#apple-startup-image-828x1792').setAttribute('href', this.siteIOSUrl('828x1792'));
    document.querySelector('#apple-startup-image-1125x2436').setAttribute('href', this.siteIOSUrl('1125x2436'));
    document.querySelector('#apple-startup-image-1242x2208').setAttribute('href', this.siteIOSUrl('1242x2208'));

    //* 確認是否維護
    if (this.siteStatus != 0 && this.$route.name != 'Maintenance') {
      this.$router.replace({ name: 'Maintenance' });
      return;
    }

    //* 確認是否要顯示假電郵(未登入一律轉至假電郵登入頁)
    if (this.siteIsSpare === true && this.siteEnableSpareDomain === true && this.isLoggedIn === false) {
      this.$router.replace({ name: 'SignIn' });
      return;
    }

    //* 已登入才去取使用者資訊
    if (this.isLoggedIn) {
      this.$store.dispatch('user/getInfo');
    }

    //* 取得語系列表
    getLangList().then(result => {
      if (result.Code == 200) {
        this.$store.commit('setLangList', result.RetObj);

        console.log('[Lang]', this.langList);
      }
    });

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
  methods: {
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
};
</script>

<style></style>
