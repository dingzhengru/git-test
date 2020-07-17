const state = {
  id: null,
  cssClass: null,
  cssVersion: null,
  cssType: null,
  cssFestival: null,
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
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
