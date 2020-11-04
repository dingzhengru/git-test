import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

//* CSS 檔案
import '../node_modules/normalize.css/normalize.css'; //* ^3.0.2
import './styles/Y/common/layout.css';

import './router/permission'; //* 路徑權限
import './api/interceptors.js'; //* 攔截器

import i18n from '@/i18n-lazy'; //* 語言載入
import { getLang, getIsLoggedIn, getToken, getPublicKey } from '@/utils/cookie'; //* Cookie
import { getTokenAndPublicKey, keepUserOnline } from '@/api/user'; //* API

import VueScrollTo from 'vue-scrollto'; //* 此 Library 只能註冊全域
Vue.use(VueScrollTo);

//* 用 isLoggedIn 判斷是否登入
const isLoggedIn = getIsLoggedIn();
store.commit('user/setIsLoggedIn', isLoggedIn);

//* 取得公鑰 & token (已登入才於這取得，未登入只放置 Login、Register 頁面)
if (getToken() && getPublicKey()) {
  store.commit('user/setToken', getToken());
  store.commit('user/setPublicKey', getPublicKey());
} else if (isLoggedIn) {
  //* 只有登入後的狀態才會去跟後端要
  getTokenAndPublicKey().then(result => {
    store.commit('user/setToken', result.RetObj.token);
    store.commit('user/setPublicKey', result.RetObj.publickey);
  });
}

(async () => {
  //* 取得站台資訊(Code: 推廣碼，若有推廣碼，則將轉址至首頁)
  const proxyCode = new URLSearchParams(window.location.search).get('proxyCode') || '';
  const requestDataSiteInfo = { DeviceType: 1, Code: proxyCode };
  await store.dispatch('site/getInfo', requestDataSiteInfo);

  //* Page Title
  document.title = store.getters.siteTitle;

  //* 載入語系
  await store.commit('setLang', getLang());

  //* 心跳，剛進來也要執行一次
  if (document.visibilityState == 'visible' && store.getters.isLoggedIn) {
    keepUserOnline().then(result => {
      console.log('[KeepUserOnline]', result.RetObj);
    });
  }
  setInterval(async () => {
    //* document.visibilityState & document.hasFocus()
    //* 前者只要頁面是停留此頁就是 visible，後者一定要 focus 在頁面上才會是 true
    if (document.visibilityState == 'visible' && store.getters.isLoggedIn) {
      const result = await keepUserOnline();
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
    mounted() {
      //* 若網址有推廣碼，則轉址至首頁
      if (proxyCode) {
        console.log('[ProxyCode]', proxyCode);
        this.$router.replace({ name: 'Home' });
      }
    },
  }).$mount('#app');
})();

// store
//   .dispatch('site/getInfo', requestDataSiteInfo)
//   .then(result => {
//     //* Page Title
//     document.title = result.RetObj.LS_SiteTitle;

//     //* 當前面 cookie 沒有取到 lang 時，後端會在此設定預設語系，就可以在這時候把語系填入了
//     if (!store.getters.lang) {
//       store.commit('setLang', getLang());
//     }

//     //* 心跳，剛進來也要執行一次
//     if (document.visibilityState == 'visible' && store.getters.isLoggedIn) {
//       keepUserOnline().then(result => {
//         console.log('[KeepUserOnline]', result.RetObj);
//       });
//     }
//     setInterval(async () => {
//       //* document.visibilityState & document.hasFocus()
//       //* 前者只要頁面是停留此頁就是 visible，後者一定要 focus 在頁面上才會是 true
//       if (document.visibilityState == 'visible' && store.getters.isLoggedIn) {
//         const result = await keepUserOnline();
//         console.log('[KeepUserOnline]', result.RetObj);
//       }
//     }, 50000);

//     //* 取得 SEO 資訊 (目前是都先設首頁的 seo)
//     store.dispatch('site/getSeoInfo').then(() => {
//       let seoInfo = {};
//       if (router.currentRoute.path.includes('promotion')) {
//         seoInfo = store.getters.siteSeo.find(item => item.Lst_Code == 'pub_Promotion');
//       } else if (router.currentRoute.name == 'GameLobby' && router.currentRoute.params.type == 1) {
//         //* 真人娛樂
//         seoInfo = store.getters.siteSeo.find(item => item.Lst_Code == 'RYCasinos');
//       } else if (router.currentRoute.name == 'GameLobby' && router.currentRoute.params.type == 2) {
//         //* 電子遊戲
//         seoInfo = store.getters.siteSeo.find(item => item.Lst_Code == 'RYSlots');
//       } else {
//         seoInfo = store.getters.siteSeo.find(item => item.Lst_Code == 'pub_Index');
//       }
//       document.querySelector('meta[name=description]').setAttribute('content', seoInfo.Lst_SEO_Info.Description);
//       document.querySelector('meta[name=keywords]').setAttribute('content', seoInfo.Lst_SEO_Info.Keyword);

//       //* title 以 seo 的為主，有的話就蓋掉
//       if (seoInfo.Lst_SEO_Info.Title) {
//         document.title = seoInfo.Lst_SEO_Info.Title;
//       }
//     });
//   })
//   .finally(() => {
//     //* 若網址有推廣碼，則轉址至首頁，無論請求失敗或成功
//     if (proxyCode) {
//       console.log('[ProxyCode]', proxyCode);
//       router.replace({ name: 'Home' });
//     }
//   });

// new Vue({
//   router,
//   store,
//   i18n,
//   render: h => h(App),
// }).$mount('#app');
