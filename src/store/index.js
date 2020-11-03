import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import site from './modules/site';
import pwa from './modules/pwa';
import getters from './getters';
import { loadLanguageAsync } from '@/i18n-lazy';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: '',
    langList: [],
    loadingRequestList: [],
  },
  mutations: {
    setLang: (state, lang) => {
      loadLanguageAsync(lang).then(result => {
        state.lang = lang;
        console.log('[Lang] 載入', result);
      });
    },
    setLangList: (state, langList) => {
      state.langList = langList;
    },
    pushLoadingRequest: (state, name) => {
      return state.loadingRequestList.push(name || '');
    },
    popLoadingRequest: state => {
      return state.loadingRequestList.pop();
    },
  },
  actions: {},
  modules: {
    pwa,
    user,
    site,
  },
  getters,
});
