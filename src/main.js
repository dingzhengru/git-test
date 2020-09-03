import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import './routerPermission'; //* 路徑權限
import '@/api/interceptors.js'; //* 攔截器

import '../node_modules/normalize.css/normalize.css'; //* ^3.0.2
import '@/styles/Y/common/layout.css';
// import '@/styles/Y/common/layout-zh-cn.scss';
// import '@/styles/Y/common/layout-th-th.scss';
// import '@/styles/Y/common/layout-en-us.scss';

//* 此 Library 只能註冊全域
import VueScrollTo from 'vue-scrollto';

Vue.use(VueScrollTo);

//* Cookie
import { getLang, getIsLoggedIn, getToken, getPublicKey } from '@/utils/cookie';

//* 載入語言
import { i18n, loadLanguageAsync } from '@/i18n-lazy';

//* API
import { getTokenAndPublicKey, keepUserOnline } from '@/api/user';

//* 取得版型(網域判斷或後端給) => 存進 store.state.site
// const cssClass = 'Y';
// const cssType = '01';
// store.commit('site/setCssClass', cssClass);
// store.commit('site/setCssType', cssType);

//* 取得語系 => 存進 store.state.lang
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

//* 取得站台資訊
store
  .dispatch('site/getInfo')
  .then(result => {
    //* Page Title
    document.title = result.RetObj.LS_SiteTitle;

    //* 當前面 cookie 沒有取到 lang 時，後端會在此設定預設語系，就可以在這時候把語系填入了
    if (!store.getters.lang) {
      store.commit('setLang', getLang());

      loadLanguageAsync(getLang()).then(result => {
        console.log('[i18n]', 'load:', result);
      });
    }

    //* 心跳，剛進來也要執行一次
    keepUserOnline();
    setInterval(async () => {
      if (!document.hasFocus()) {
        return;
      }
      const result = await keepUserOnline();
      console.log('[KeepUserOnline]', result.RetObj);
    }, 50000);
  })
  .catch(error => {
    if (process.env.NODE_ENV === 'production') {
      alert('站台資訊取得失敗');
    } else {
      store.commit('site/setID', 'C');
      store.commit('site/setCssClass', 'Y');
      store.commit('site/setCssType', '01');
    }
    throw error;
  });

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
