import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

import '../node_modules/normalize.css/normalize.css'; // ^3.0.2
import '@/styles/Y/common/layout.css';
import '@/styles/Y/common/header.css';
import '@/styles/Y/common/footer.css';
import '@/styles/Y/common/layout-zh-cn.scss';
import '@/styles/Y/common/layout-th-th.scss';
import '@/styles/Y/common/layout-en-us.scss';

import { getLang } from '@/utils/cookie';
import settings from '@/settings';

//* 取得版型(網域判斷或後端給) => 存進 store.state.type
const templateType = 'Y';
const templateVersion = '01';
const templateVersionNumber = '01';
store.commit('template/setType', templateType);
store.commit('template/setVersion', templateVersion);
store.commit('template/setVersionNumber', templateVersionNumber);

//* 取得語系 => 存進 store.state.lang
// const browserLang = navigator.language || navigator.userLanguage;
const lang = getLang() || settings.DEFAULT_LANG;
store.commit('setLang', lang);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
