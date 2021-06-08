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
    modalTransferIsShow: false,
    modalTransferProduct: {},
    modalWinWheelIsShow: false,
    modalRedEnvelopeIsShow: false,
    modalMessageSiteBlockedIsShow: false,
    modalMessageApkDownloadIsShow: false,
    isShowGoTopButton: false,

    //* 橫版
    modalLangIsShow: false,
    modalAuthIsShow: false,
    modalContactIsShow: false,
    modalAlertIsShow: false,
    modalAlertText: '',
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
    setModalTransferIsShow: (state, isShow) => {
      state.modalTransferIsShow = isShow;
    },
    setModalTransferProduct: (state, product) => {
      state.modalTransferProduct = product;
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
    setModalMessageSiteBlockedIsShow: (state, isShow) => {
      state.modalMessageSiteBlockedIsShow = isShow;
    },
    setModalMessageApkDownloadIsShow: (state, isShow) => {
      state.modalMessageApkDownloadIsShow = isShow;
    },
    setModalLangIsShow: (state, isShow) => {
      state.modalLangIsShow = isShow;
    },
    setModalAuthIsShow: (state, isShow) => {
      state.modalAuthIsShow = isShow;
    },
    setModalContactIsShow: (state, isShow) => {
      state.modalContactIsShow = isShow;
    },
    setModalAlertIsShow: (state, isShow) => {
      state.modalAlertIsShow = isShow;
    },
    setModalAlertText: (state, text) => {
      state.modalAlertText = text;
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
    openModalTransfer({ commit }, product) {
      commit('setModalTransferProduct', product);
      commit('setModalTransferIsShow', true);
    },
    closeModalTransfer({ commit }) {
      commit('setModalTransferProduct', {});
      commit('setModalTransferIsShow', false);
    },
    openModalLang({ commit }) {
      commit('setModalLangIsShow', true);
    },
    closeModalLang({ commit }) {
      commit('setModalLangIsShow', false);
    },
    openModalAuth({ commit }) {
      commit('setModalAuthIsShow', true);
    },
    closeModalAuth({ commit }) {
      commit('setModalAuthIsShow', false);
    },
    openModalContact({ commit }) {
      commit('setModalContactIsShow', true);
    },
    closeModalContact({ commit }) {
      commit('setModalContactIsShow', false);
    },
    openModalAlert({ commit, dispatch }, text) {
      commit('setModalAlertText', text);
      commit('setModalAlertIsShow', true);

      window.setTimeout(() => {
        dispatch('closeModalAlert');
      }, 1000);
    },
    closeModalAlert({ commit }) {
      commit('setModalAlertIsShow', false);
      commit('setModalAlertText', '');
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
