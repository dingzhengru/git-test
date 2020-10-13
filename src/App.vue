<template>
  <div id="app" :class="lang">
    <AppHeader
      :siteStatus="siteStatus"
      :isLoggedIn="isLoggedIn"
      :langList="langList"
      :lang="lang"
      :logo="siteLogoUrl"
      :username="username"
      :total="total"
      :vip="vip"
      :roll="roll"
      :backIconRouteList="['PromotionDetail']"
      @changeLang="changeLang"
      @logout="logout"
    ></AppHeader>

    <div class="main">
      <router-view />
    </div>

    <AppFooter :isLoggedIn="isLoggedIn" v-if="siteStatus == 0" />
    <AppLoadingOverlay :isLoading="loadingRequestList.length > 0" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getLangList, changeLang } from '@/api/lang';

import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import AppLoadingOverlay from '@/components/AppLoadingOverlay';

// import { getManifest } from '@/api/manifest';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    AppLoadingOverlay,
  },
  computed: {
    ...mapGetters([
      'siteID',
      'siteFullCss',
      'siteLogoUrl',
      'lang',
      'loadingRequestList',
      'pwaInstallStatus',
      'pwaPrompt',
      'siteStatus',
      'isLoggedIn',
      'resourceUrl',
      'username',
      'total',
      'vip',
      'roll',
    ]),
  },
  data() {
    return {
      langList: [],
      swiperList: [],
    };
  },
  mounted() {
    //* Manifest
    //* 動態載入 manifest，已將 pubcli/index.html 中新增 <link rel="manifest" id="manifest" />
    // document.querySelector('#manifest').setAttribute('href', '/manifest01.json');
    // const manifestUrl = 'http://resource.re888show.com/Site_Uploadfile/C/manifest.json'
    const manifestUrl = '/api/Siteinfo/ManifestJson';
    document.querySelector('#manifest').setAttribute('href', manifestUrl);

    // getManifest().then(result => {
    //   console.log(result);
    // });

    //* 一秒後沒觸發 beforeinstallprompt 的話，就視為已下載
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
    async changeLang(lang) {
      if (this.lang == lang) {
        return;
      }
      const requestData = { Lang: lang };
      const result = await changeLang(requestData);
      if (result.Code == 200) {
        this.$store.commit('setLang', lang);
        console.log('[Lang]', 'changeLang:', lang, result.RetObj);
      }
    },
    logout() {
      this.$store.dispatch('user/logout');
    },
  },
  watch: {
    siteID: {
      immediate: true,
      handler() {
        if (!this.siteID) {
          return;
        }

        const faviconUrl = `${this.resourceUrl}/imgs/favicon/favicon.ico`;
        document.querySelector('#favicon').setAttribute('href', faviconUrl);

        //* 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/layout.scss`);

        //* header css
        import(`@/styles/${this.siteFullCss}/header.scss`);

        //* footer css
        import(`@/styles/${this.siteFullCss}/footer.scss`);

        //* 使用 siteInfo 拼湊 logo url
        //* EX: http://resource.re888show.com/Site_Uploadfile/C/Logo_0.png
        // this.logo = `${this.resourceUrl}/imgs/header/logo.png`;
        // this.logo = `${this.siteRemoteCSSUrl}/Site_Uploadfile/${this.siteID}/Logo_0.png`;

        //* 確認是否維護
        if (this.siteStatus != 0 && this.$route.name != 'Maintenance') {
          this.$router.replace({ name: 'Maintenance' });
          return;
        }

        //* 已登入才去取使用者資訊
        if (this.isLoggedIn) {
          this.$store.dispatch('user/getInfo');
        }

        //* 取得語系列表
        getLangList().then(result => {
          if (result.Code == 200) {
            this.langList = result.RetObj;

            console.log('[Lang]', this.langList);
          }
        });
      },
    },
  },
};
</script>

<style></style>
