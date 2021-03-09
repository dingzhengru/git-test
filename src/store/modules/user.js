import {
  cookieSetIsLoggedIn,
  cookieSetToken,
  cookieSetPublicKey,
  cookieRemoveToken,
  cookieRemovePublicKey,
} from '@/utils/cookie';
import router from '@/router';
import {
  apiRegister,
  apiLogin,
  apiLogout,
  apiGetUserInfo,
  apiGetTokenAndPublicKey,
  apiGetAllGamePoint,
  apiGetBankInfoList,
  apiAdvancedRegisterNew,
} from '@/api/user';
import { apiTransferAllGamePointToMain } from '@/api/transaction-transfer';
import { apiGetLotteryCount } from '@/api/user';

const state = {
  info: {},
  bankList: [],
  pointInfo: {},
  lotteryCountList: [],
  isLoggedIn: null,
  token: null,
  publicKey: null,
};

const mutations = {
  setInfo(state, info) {
    state.info = info;
  },
  setBankList(state, bankList) {
    state.bankList = bankList;
  },
  setPointInfo(state, pointInfo) {
    state.pointInfo = pointInfo;
  },
  setLotteryCountList(state, list) {
    state.lotteryCountList = list;
  },
  setIsLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
    cookieSetIsLoggedIn(isLoggedIn);
  },
  setToken(state, token) {
    state.token = token;
    cookieSetToken(token);
  },
  setPublicKey(state, publicKey) {
    state.publicKey = publicKey;
    cookieSetPublicKey(publicKey);
  },
  removeToken(state) {
    state.token = null;
    cookieRemoveToken();
  },
  removePublicKey(state) {
    state.publicKey = null;
    cookieRemovePublicKey();
  },
};

const actions = {
  async getTokenAndPublicKey({ commit }) {
    const result = await apiGetTokenAndPublicKey();
    commit('setToken', result.RetObj.token);
    commit('setPublicKey', result.RetObj.publickey);
    return result;
  },
  async getInfo({ commit, dispatch }) {
    const result = await apiGetUserInfo();
    commit('setInfo', result.RetObj);
    dispatch('getBankList');
    dispatch('getPointInfo');
    dispatch('getLotteryCountList');
    return result;
  },
  async getBankList({ commit }) {
    const result = await apiGetBankInfoList();
    commit('setBankList', result.RetObj);
    return result;
  },
  async getPointInfo({ commit }) {
    const result = await apiGetAllGamePoint();
    commit('setPointInfo', result.RetObj);
    return result;
  },
  async getLotteryCountList({ commit }) {
    const result = await apiGetLotteryCount();
    commit('setLotteryCountList', result.RetObj);
    return result;
  },
  async transferAllPointToMain({ commit }) {
    const result = await apiTransferAllGamePointToMain();
    commit('setPointInfo', result.RetObj);
    return result;
  },
  async changeUserProfile({ commit, dispatch }, data) {
    //* 修改會員資料
    const result = await apiAdvancedRegisterNew(data);
    if (result.Code === 200) {
      commit('setInfo', result.RetObj);
      dispatch('getBankList');
    }
    return result;
  },
  async register({ commit, dispatch }, data) {
    const result = await apiRegister(data);

    if (result.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setInfo', result.RetObj);
      dispatch('getBankList');
      dispatch('getPointInfo');
      dispatch('getLotteryCountList');

      router.replace({ name: 'Home' });
    }
    return result;
  },
  async login({ commit, dispatch }, user) {
    const result = await apiLogin(user);

    if (result.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setInfo', result.RetObj);
      dispatch('getBankList');
      dispatch('getPointInfo');
      dispatch('getLotteryCountList');
      router.replace({ name: 'Home' });
    }
    return result;
  },
  async logout({ commit }) {
    try {
      await apiLogout();
    } finally {
      commit('removeToken');
      commit('removePublicKey');
      commit('setIsLoggedIn', false);
      window.location.replace('/login');
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
