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
  isLoggedIn: null,
  token: null,
  publicKey: null,
  totalBalance: null, //* 總點數
};

const mutations = {
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
  setTotalBalance(state, totalBalance) {
    state.totalBalance = totalBalance;
  },
  setUserInfo(state, info) {
    state.info = info;

    apiGetBankInfoList().then(result => {
      const bank1 = result.RetObj.find(item => item.Lst_BankId == state.bankId1) || '';
      const bank2 = result.RetObj.find(item => item.Lst_BankId == state.bankId2) || '';
      const bank3 = result.RetObj.find(item => item.Lst_BankId == state.bankId3) || '';

      state.info.bankName1 = bank1.Lst_BankName || '';
      state.info.bankName2 = bank2.Lst_BankName || '';
      state.info.bankName3 = bank3.Lst_BankName || '';
    });

    apiGetAllGamePoint().then(result => {
      state.totalBalance = result.RetObj.TotalBalance;
    });
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
  async getInfo({ commit }) {
    const result = await apiGetUserInfo();
    commit('setUserInfo', result.RetObj);
    return result;
  },
  async advancedRegisterNew({ commit }, data) {
    //* 開通帳號

    const result = await apiAdvancedRegisterNew(data);
    if (result.Code == 200) {
      commit('setUserInfo', result.RetObj);
    }
    return result;
  },
  async register({ commit }, data) {
    const result = await apiRegister(data);

    if (result.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setUserInfo', result.RetObj);

      router.replace({ name: 'Home' });
    }
    return result;
  },
  async login({ commit }, user) {
    const result = await apiLogin(user);

    if (result.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setUserInfo', result.RetObj);
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
