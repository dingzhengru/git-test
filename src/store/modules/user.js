import router from '@/router';
import store from '@/store';
import i18n from '@/i18n-lazy';
import {
  cookieSetIsLoggedIn,
  cookieSetToken,
  cookieSetPublicKey,
  cookieRemoveToken,
  cookieRemovePublicKey,
} from '@/utils/cookie';
import {
  apiRegister,
  apiLogin,
  apiLogout,
  apiGetUserInfo,
  apiGetTokenAndPublicKey,
  apiGetAllGamePoint,
  apiAdvancedRegisterNew,
  apiAdvancedRegisterNewApp,
} from '@/api/user';
import { apiTransferAllGamePointToMain, apiTransferPoint } from '@/api/transaction-transfer';
import { apiGetLotteryCount } from '@/api/user';

const state = {
  info: {},
  // bankList: [],
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
  // setBankList(state, bankList) {
  //   state.bankList = bankList;
  // },
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
  setIsEnableRememberOption(state, isRemember) {
    state.info.Lst_Enable_Remember_Option = isRemember;
  },
};

const actions = {
  async getTokenAndPublicKey({ commit }) {
    const result = await apiGetTokenAndPublicKey();
    if (result.Code === 200) {
      commit('setToken', result.RetObj.token);
      commit('setPublicKey', result.RetObj.publickey);
    }
    return result;
  },
  async getInfo({ commit, dispatch }) {
    const result = await apiGetUserInfo();
    if (result.Code === 200) {
      commit('setInfo', result.RetObj);
      // dispatch('getBankList');
      dispatch('getPointInfo');
      dispatch('getLotteryCountList');
    }
    return result;
  },
  // async getBankList({ commit }) {
  //   const result = await apiGetBankInfoList();
  //   if (result.Code === 200) {
  //     commit('setBankList', result.RetObj);
  //   }
  //   return result;
  // },
  async getPointInfo({ commit }) {
    const result = await apiGetAllGamePoint();
    if (result.Code === 200) {
      commit('setPointInfo', result.RetObj);
    }
    return result;
  },
  async getLotteryCountList({ commit }) {
    const result = await apiGetLotteryCount();
    if (result.Code === 200) {
      commit('setLotteryCountList', result.RetObj);
    }
    return result;
  },
  async transferAllPointToMain({ commit }) {
    const result = await apiTransferAllGamePointToMain();
    if (result.Code === 200) {
      commit('setPointInfo', result.RetObj);

      if (store.getters.siteIsLandscape === false) {
        window.alert(result.RetObj.MsgString);
      } else {
        store.dispatch('openModalAlert', result.RetObj.MsgString);
      }
    }
    return result;
  },
  async transferPoint({ commit }, data) {
    const result = await apiTransferPoint(data);
    if (result.Code === 200) {
      commit('setPointInfo', result.RetObj);

      if (store.getters.siteIsLandscape === false) {
        window.alert(i18n.t('alert.transferSuccess'));
      } else {
        store.dispatch('openModalAlert', i18n.t('alert.transferSuccess'));
      }
    }
    return result;
  },
  async changeUserProfile({ commit }, data) {
    //* 修改會員資料
    let result = {};
    if (store.siteIsLandscape) {
      result = await apiAdvancedRegisterNewApp(data);
    } else {
      result = await apiAdvancedRegisterNew(data);
    }

    if (result.Code === 200) {
      commit('setInfo', result.RetObj);
      // dispatch('getBankList');
    }
    return result;
  },
  async register({ commit, dispatch }, data) {
    const result = await apiRegister(data);

    if (result.Code == 200) {
      commit('setIsLoggedIn', true);
      commit('setInfo', result.RetObj);
      // dispatch('getBankList');
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
      // dispatch('getBankList');
      dispatch('getPointInfo');
      dispatch('getLotteryCountList');
      router.replace({ name: 'Home' }).catch(() => {});
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
