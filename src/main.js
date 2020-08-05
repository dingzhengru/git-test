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

import { getLang, getIsLoggedIn } from '@/utils/cookie';
import { i18n, loadLanguageAsync } from '@/i18n-lazy'; // 載入語言

//* API
import { getSiteInfo } from '@/api/site';
import { getTokenAndPublicKey } from '@/api/user';

//* 取得版型(網域判斷或後端給) => 存進 store.state.site
const cssClass = 'Y';
const cssVersion = '01';
const cssType = '01';
store.commit('site/setCssClass', cssClass);
store.commit('site/setCssVersion', cssVersion);
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

//* 取得公鑰 & token
getTokenAndPublicKey().then(result => {
  store.commit('user/setToken', result.RetObj.token);
  store.commit('user/setPublicKey', result.RetObj.publickey);
});

//* 用 isLoggedIn 判斷是否登入
const isLoggedIn = getIsLoggedIn();
store.commit('user/setIsLoggedIn', isLoggedIn);

//* 取得 site info => 存進 store.state.site
const requestData = { DeviceType: 1 };
getSiteInfo(requestData)
  .then(result => {
    const siteInfo = result.RetObj;

    console.log('[Site]', siteInfo);

    store.commit('site/setID', siteInfo.LS_SiteID);
    // store.commit('site/setCssClass', siteInfo.LS_CSS_Class);
    // store.commit('site/setCssVersion', siteInfo.LS_CSS_Version);
    // store.commit('site/setCssType', siteInfo.LS_CSS_Type);
    // store.commit('site/setCssFestival', siteInfo.LS_CSS_Festival);
    store.commit('site/setMainDomain', siteInfo.LS_MainDomain);
    store.commit('site/setRemoteCSSUrl', siteInfo.RemoteCSSUrls);
    store.commit('site/setBNewPromotion', siteInfo.bNewPromotion);

    if (!store.getters.lang) {
      // *當前面 cookie 沒有取到 lang 時，後端會在此設定預設語系，就可以在這時候把語系填入了
      store.commit('setLang', getLang());

      loadLanguageAsync(getLang()).then(result => {
        console.log('[i18n]', 'load:', result);
      });
    }
  })
  .catch(() => {
    store.commit('site/setID', 'C');
  });

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
