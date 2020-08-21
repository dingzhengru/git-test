<template>
  <div id="app" :class="lang">
    <AppHeader
      :isLoggedIn="isLoggedIn"
      :langList="langList"
      :lang="lang"
      :logo="logo"
      :username="username"
      :total="total"
      :vip="vip"
      :roll="roll"
      @changeLang="changeLang"
      @logout="logout"
    ></AppHeader>

    <div class="main">
      <router-view />
    </div>

    <AppFooter :isLoggedIn="isLoggedIn" />
    <AppLoadingOverlay :isLoading="isLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getLangList, changeLang } from '@/api/lang';

import AppHeader from '@/components/AppHeader';
import AppFooter from '@/components/AppFooter';
import AppLoadingOverlay from '@/components/AppLoadingOverlay';

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
      'token',
      'lang',
      'isLoading',
      'pwaInstallStatus',
      'pwaPrompt',
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
      logo: '',
      langList: [],
      swiperList: [],
    };
  },
  mounted() {
    // * 動態載入 manifest，已將 pubcli/index.html 中新增 <link rel="manifest" id="manifest" />
    document.querySelector('#manifest').setAttribute('href', '/manifest01.json');

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
    changeLang(lang) {
      if (this.lang == lang) {
        return;
      }
      const requestDataChangeLang = { Lang: lang };
      changeLang(requestDataChangeLang).then(result => {
        if (result.Code == 200) {
          this.$store.commit('setLang', lang);
          console.log('[Lang]', 'changeLang:', lang, result.RetObj);
        }
      });
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

        // * 根據版型引入 css
        import(`@/styles/${this.siteFullCss}/layout.scss`);

        // * header css
        import(`@/styles/${this.siteFullCss}/header.scss`);

        // * footer css
        import(`@/styles/${this.siteFullCss}/footer.scss`);

        // * 使用 siteInfo 拼湊 logo url
        this.logo = `${this.resourceUrl}/imgs/header/logo.png`;

        // * 取得語系列表
        getLangList().then(result => {
          if (result.Code == 200) {
            this.langList = result.RetObj;

            console.log('[Lang]', this.langList);
          }
        });
      },
    },
    token: {
      immediate: true,
      handler() {
        /*
         * 這裡放需要 token 且是僅進入頁面才發需求的 API
         * ex: 使用者的上方資訊欄位
         */
        if (!this.token) {
          return;
        }

        if (this.isLoggedIn) {
          this.$store.dispatch('user/getInfo');
        }
      },
    },
  },
};
</script>

<style></style>
