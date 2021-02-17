const state = {
  status: null,
  prompt: null,
  installTime: 10, //* X秒後設為已下載，因目前無事件可以確認是否安裝完成
};

const mutations = {
  //* installed, notInstalled, installing
  setStatus(state, status) {
    state.status = status;
  },
  setPrompt(state, prompt) {
    state.prompt = prompt;
  },
  setInstallTime(state, time) {
    state.installTime = time;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
