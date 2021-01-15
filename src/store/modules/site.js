import { apiGetSiteInfo, apiGetSiteSeoInfo } from '@/api/site';
import { SITE_DEFAULT_STYLE_CLASS, SITE_DEFAULT_STYLE_TYPE } from '@/settings';

const state = {
  info: {},
  seo: {},
  setting: {},
};

const mutations = {
  setInfo(state, info) {
    state.info = info;
  },
  setSeo(state, seo) {
    state.seo = seo;
  },
  setInfoStyle(state, { siteClass, siteType }) {
    state.info.LS_CSS_Class = siteClass;
    state.info.LS_CSS_Type = siteType;
  },
  setSetting(state, setting) {
    state.setting = setting;
  },
};

const actions = {
  async getInfo({ commit, dispatch }, requestData) {
    const result = await apiGetSiteInfo(requestData);

    if (result.Code == 200) {
      commit('setInfo', result.RetObj);
      const isStyleExist = await dispatch('checkStyleExist');
      if (!isStyleExist) {
        commit('setInfoStyle', { siteClass: SITE_DEFAULT_STYLE_CLASS, siteType: SITE_DEFAULT_STYLE_TYPE });
        console.log(
          `Style not found (${state.info.LS_CSS_Class}/${state.info.LS_CSS_Type}) => Set default style (${SITE_DEFAULT_STYLE_CLASS}/${SITE_DEFAULT_STYLE_TYPE})`
        );
      }

      //* 手動設置 style
      // if (process.env.NODE_ENV != 'production') {
      //   commit('setInfoStyle', { siteClass: 'Y', siteType: '03' });
      //   console.log(state.info.LS_CSS_Class, state.info.LS_CSS_Type);
      // }
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
  async loadSetting({ state, commit }) {
    const setting = await import(`@/setting/${state.info.LS_CSS_Class}`);
    commit('setSetting', setting.default);
    return setting.default;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
