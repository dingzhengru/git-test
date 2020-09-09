import { setIsLoggedIn, setToken, setPublicKey, removeToken, removePublicKey } from '@/utils/cookie';
import router from '@/router';
import { register, login, logout, getUserInfo, getTokenAndPublicKey, getAllGamePoint } from '@/api/user';

const state = {
  isLoggedIn: false,
  token: null,
  publicKey: null,
  isAccessed: null,
  username: null,
  total: null,
  vip: null,
  roll: null,
  currency: null,
  createdDatetime: null,
  fullName: null,
  email: null,
  birthday: null,
  bankId: null,
  bankName: null,
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
    state.isAccessed = info.RetObj.Lst_Account_Open;
    // state.isAccessed = false;
    state.username = info.RetObj.Lst_Account;
    state.roll = info.RetObj.Lst_PI_BetAmount;
    state.vip = info.RetObj.Lst_PI_Level;

    state.currency = info.RetObj.Lst_Currency;
    state.createdDatetime = info.RetObj.Lst_Ctime;
    state.fullName = info.RetObj.Lst_RealName || '';
    state.email = info.RetObj.Lst_Email;
    state.birthday = info.RetObj.Lst_Birthday;
    state.bankId = info.RetObj.Lst_BankID_1;

    getAllGamePoint().then(result => {
      console.log('[SetUserInfo AllGamePoint]', result.RetObj);
      state.total = result.RetObj.TotalBalance;
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
    const responseDataUserInfo = await getUserInfo();
    commit('setUserInfo', responseDataUserInfo);
    console.log('[UserInfo]', responseDataUserInfo.RetObj);
    return responseDataUserInfo;
  },
  async register({ commit }, data) {
    const responseDataRegister = await register(data);

    console.log('[Register Response]', responseDataRegister);

    if (responseDataRegister.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setUserInfo', responseDataRegister);

      router.replace({ name: 'Home' });
    }
    return responseDataRegister;
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
  logout({ commit }) {
    // await logout();

    logout().finally(() => {
      commit('removeToken');
      commit('removePublicKey');
      commit('setIsLoggedIn', false);
      window.location.replace('/login');
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
