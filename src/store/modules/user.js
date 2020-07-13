import { setToken, removeToken } from '@/utils/cookie';
import router from '@/router';

const state = {
  token: null,
  account: null, // 用戶名
  pointAmount: null,
  level: null,
  washcodeAmount: null,
};

const mutations = {
  setToken(state, token) {
    state.token = token;
    setToken(token);
  },
  setAccount(state, account) {
    state.account = account;
  },
  removeToken() {
    removeToken();
  },
};

const actions = {
  async login({ commit }, user) {
    console.log('user', user);
    const token = 'token-hash';
    commit('setToken', token);
    router.replace({ name: 'Home' });
    return token;
  },
  async logout({ commit }) {
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
