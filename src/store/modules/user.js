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

const state = {
  info: {},
  pointInfo: {},
  isLoggedIn: null,
  token: null,
  publicKey: null,
};

const mutations = {
  setInfo(state, info) {
    state.info = info;

    //* 目前 info 裡面沒提供 bankName，需由 bankList 去找
    apiGetBankInfoList().then(result => {
      const bank1 = result.RetObj.find(item => item.Lst_BankId == state.info.Lst_BankID_1) || {};
      const bank2 = result.RetObj.find(item => item.Lst_BankId == state.info.Lst_BankID_2) || {};
      const bank3 = result.RetObj.find(item => item.Lst_BankId == state.info.Lst_BankID_3) || {};

      state.info.Lst_BankName_1 = bank1.Lst_BankName || '';
      state.info.Lst_BankName_2 = bank2.Lst_BankName || '';
      state.info.Lst_BankName_3 = bank3.Lst_BankName || '';
    });
  },
  setPointInfo(state, pointInfo) {
    state.pointInfo = pointInfo;
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
    dispatch('getPointInfo');
    return result;
  },
  async getPointInfo({ commit }) {
    const result = await apiGetAllGamePoint();
    commit('setPointInfo', result.RetObj);
    return result;
  },
  async advancedRegisterNew({ commit }, data) {
    //* 開通帳號

    const result = await apiAdvancedRegisterNew(data);
    if (result.Code == 200) {
      commit('setInfo', result.RetObj);
    }
    return result;
  },
  async register({ commit, dispatch }, data) {
    const result = await apiRegister(data);

    if (result.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setInfo', result.RetObj);
      dispatch('getPointInfo');

      router.replace({ name: 'Home' });
    }
    return result;
  },
  async login({ commit, dispatch }, user) {
    const result = await apiLogin(user);

    if (result.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setInfo', result.RetObj);
      dispatch('getPointInfo');
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
