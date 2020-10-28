import { setIsLoggedIn, setToken, setPublicKey, removeToken, removePublicKey } from '@/utils/cookie';
import router from '@/router';
import i18n from '@/i18n';
import {
  register,
  login,
  logout,
  getUserInfo,
  getTokenAndPublicKey,
  getAllGamePoint,
  getBankInfoList,
  advancedRegisterNew,
} from '@/api/user';

const state = {
  info: {},
  isLoggedIn: false,
  token: null,
  publicKey: null,
  totalBalance: null, //* 總點數
};

const mutations = {
  setIsLoggedIn(state, isLoggedIn) {
    state.isLoggedIn = isLoggedIn;
    setIsLoggedIn(isLoggedIn);
  },
  setToken(state, token) {
    state.token = token;
    setToken(token);
  },
  setPublicKey(state, publicKey) {
    state.publicKey = publicKey;
    setPublicKey(publicKey);
  },
  setUserInfo(state, info) {
    console.log('[SetUserInfo]', info);

    state.info = info;

    getBankInfoList().then(result => {
      console.log('[SetUserInfo BankInfoList]', result.RetObj);

      const bank1 = result.RetObj.find(item => item.Lst_BankId == state.bankId1) || '';
      const bank2 = result.RetObj.find(item => item.Lst_BankId == state.bankId2) || '';
      const bank3 = result.RetObj.find(item => item.Lst_BankId == state.bankId3) || '';

      state.info.bankName1 = bank1.Lst_BankName || '';
      state.info.bankName2 = bank2.Lst_BankName || '';
      state.info.bankName3 = bank3.Lst_BankName || '';
    });

    getAllGamePoint().then(result => {
      console.log('[SetUserInfo AllGamePoint]', result.RetObj.TotalBalance);
      state.totalBalance = result.RetObj.TotalBalance;
    });
  },
  removeToken(state) {
    state.token = null;
    removeToken();
  },
  removePublicKey(state) {
    state.publicKey = null;
    removePublicKey();
  },
};

const actions = {
  async getTokenAndPublicKey({ commit }) {
    const result = await getTokenAndPublicKey();
    commit('setToken', result.RetObj.token);
    commit('setPublicKey', result.RetObj.publickey);
    return result;
  },
  async getInfo({ commit }) {
    const result = await getUserInfo();
    commit('setUserInfo', result.RetObj);
    return result;
  },
  async advancedRegisterNew({ commit }, data) {
    //* 開通帳號

    const result = await advancedRegisterNew(data);
    if (result.Code == 200) {
      commit('setUserInfo', result.RetObj);
      alert(i18n.t('user.profile.notAccessed.alert.access-success'));
    }
    return result;
  },
  async register({ commit }, data) {
    const result = await register(data);

    console.log('[Register Response]', result);

    if (result.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setUserInfo', result.RetObj);

      router.replace({ name: 'Home' });
    }
    return result;
  },
  async login({ commit }, user) {
    const result = await login(user);

    console.log('[Login Response]', result);

    if (result.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setUserInfo', result.RetObj);
      router.replace({ name: 'Home' });
    }
    return result;
  },
  async logout({ commit }) {
    try {
      await logout();
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
