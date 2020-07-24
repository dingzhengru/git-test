import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import './routerPermission'; //* 路徑權限

import '../node_modules/normalize.css/normalize.css'; // ^3.0.2
import '@/styles/Y/common/layout.css';
import '@/styles/Y/common/layout-zh-cn.scss';
import '@/styles/Y/common/layout-th-th.scss';
import '@/styles/Y/common/layout-en-us.scss';

import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo);

import { getSiteInfo } from '@/api/site';
import { getLang, getToken } from '@/utils/cookie';
// import { DEFAULT_LANG } from '@/settings';

//* 取得版型(網域判斷或後端給) => 存進 store.state.site
const cssClass = 'Y';
const cssVersion = '01';
const cssType = '03';
store.commit('site/setCssClass', cssClass);
store.commit('site/setCssVersion', cssVersion);
store.commit('site/setCssType', cssType);

//* 取得語系 => 存進 store.state.lang
// const browserLang = navigator.language || navigator.userLanguage;
const lang = getLang();
store.commit('setLang', lang);

//* 用 token 判斷是否登入，並取使用者資料
const token = getToken();
if (token) {
  store.commit('user/setToken', token);

  // * 取得使用者資料，並放置進 store.user
  store.commit('user/setIsAccessed', true); // * 設置是否已開通
  store.commit('user/setAccount', 'ding0101');
  store.commit('user/setPointAmount', 1.23);
  store.commit('user/setLevel', 123);
  store.commit('user/setWashcodeAmount', 4.56);
}

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

    if(!store.getters.lang) {
      // *當前面 cookie 沒有取到 lang 時，後端會在此設定預設語系，就可以在這時候把語系填入了
      store.commit('setLang', getLang());
    }
  })
  .catch(() => {
    store.commit('site/setID', 'C');
  });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
