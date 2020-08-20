const state = {
  status: null,
  prompt: null,
};

const mutations = {
  //* installed, notInstalled, installed
  setStatus(state, status) {
    state.status = status;
  },
  setPrompt(state, prompt) {
    state.prompt = prompt;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
