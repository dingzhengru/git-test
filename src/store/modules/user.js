import { setIsLoggedIn, setToken, setPublicKey, removeToken, removePublicKey } from '@/utils/cookie';
import router from '@/router';
import { register, login, logout, getUserInfo, getAllGamePoint } from '@/api/user';

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
  setUserInfo(state, info) {
    console.log('[SetUserInfo]', info);

    //* 設置 userinfo
    state.isAccessed = info.RetObj.Lst_Account_Open; // * 設置是否已開通
    state.username = info.RetObj.Lst_Account;
    state.roll = info.RetObj.Lst_PI_BetAmount;
    state.vip = info.RetObj.Lst_PI_Level;
    // state.total = numeral(info.RetObj.Lst_Point).format('0,0.00');

    //* 上方的總餘額是指錢包的餘額
    getAllGamePoint().then(result => {
      console.log('[SetUserInfo AllGamePoint]', result.RetObj);
      state.total = result.RetObj.TotalBalance;
    });
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
    const responseDataUserInfo = await getUserInfo();
    commit('setUserInfo', responseDataUserInfo);
    console.log('[UserInfo]', responseDataUserInfo.RetObj);
  },
  async register({ commit }, data) {
    const responseDataRegister = await register(data);

    console.log('[Register Response]', responseDataRegister);

    if (responseDataRegister.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setUserInfo', responseDataRegister);

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
      commit('setIsLoggedIn', true);
      commit('setUserInfo', responseDataLogin);
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
