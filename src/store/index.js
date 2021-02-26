import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import site from './modules/site';
import product from './modules/product';
import pwa from './modules/pwa';
import getters from './getters';
import { loadLanguageAsync } from '@/i18n-lazy';
import { apiChangeLang, apiGetLangList } from '@/api/lang';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: '',
    langList: [],
    loadingList: [],
    pageTitle: '',
    modalWinWheelIsShow: false,
    modalRedEnvelopeIsShow: false,
    isShowGoTopButton: false,
  },
  mutations: {
    setLang: (state, lang) => {
      loadLanguageAsync(lang);
      state.lang = lang;
    },
    setLangList: (state, langList) => {
      state.langList = langList;
    },
    pushLoading: (state, name = '') => {
      state.loadingList.push(name);
    },
    popLoading: state => {
      state.loadingList.pop();
    },
    popLoadingAllChangeRoute: state => {
      //* 清除所有 change-route
      state.loadingList = state.loadingList.filter(item => item != 'change-route');
    },
    setPageTitle: (state, title) => {
      state.pageTitle = title;
    },
    setModalWinWheelIsShow: (state, isShow) => {
      state.modalWinWheelIsShow = isShow;
    },
    setModalRedEnvelopeIsShow: (state, isShow) => {
      state.modalRedEnvelopeIsShow = isShow;
    },
    setIsShowGoTopButton: (state, isShow) => {
      state.isShowGoTopButton = isShow;
    },
  },
  actions: {
    async changeLang({ commit }, lang) {
      const requestData = { Lang: lang };
      try {
        await apiChangeLang(requestData);
      } finally {
        commit('setLang', lang);
      }

      return lang;
    },
    async getLangList({ commit }) {
      const result = await apiGetLangList();
      if (result.Code == 200) {
        commit('setLangList', result.RetObj);
      }
    },
  },
  modules: {
    pwa,
    user,
    site,
    product,
  },
  getters,
});
