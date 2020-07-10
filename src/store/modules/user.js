import { setToken } from '@/utils/cookie';

const state = {
  token: null,
  account: null, // 用戶名
  pointAmount: null,
  level: null,
  washcodeAmount: null,
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
    setToken(token);
  },
  setAccount: (state, account) => {
    state.account = account;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
