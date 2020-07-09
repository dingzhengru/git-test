import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import template from './modules/template';
import getters from './getters';
import { setLang } from '@/utils/cookie';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: '', // * 語系
  },
  mutations: {
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
    template
  },
  getters,
});
