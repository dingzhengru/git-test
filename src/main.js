import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import { LANG_DEFAULT, OFFLINE_MESSAGE } from '@/settings';
import {
  cookieGetVersion,
  cookieSetVersion,
  cookieGetIsLoggedIn,
  cookieGetToken,
  cookieGetPublicKey,
  cookieGetLang,
  cookieGetIsPreview,
} from '@/utils/cookie';

console.log(process.env.NODE_ENV);

//* CSS
import '../node_modules/normalize.css/normalize.css'; //* ^3.0.2
import './styles/global/base.scss';

//* JS
import './router/permission'; //* 路徑權限
import './api/interceptors.js'; //* 攔截器
import i18n from '@/i18n-lazy'; //* 語言載入
import '@/utils/vee-validate.js'; //* 載入 vee-validate 規則
import { getQueryValueByKey, checkQueryByKeyMultiple } from '@/utils/url';

//* API
import { apiGetVersion } from '@/api/version';
import { apiKeepUserOnline } from '@/api/user';
import { apiGetDomainInfo, checkSite, apiPreviewModeSwitch } from '@/api/site';

//* set Vue.prototype
import dayjs from 'dayjs';
import numeral from 'numeral';
import idMapper from '@/idMapper';
import { isObjEmpty, deepClone, getObjectValueByDotString } from '@/utils/object';
import { isStandaloneMode } from '@/utils/device';

Vue.prototype.$dayjs = dayjs;
Vue.prototype.$numeral = numeral;
Vue.prototype.$idMapper = idMapper;

Vue.prototype.$isObjEmpty = isObjEmpty;
Vue.prototype.$deepClone = deepClone;
Vue.prototype.$getObjectValueByDotString = getObjectValueByDotString;
Vue.prototype.$isStandaloneMode = isStandaloneMode;

//* Vue Global Component
import VueScrollTo from 'vue-scrollto'; //* 此 Library 只能註冊全域
Vue.use(VueScrollTo);

Vue.config.productionTip = false;

//* 取得是否為預覽模式
store.commit('site/setIsPreview', cookieGetIsPreview());

//* 取得目前語系
const lang = cookieGetLang() || LANG_DEFAULT;

//* 載入語系
store.commit('setLang', lang);

//* 取得語系列表
store.dispatch('getLangList');

//* Version (目前設置於 public/version)

(async () => {
  if (!window.caches) {
    return;
  }
  const version = await apiGetVersion();
  const versionCookie = cookieGetVersion();
  if (!versionCookie) {
    cookieSetVersion(version);
  }
  const cacheKeyList = await window.caches.keys();
  if (cacheKeyList.length > 0 && version !== versionCookie) {
    cookieSetVersion(version);
    cacheKeyList.forEach(key => caches.delete(key));

    setTimeout(() => {
      alert(i18n.t('alert.versionUpdate'));
      window.location.reload();
    }, 1000);
  }
})();

//* 離線通知
if (!window.navigator.onLine) {
  console.log(OFFLINE_MESSAGE);
}

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

//* 取得遊戲館列表
if (isLoggedIn) {
  store.dispatch('product/postList');
} else {
  const requestDataProductList = { Lang: lang };
  store.dispatch('product/getList', requestDataProductList);
}

(async () => {
  //* 確認是否要開啟預覽模式
  if (checkQueryByKeyMultiple('Port', 'SiteID', 'User', 'PreviewMode')) {
    const requestDataPreview = {
      Port: getQueryValueByKey('Port'),
      SiteID: getQueryValueByKey('SiteID'),
      User: getQueryValueByKey('User'),
      PreviewMode: getQueryValueByKey('PreviewMode'),
    };
    const resultPreview = await apiPreviewModeSwitch(requestDataPreview);
    if (resultPreview.Code === 200 && resultPreview.RetObj === true) {
      store.commit('site/setIsPreview', true);
      router.replace({ name: 'Home', query: {} }).catch(() => {});
    }
  }

  //* 取得站台資訊(Code: 推廣碼，若有推廣碼，則將轉址至首頁)
  const proxyCode = getQueryValueByKey('proxyCode');
  const requestDataSiteInfo = { DeviceType: 1, Code: proxyCode };
  if (isLoggedIn || store.getters.siteIsPreview === true) {
    requestDataSiteInfo.Lang = lang;
    await store.dispatch('site/postInfo', requestDataSiteInfo);
  } else {
    await store.dispatch('site/getInfo', requestDataSiteInfo);
  }

  //* 設置站台設定檔
  await store.dispatch('site/loadSetting');

  //* 心跳，剛進來也要執行一次
  //* document.visibilityState & document.hasFocus()，前者只要頁面是停留此頁就是 visible，後者一定要 focus 在頁面上才會是 true
  setInterval(
    (function KeepUserOnline() {
      if (document.visibilityState === 'visible' && store.getters.userIsLoggedIn) {
        apiKeepUserOnline();
      }
      return KeepUserOnline;
    })(),
    50000
  );

  //* 取得 SEO 資訊 (目前是都先設首頁的 seo)
  const requestDataSeo = { Lang: lang };
  store.dispatch('site/getSeoInfo', requestDataSeo);

  //* 檢查網域是否正常 (測試 API 用的區塊)
  // const requestDataDomainInfo = {
  //   SiteID: store.getters.siteID,
  //   DomainName: window.location.hostname,
  // };
  // apiGetDomainInfo(requestDataDomainInfo).then(result => {
  //   //* 不是空值、回傳值非此網域 => 轉址
  //   if (result.Code === 200 && result.RetObj && result.RetObj !== window.location.hostname) {
  //     store.commit('site/setDomainRedirect', result.RetObj);
  //     store.commit('setModalSiteBlockedMessageIsShow', true);
  //   }
  // });

  //* 檢查網域是否正常
  checkSite().then(result => {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(result, 'text/html');
    const isBlocked = htmlDoc.querySelector('#KeywordForITDetection') === null;

    if (isBlocked) {
      // const requestDataDomainInfo = { SiteID: store.getters.siteID, DomainName: window.location.hostname };
      // apiGetDomainInfo(requestDataDomainInfo);

      const requestDataDomainInfo = {
        SiteID: store.getters.siteID,
        DomainName: window.location.hostname,
      };
      apiGetDomainInfo(requestDataDomainInfo).then(result => {
        //* 不是空值、回傳值非此網域 => 轉址
        if (result.Code === 200 && result.RetObj && result.RetObj !== window.location.hostname) {
          store.commit('site/setDomainRedirect', result.RetObj);
          store.commit('setModalSiteBlockedMessageIsShow', true);
        }
      });
    }
  });

  //* 手動設置 style
  if (process.env.NODE_ENV != 'production') {
    store.commit('site/setInfoStyle', { siteClass: 'Z', siteType: '01' });
  }

  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    beforeCreate() {
      //* 若網址有推廣碼，則轉址至首頁
      if (proxyCode) {
        this.$router.replace({ name: 'Home' });
      }
    },
    mounted() {
      //* api timeout 是 10秒，所以設等待9秒
      window.setTimeout(() => {
        document.dispatchEvent(new Event('custom-render-trigger'));
      }, 9000);
    },
  }).$mount('#app');
})();

console.log(process.env.VUE_APP_I18N_LOCALE, '123123');
