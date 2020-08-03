import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import site from './modules/site';
import getters from './getters';
import { loadLanguageAsync } from '@/i18n-lazy';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: '', // * 語系
  },
  mutations: {
    setLang: (state, lang) => {
      state.lang = lang;
      loadLanguageAsync(lang).then(result => {
        console.log('[Lang] loadLanguageAsync', result);
      });
    },
  },
  actions: {},
  modules: {
    user,
    site,
  },
  getters,
});
