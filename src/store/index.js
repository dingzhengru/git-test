import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import site from './modules/site';
import getters from './getters';
import { setLang } from '@/utils/cookie';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: '', // * 語系
  },
  mutations: {
    setLang: (state, lang) => {
      state.lang = lang;
      setLang(lang); //* 存進 Cookie
    },
  },
  actions: {},
  modules: {
    user,
    site,
  },
  getters,
});
