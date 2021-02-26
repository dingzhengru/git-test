import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { OFFLINE_MESSAGE } from '@/settings';
import { cookieGetVersion, cookieSetVersion } from '@/utils/cookie';

Vue.config.productionTip = false;

//* version 不要 cache，判斷是否更新並清掉cache
import version from '@/version.txt';
const versionCookie = cookieGetVersion();
cookieSetVersion(version);
(async () => {
  if (window.caches && version !== versionCookie) {
    console.log(version, versionCookie);
    const cacheKeyList = await window.caches.keys();
    cacheKeyList.forEach(key => caches.delete(key));
    alert('版本更新，將重整');
    window.location.reload();
  }
})();

//* 封站，轉址測試
// const isBlocked = true;
// import { isStandaloneMode } from '@/utils/device';
// if (isBlocked) {
//   if (isStandaloneMode()) {
//     setTimeout(() => {
//       console.log('PWA 轉址(window.open googlechrome)');
//       alert('PWA 轉址(window.open googlechrome)');
//       // window.location.href = 'https://www.starbets88.com';
//       // window.open('https://www.starbets88.com', '_blank');
//       window.open(`googlechrome://navigate?url=https://www.starbets88.com`, '_system');
//     }, 3000);
//   } else {
//     console.log('Web 轉址(window.open googlechrome)');
//   }
// }

//* 離線通知
if (!window.navigator.onLine) {
  alert(OFFLINE_MESSAGE);
}

//* CSS
import '../node_modules/normalize.css/normalize.css'; //* ^3.0.2
import './styles/global/base.scss';
import './router/permission'; //* 路徑權限
import './api/interceptors.js'; //* 攔截器
import i18n from '@/i18n-lazy'; //* 語言載入
import '@/utils/vee-validate.js'; //* 載入 vee-validate 規則

//* Cookie
import { cookieGetIsLoggedIn, cookieGetToken, cookieGetPublicKey } from '@/utils/cookie';

//* API
import { apiKeepUserOnline } from '@/api/user';

import VueScrollTo from 'vue-scrollto'; //* 此 Library 只能註冊全域
Vue.use(VueScrollTo);

//* set Vue.prototype
import dayjs from 'dayjs';
import numeral from 'numeral';
import idMapper from '@/idMapper';

Vue.prototype.$dayjs = dayjs;
Vue.prototype.$numeral = numeral;
Vue.prototype.$idMapper = idMapper;

//* 取得是否登入 (Cookie)
const isLoggedIn = cookieGetIsLoggedIn();
store.commit('user/setIsLoggedIn', isLoggedIn);

//* 取得使用者資訊 (已登入)
if (isLoggedIn) {
  store.dispatch('user/getInfo');
}

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
  if (isLoggedIn) {
    await store.dispatch('site/postInfo', requestDataSiteInfo);
  } else {
    await store.dispatch('site/getInfo', requestDataSiteInfo);
  }

  //* 手動設置 style
  if (process.env.NODE_ENV != 'production') {
    store.commit('site/setInfoStyle', { siteClass: 'Z', siteType: '01' });
  }

  //* 設置站台設定檔
  await store.dispatch('site/loadSetting');

  //* Page Title
  // document.title = store.getters.siteTitle;

  //* 取得語系列表
  store.dispatch('getLangList');

  //* 載入語系
  // await store.dispatch('changeLang', store.getters.siteLang);
  store.commit('setLang', store.getters.siteLang);

  //* 取得遊戲館列表
  if (isLoggedIn) {
    store.dispatch('product/postList');
  } else {
    const requestDataProductList = { Lang: store.getters.siteLang };
    store.dispatch('product/getList', requestDataProductList);
  }

  //* 心跳，剛進來也要執行一次
  //* document.visibilityState & document.hasFocus()，前者只要頁面是停留此頁就是 visible，後者一定要 focus 在頁面上才會是 true
  setInterval(
    (function KeepUserOnline() {
      if (document.visibilityState == 'visible' && store.getters.userIsLoggedIn) {
        apiKeepUserOnline();
      }
      return KeepUserOnline;
    })(),
    50000
  );

  //* 取得 SEO 資訊 (目前是都先設首頁的 seo)
  const requestDataSeo = { Lang: store.getters.siteLang };
  store.dispatch('site/getSeoInfo', requestDataSeo);

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
    mounted() {
      //* api timeout 是 10秒，所以設等待9秒
      setTimeout(() => {
        document.dispatchEvent(new Event('custom-render-trigger'));
      }, 9000);
    },
  }).$mount('#app');
})();
