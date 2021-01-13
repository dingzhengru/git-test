import { apiGetSiteInfo, apiGetSiteSeoInfo } from '@/api/site';
import { SITE_DEFAULT_STYLE_CLASS, SITE_DEFAULT_STYLE_TYPE } from '@/settings';

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
  setDefaultStyle(state) {
    state.info.LS_CSS_Class = SITE_DEFAULT_STYLE_CLASS;
    state.info.LS_CSS_Type = SITE_DEFAULT_STYLE_TYPE;
  },
};

const actions = {
  async getInfo({ commit, dispatch }, requestData) {
    const result = await apiGetSiteInfo(requestData);

    if (result.Code == 200) {
      commit('setInfo', result.RetObj);
      const isStyleExist = await dispatch('checkStyleExist');
      if (!isStyleExist) {
        commit('setDefaultStyle');
        console.log(
          `Style not found (${state.info.LS_CSS_Class}/${state.info.LS_CSS_Type}) => Set default style (${SITE_DEFAULT_STYLE_CLASS}/${SITE_DEFAULT_STYLE_TYPE})`
        );
      }
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
  checkStyleExist({ state }) {
    try {
      require(`@/styles/${state.info.LS_CSS_Class}/${state.info.LS_CSS_Type}/_abstracts.scss`);
      return true;
    } catch (e) {
      return false;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
