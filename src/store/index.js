import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import template from './modules/template';
import getters from './getters';
import { setLang, setToken } from '@/utils/cookie';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: '', // * 語系
    token: '', // * 未登入的 token
  },
  mutations: {
    setLang: (state, lang) => {
      state.lang = lang;
      setLang(lang); //* 存進 Cookie
    },
    setToken: (state, token) => {
      state.token = token;
      setToken(token); //* 存進 Cookie
    },
  },
  actions: {},
  modules: {
    user,
    template,
  },
  getters,
});
