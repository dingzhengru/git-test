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
    isLoading: false,
    loadingRequestList: [],
  },
  mutations: {
    setLang: (state, lang) => {
      state.lang = lang;
      loadLanguageAsync(lang).then(result => {
        console.log('[Lang] loadLanguageAsync', result);
      });
    },
    setIsLoading: (state, isLoading) => {
      state.isLoading = isLoading;
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
