import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import getters from './getters';
import { setLang } from '@/utils/cookie';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    type: '', // * 版型
    lang: '', // * 語系
  },
  mutations: {
    setType: (state, type) => {
      state.type = type;
    },
    setLang: (state, lang) => {
      console.log(lang);
      state.lang = lang;
      //* 存進 Cookie
      setLang(lang);
    },
  },
  actions: {},
  modules: {
    user,
  },
  getters,
});
