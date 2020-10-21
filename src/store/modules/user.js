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
  isLoggedIn: false,
  token: null,
  publicKey: null,
  totalBalance: null, //* 總點數

  username: null,
  isAccountOpen: null,
  birthday: null,
  createdDatetime: null,
  currency: null,
  // depositCount: null,
  email: null,
  // isEnablePILevel: null,
  isEnableRememberOption: null,
  hasWithdrawalPassWord: null,
  isDemoAccount: null,
  // line: null,
  // ip: null,
  // mobile: null,
  newMailCount: 0,
  // nickname: null,
  PILevel: 0,
  // PILevelName: null,
  PIBetAmount: 0,
  // point: null,
  // qq: null,
  realName: null,
  // relatedAccount: null,
  // siteId: null,
  // skype: null,
  // status: null,
  // totalDeposit: null,
  // totalWithdrawals: null,
  isUsingfirstDeposit: null,
  // vipLevel: null,
  // withdrawalsNum: null,
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
  setIsEnableRememberOption(state, isEnableRememberOption) {
    state.isEnableRememberOption = isEnableRememberOption;
  },
  setUserInfo(state, info) {
    console.log('[SetUserInfo]', info);

    state.username = info.Lst_Account; //* 帳號
    state.isAccountOpen = info.Lst_Account_Open; //* 帳號是否開通
    state.birthday = info.Lst_Birthday; //* 生日
    state.createdDatetime = info.Lst_Ctime; //* 註冊時間
    state.currency = info.Lst_Currency; //* 幣別
    // state.depositCount = info.Lst_DepositNum; //* 存款次數
    state.email = info.Lst_Email; //* Email
    // state.isEnablePILevel = info.Lst_Enable_PILevel; //* 金管家狀態
    state.isEnableRememberOption = info.Lst_Enable_Remember_Option; //* 手機版記憶帳密
    state.hasWithdrawalPassWord = info.Lst_HasWithdrawalPassWord; //* 是否有登記過取款密碼
    state.isDemoAccount = info.Lst_IsDemoAccount; //* 是否為試玩帳號
    // state.line = info.Lst_Line; //* Line
    // state.ip = info.Lst_Loginip; //* 登入IP
    // state.mobile = info.Lst_Mobile; //* 手機號碼
    state.newMailCount = info.Lst_NewMailCount; //* 新信數量
    // state.nickname = info.Lst_Nickname; //* 暱稱
    state.PILevel = info.Lst_PILevel; //* 金管家等級
    // state.PILevelName = info.Lst_PILevelName; //* 金管家等級
    state.PIBetAmount = info.Lst_PI_BetAmount; //* 累積打碼量
    // state.point = info.Lst_Point; //* 我的錢包點數
    // state.qq = info.Lst_Qq; //*
    state.realName = info.Lst_Realname; //* 真實姓名
    // state.relatedAccount = info.Lst_RelatedAccount; //* 上層代理(推薦人)
    // state.siteId = info.Lst_Siteid; //* 站台
    // state.skype = info.Lst_Skype; //* Skype
    // state.status = info.Lst_Status; //* 狀態
    // state.totalDeposit = info.Lst_TotalDeposit; //* 總存款金額
    // state.totalWithdrawals = info.Lst_TotalWithdrawals; //* 總取款金額
    state.isUsingfirstDeposit = info.Lst_UsingfirstDeposit; //* 是否用過首存優惠
    // state.vipLevel = info.Lst_VIPlevel; //* vip等級
    // state.withdrawalsNum = info.Lst_WithdrawalsNum; //* 取款次數

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
