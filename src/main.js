import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import './routerPermission'; //* 路徑權限
import '@/api/interceptors.js'; //* 攔截器

import '../node_modules/normalize.css/normalize.css'; // ^3.0.2
import '@/styles/Y/common/layout.css';
import '@/styles/Y/common/layout-zh-cn.scss';
import '@/styles/Y/common/layout-th-th.scss';
import '@/styles/Y/common/layout-en-us.scss';

import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo);

import { getLang, getIsLoggedIn, getToken, getPublicKey } from '@/utils/cookie';
import { i18n, loadLanguageAsync } from '@/i18n-lazy'; // 載入語言

//* API
import { getSiteInfo } from '@/api/site';
import { getTokenAndPublicKey, keepUserOnline } from '@/api/user';

//* 取得版型(網域判斷或後端給) => 存進 store.state.site
const cssClass = 'Y';
const cssType = '01';
store.commit('site/setCssClass', cssClass);
store.commit('site/setCssType', cssType);

//* 取得語系 => 存進 store.state.lang
// const browserLang = navigator.language || navigator.userLanguage;
const lang = getLang();
if (lang) {
  store.commit('setLang', lang);
  loadLanguageAsync(lang).then(result => {
    console.log('[i18n]', 'load:', result);
  });
}

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

//* 取得 site info => 存進 store.state.site
const requestData = { DeviceType: 1 };
getSiteInfo(requestData)
  .then(result => {
    const siteInfo = result.RetObj;

    console.log('[Site]', siteInfo);

    //* Page Title
    document.title = siteInfo.LS_SiteTitle;

    store.commit('site/setID', siteInfo.LS_SiteID);
    // store.commit('site/setCssClass', siteInfo.LS_CSS_Class);
    store.commit('site/setCssVersion', siteInfo.LS_CSS_Version);
    // store.commit('site/setCssType', siteInfo.LS_CSS_Type);
    store.commit('site/setCssFestival', siteInfo.LS_CSS_Festival);
    store.commit('site/setMainDomain', siteInfo.LS_MainDomain);
    store.commit('site/setRemoteCSSUrl', siteInfo.RemoteCSSUrls);
    store.commit('site/setIsNewPromotion', siteInfo.bNewPromotion);

    if (!store.getters.lang) {
      //* 當前面 cookie 沒有取到 lang 時，後端會在此設定預設語系，就可以在這時候把語系填入了
      store.commit('setLang', getLang());

      loadLanguageAsync(getLang()).then(result => {
        console.log('[i18n]', 'load:', result);
      });
    }

    //* 心跳
    setInterval(async () => {
      if (!document.hasFocus()) {
        return;
      }
      const result = await keepUserOnline();
      console.log('[KeepUserOnline]', result.RetObj);
    }, 50000);
  })
  .catch(() => {
    if (process.env.NODE_ENV === 'production') {
      // location.reload();
      store.commit('site/setID', 'C');
    } else {
      store.commit('site/setID', 'C');
    }
  });

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
