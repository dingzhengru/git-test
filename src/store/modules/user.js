import { setIsLoggedIn, setToken, setPublicKey, removeToken, removePublicKey } from '@/utils/cookie';
import router from '@/router';
import numeral from 'numeral';
import { register, login, logout, getUserInfo } from '@/api/user';

const state = {
  isLoggedIn: false,
  token: null,
  publicKey: null,
  isAccessed: false,
  username: null, // 用戶名
  total: null,
  vip: null,
  roll: null,
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
  setIsAccessed(state, isAccessed) {
    state.isAccessed = isAccessed;
  },
  setUsername(state, username) {
    state.username = username;
  },
  setTotal(state, total) {
    state.total = total;
  },
  setVip(state, vip) {
    state.vip = vip;
  },
  setRoll(state, roll) {
    state.roll = roll;
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
  async getInfo({ commit }) {
    const result = await getUserInfo();
    console.log('[UserInfo]', result.RetObj);
    commit('setUsername', result.RetObj.Lst_Account);
    commit('setTotal', numeral(result.RetObj.Lst_Point).format('0,0.00'));
    commit('setRoll', result.RetObj.Lst_PI_BetAmount);
    commit('setVip', result.RetObj.Lst_PI_Level);
    commit('setIsAccessed', result.RetObj.Lst_Account_Open); // * 設置是否已開通
  },
  async register({ commit }, data) {
    const responseDataRegister = await register(data);

    console.log('[Register Response]', responseDataRegister);

    if (responseDataRegister.Code == 200) {
      commit('setUsername', responseDataRegister.RetObj.Lst_Account);
      commit('setTotal', numeral(responseDataRegister.RetObj.Lst_Point).format('0,0.00'));
      commit('setRoll', responseDataRegister.RetObj.Lst_PI_BetAmount);
      commit('setVip', responseDataRegister.RetObj.Lst_PI_Level);
      commit('setIsAccessed', responseDataRegister.RetObj.Lst_Account_Open); // * 設置是否已開通
      commit('setIsLoggedIn', true);

      router.replace({ name: 'Home' });
      return '';
    } else {
      return responseDataRegister.ErrMsg;
    }
  },
  async login({ commit }, user) {
    const responseDataLogin = await login(user);

    console.log('[Login Response]', responseDataLogin);

    if (responseDataLogin.Code == 200) {
      commit('setUsername', responseDataLogin.RetObj.Lst_Account);
      commit('setTotal', numeral(responseDataLogin.RetObj.Lst_Point).format('0,0.00'));
      commit('setRoll', responseDataLogin.RetObj.Lst_PI_BetAmount);
      commit('setVip', responseDataLogin.RetObj.Lst_PI_Level);
      commit('setIsAccessed', responseDataLogin.RetObj.Lst_Account_Open); // * 設置是否已開通
      commit('setIsLoggedIn', true);
      router.replace({ name: 'Home' });
    }
    return responseDataLogin;
  },
  async logout({ commit }) {
    await logout();

    commit('setIsLoggedIn', false);
    commit('removeToken');
    commit('removePublicKey');
    window.location.replace('/login');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
