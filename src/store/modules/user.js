import { setIsLoggedIn, setToken, setPublicKey, removeToken, removePublicKey } from '@/utils/cookie';
import router from '@/router';
import {
  register,
  login,
  logout,
  getUserInfo,
  getTokenAndPublicKey,
  getAllGamePoint,
  getBankInfoList,
} from '@/api/user';

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
  bankId1: null,
  bankName1: null,
  bankAccount1: null,
  bankBrach1: null,
  bankAccountName1: null,
  bankId2: null,
  bankName2: null,
  bankAccount2: null,
  bankBrach2: null,
  bankAccountName2: null,
  bankId3: null,
  bankName3: null,
  bankAccount3: null,
  bankBrach3: null,
  bankAccountName3: null,
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
    state.isAccessed = info.Lst_Account_Open;
    state.username = info.Lst_Account;
    state.roll = info.Lst_PI_BetAmount;
    state.vip = info.Lst_PI_Level;

    state.currency = info.Lst_Currency;
    state.createdDatetime = info.Lst_Ctime;
    state.fullName = info.Lst_Realname;
    state.email = info.Lst_Email;
    state.birthday = info.Lst_Birthday;

    state.bankId1 = info.Lst_BankID_1;
    state.bankName1 = info.Lst_BankName_1 || ''; //* 目前無法從會員資訊中取得，需從 銀行ID 搭配 會員銀行資訊 API 來取得
    state.bankAccount1 = info.Lst_BankAccount_1;
    state.bankBrach1 = info.Lst_Bank_Branches_1;
    state.bankAccountName1 = info.Lst_BankAccountName_1;

    state.bankId2 = info.Lst_BankID_2;
    state.bankName2 = info.Lst_BankName_2 || ''; //* 目前無法從會員資訊中取得，需從 銀行ID 搭配 會員銀行資訊 API 來取得
    state.bankAccount2 = info.Lst_BankAccount_2;
    state.bankBrach2 = info.Lst_Bank_Branches_2;
    state.bankAccountName2 = info.Lst_BankAccountName_2;

    state.bankId2 = info.Lst_BankID_2;
    state.bankName2 = info.Lst_BankName_2 || ''; //* 目前無法從會員資訊中取得，需從 銀行ID 搭配 會員銀行資訊 API 來取得
    state.bankAccount2 = info.Lst_BankAccount_2;
    state.bankBrach2 = info.Lst_Bank_Branches_2;
    state.bankAccountName2 = info.Lst_BankAccountName_2;

    getBankInfoList().then(result => {
      console.log('[BankInfoList]', result.RetObj);

      const bank1 = result.RetObj.find(item => item.Lst_BankId == state.bankId1) || '';
      const bank2 = result.RetObj.find(item => item.Lst_BankId == state.bankId2) || '';
      const bank3 = result.RetObj.find(item => item.Lst_BankId == state.bankId3) || '';

      state.bankName1 = bank1.Lst_BankName || '';
      state.bankName2 = bank2.Lst_BankName || '';
      state.bankName3 = bank3.Lst_BankName || '';
    });

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
    commit('setUserInfo', responseDataUserInfo.RetObj);
    console.log('[UserInfo]', responseDataUserInfo.RetObj);
    return responseDataUserInfo;
  },
  async register({ commit }, data) {
    const responseDataRegister = await register(data);

    console.log('[Register Response]', responseDataRegister);

    if (responseDataRegister.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setUserInfo', responseDataRegister.RetObj);

      router.replace({ name: 'Home' });
    }
    return responseDataRegister;
  },
  async login({ commit }, user) {
    const responseDataLogin = await login(user);

    console.log('[Login Response]', responseDataLogin);

    if (responseDataLogin.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setUserInfo', responseDataLogin.RetObj);
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
