import {
  setIsLoggedIn,
  setToken,
  setPublicKey,
  removeToken,
  removePublicKey,
} from '@/utils/cookie';
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
  Lst_IsDemoAccount: null, //* 是否為試玩帳號
  Lst_UsingfirstDeposit: null, //* 是否用過首存優惠
  Lst_Enable_Remember_Option: null, //* 手機版記憶帳密
  Lst_HasWithdrawalPassWord: null, //* 是否有登記過取款密碼
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
  setLst_Enable_Remember_Option(state, Lst_Enable_Remember_Option) {
    state.Lst_Enable_Remember_Option = Lst_Enable_Remember_Option;
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

    state.Lst_IsDemoAccount = info.Lst_IsDemoAccount; //* 是否為試玩帳號
    state.Lst_UsingfirstDeposit = info.Lst_UsingfirstDeposit; //* 是否用過首存優惠
    state.Lst_Enable_Remember_Option = info.Lst_Enable_Remember_Option; //* 手機版記憶帳密
    state.Lst_HasWithdrawalPassWord = info.Lst_HasWithdrawalPassWord; //* 是否有登記過取款密碼

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

    state.bankId3 = info.Lst_BankID_3;
    state.bankName3 = info.Lst_BankName_3 || ''; //* 目前無法從會員資訊中取得，需從 銀行ID 搭配 會員銀行資訊 API 來取得
    state.bankAccount3 = info.Lst_BankAccount_3;
    state.bankBrach3 = info.Lst_Bank_Branches_3;
    state.bankAccountName3 = info.Lst_BankAccountName_3;

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
  setIsAccessed(state, isAccessed) {
    state.isAccessed = isAccessed;
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
    console.log('[UserInfo]', result.RetObj);
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
