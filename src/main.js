import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

//* CSS
import '../node_modules/normalize.css/normalize.css'; //* ^3.0.2
import './styles/Y/common/layout.css';

import './router/permission'; //* 路徑權限
import './api/interceptors.js'; //* 攔截器

import i18n from '@/i18n-lazy'; //* 語言載入

//* Cookie
import { cookieGetLang, cookieGetIsLoggedIn, cookieGetToken, cookieGetPublicKey } from '@/utils/cookie';

//* API
import { apiKeepUserOnline } from '@/api/user'; //* API

import VueScrollTo from 'vue-scrollto'; //* 此 Library 只能註冊全域
Vue.use(VueScrollTo);

//* 用 isLoggedIn 判斷是否登入
const isLoggedIn = cookieGetIsLoggedIn();
store.commit('user/setIsLoggedIn', isLoggedIn);

/**
 ** 取得公鑰 & token (； 頁面取得；已登入 )
 ** 1. 優先從 Cookie 取得
 ** 2. 未登入: Cookie 沒有 => 只於 Login、Register 頁面取得
 ** 3. 已登入: Cookie 沒有 => 不管哪個頁面，直接取得
 */

if (cookieGetToken() && cookieGetPublicKey()) {
  store.commit('user/setToken', cookieGetToken());
  store.commit('user/setPublicKey', cookieGetPublicKey());
} else if (isLoggedIn) {
  store.dispatch('user/getTokenAndPublicKey');
}

(async () => {
  //* 取得站台資訊(Code: 推廣碼，若有推廣碼，則將轉址至首頁)
  const proxyCode = new URLSearchParams(window.location.search).get('proxyCode') || '';
  const requestDataSiteInfo = { DeviceType: 1, Code: proxyCode };
  await store.dispatch('site/getInfo', requestDataSiteInfo);

  //* Page Title
  document.title = store.getters.siteTitle;

  //* 載入語系
  await store.dispatch('changeLang', cookieGetLang());

  //* 取得語系列表
  store.dispatch('getLangList');

  //* 心跳，剛進來也要執行一次
  if (document.visibilityState == 'visible' && store.getters.userIsLoggedIn) {
    apiKeepUserOnline().then(result => {
      console.log('[KeepUserOnline]', result.RetObj);
    });
  }
  setInterval(async () => {
    //* document.visibilityState & document.hasFocus()
    //* 前者只要頁面是停留此頁就是 visible，後者一定要 focus 在頁面上才會是 true
    if (document.visibilityState == 'visible' && store.getters.userIsLoggedIn) {
      const result = await apiKeepUserOnline();
      console.log('[KeepUserOnline]', result.RetObj);
    }
  }, 50000);

  //* 取得 SEO 資訊 (目前是都先設首頁的 seo)
  store.dispatch('site/getSeoInfo').then(() => {
    let seoInfo = {};
    if (router.currentRoute.path.includes('promotion')) {
      seoInfo = store.getters.siteSeo.find(item => item.Lst_Code == 'pub_Promotion');
    } else if (router.currentRoute.name == 'GameLobby' && router.currentRoute.params.type == 1) {
      //* 真人娛樂
      seoInfo = store.getters.siteSeo.find(item => item.Lst_Code == 'RYCasinos');
    } else if (router.currentRoute.name == 'GameLobby' && router.currentRoute.params.type == 2) {
      //* 電子遊戲
      seoInfo = store.getters.siteSeo.find(item => item.Lst_Code == 'RYSlots');
    } else {
      seoInfo = store.getters.siteSeo.find(item => item.Lst_Code == 'pub_Index');
    }
    document.querySelector('meta[name=description]').setAttribute('content', seoInfo.Lst_SEO_Info.Description);
    document.querySelector('meta[name=keywords]').setAttribute('content', seoInfo.Lst_SEO_Info.Keyword);

    //* title 以 seo 的為主，有的話就蓋掉
    if (seoInfo.Lst_SEO_Info.Title) {
      document.title = seoInfo.Lst_SEO_Info.Title;
    }
  });

  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    beforeCreate() {
      //* 若網址有推廣碼，則轉址至首頁
      if (proxyCode) {
        console.log('[ProxyCode]', proxyCode);
        this.$router.replace({ name: 'Home' });
      }
    },
  }).$mount('#app');
})();
