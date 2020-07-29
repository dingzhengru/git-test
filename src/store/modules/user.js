import { setToken, removeToken } from '@/utils/cookie';
import router from '@/router';
import { login, logout } from '@/api/user';

const state = {
  anonymousToken: null,
  token: null,
  publicKey: null,
  isAccessed: false,
  account: null, // 用戶名
  pointAmount: null,
  level: null,
  washcodeAmount: null,
};

const mutations = {
  setAnonymousToken(state, anonymousToken) {
    state.anonymousToken = anonymousToken;
  },
  setToken(state, token) {
    state.token = token;
    setToken(token);
  },
  setPublicKey(state, publicKey) {
    state.publicKey = publicKey;
  },
  setIsAccessed(state, isAccessed) {
    state.isAccessed = isAccessed;
  },
  setAccount(state, account) {
    state.account = account;
  },
  setPointAmount(state, pointAmount) {
    state.pointAmount = pointAmount;
  },
  setLevel(state, level) {
    state.level = level;
  },
  setWashcodeAmount(state, washcodeAmount) {
    state.washcodeAmount = washcodeAmount;
  },
  removeToken() {
    removeToken();
  },
};

const actions = {
  async login({ commit }, user) {
    const responseData = await login(user);

    console.log('[login response]', responseData);

    if (responseData.Code == 200) {
      const token = 'token-hash';
      commit('setToken', token);
      router.replace({ name: 'Home' });
    } else {
      return responseData.ErrMsg;
    }
  },
  async logout({ commit }) {
    await logout();

    commit('removeToken');
    window.location.replace('/login');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
