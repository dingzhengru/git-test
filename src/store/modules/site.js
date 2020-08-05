const state = {
  id: null,
  cssClass: null,
  cssVersion: null,
  cssType: null,
  cssFestival: null,
  mainDomain: null,
  remoteCSSUrl: null,
  isNewPromotion: null,
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
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
