import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

//* CSS 檔案
import '../node_modules/normalize.css/normalize.css'; //* ^3.0.2
import './styles/Y/common/layout.css';

import './routerPermission'; //* 路徑權限
import './api/interceptors.js'; //* 攔截器

import { getLang, getIsLoggedIn, getToken, getPublicKey } from '@/utils/cookie'; //* Cookie
import { i18n, loadLanguageAsync } from '@/i18n-lazy'; //* 語言載入
import { getTokenAndPublicKey, keepUserOnline } from '@/api/user'; //* API

import VueScrollTo from 'vue-scrollto'; //* 此 Library 只能註冊全域
Vue.use(VueScrollTo);

//* 手動設置版型，測試時使用
// const cssClass = 'Y';
// const cssType = '02';
// store.commit('site/setCssClass', cssClass);
// store.commit('site/setCssType', cssType);

//* 檢測此頁面可見狀態，離開 & 進入頁面就會觸發
// document.addEventListener('visibilitychange', function() {
//   if (document.visibilityState === 'visible') {
//     //* 進入頁面
//     console.log(0);
//   } else {
//* 離開頁面
//     console.log(1);
//   }
// });

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
    keepUserOnline().then(result => {
      console.log('[KeepUserOnline]', result.RetObj);
    });
    setInterval(async () => {
      //* document.visibilityState & document.hasFocus()
      //* 前者只要頁面是停留此頁就是 visible，後者一定要 focus 在頁面上才會是 true
      if (document.visibilityState != 'visible' || !store.getters.isLoggedIn) {
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
