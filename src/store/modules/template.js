
const state = {
  type: null,
  version: null,
  versionNumber: null,
};

const mutations = {
  setType: (state, type) => {
    state.type = type;
  },
  setVersion: (state, version) => {
    state.version = version;
  },
  setVersionNumber: (state, versionNumber) => {
    state.versionNumber = versionNumber;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
