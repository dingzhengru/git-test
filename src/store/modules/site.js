import { getSiteInfo } from '@/api/site';

const state = {
  id: null,
  cssClass: null,
  cssVersion: null,
  cssType: null,
  cssFestival: null,
  mainDomain: null,
  remoteCSSUrl: null,
  isNewPromotion: false,
  siteName: null,
  isOpenRememberMe: false,
};

const mutations = {
  setID(state, id) {
    state.id = id;
  },
  setCssClass(state, cssClass) {
    state.cssClass = cssClass;
  },
  setCssVersion(state, cssVersion) {
    state.cssVersion = cssVersion;
  },
  setCssType(state, cssType) {
    state.cssType = cssType;
  },
  setCssFestival(state, cssFestival) {
    state.cssFestival = cssFestival;
  },
  setMainDomain(state, mainDomain) {
    state.mainDomain = mainDomain;
  },
  setRemoteCSSUrl(state, remoteCSSUrl) {
    state.remoteCSSUrl = remoteCSSUrl;
  },
  setIsNewPromotion(state, isNewPromotion) {
    state.isNewPromotion = isNewPromotion;
  },
  setSiteName(state, siteName) {
    state.siteName = siteName;
  },
  setIsOpenRememberMe(state, isOpenRememberMe) {
    state.isOpenRememberMe = isOpenRememberMe;
  },
};

const actions = {
  async getInfo({ commit }) {
    const requestData = { DeviceType: 1 };
    const result = await getSiteInfo(requestData);

    console.log('[SiteInfo]', result);

    if (result.Code == 200) {
      commit('setID', result.RetObj.LS_SiteID);
      commit('setCssClass', result.RetObj.LS_CSS_Class);
      commit('setCssVersion', result.RetObj.LS_CSS_Version);
      commit('setCssType', result.RetObj.LS_CSS_Type);
      commit('setCssFestival', result.RetObj.LS_CSS_Festival);
      commit('setMainDomain', result.RetObj.LS_MainDomain);
      commit('setRemoteCSSUrl', result.RetObj.RemoteCSSUrls);
      commit('setIsNewPromotion', result.RetObj.bNewPromotion);
      commit('setSiteName', result.RetObj.LS_SiteName);
      commit('setIsOpenRememberMe', result.RetObj.Lst_Open_Remember_Option);
    }

    //* 手動設置(測試用)
    // commit('setCssClass', 'Y');
    // commit('setCssType', '02');

    return result;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
