import { apiGetSiteInfo, apiGetSiteSeoInfo } from '@/api/site';

const state = {
  info: {},
  seo: {},
};

const mutations = {
  setInfo(state, info) {
    state.info = info;
  },
  setSeo(state, seo) {
    state.seo = seo;
  },
};

const actions = {
  async getInfo({ commit }, requestData) {
    const result = await apiGetSiteInfo(requestData);

    if (result.Code == 200) {
      commit('setInfo', result.RetObj);
    }

    return result;
  },
  async getSeoInfo({ commit }) {
    const result = await apiGetSiteSeoInfo();

    if (result.Code == 200) {
      commit('setSeo', result.RetObj.SeoList);
    }

    return result;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
