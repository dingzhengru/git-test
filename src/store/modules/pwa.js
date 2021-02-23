const state = {
  status: null,
  prompt: null,
  installTime: 10, //* X秒後設為已下載，因目前無事件可以確認是否安裝完成
  isShowButton: false,
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
  setIsShowButton(state, isShow) {
    state.isShowButton = isShow;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
