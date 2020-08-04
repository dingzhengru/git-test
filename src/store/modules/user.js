import { setIsLoggedIn } from '@/utils/cookie';
import router from '@/router';
import { login, logout } from '@/api/user';

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
  },
  setPublicKey(state, publicKey) {
    state.publicKey = publicKey;
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
};

const actions = {
  // async register({ commit }, data) {
  //   const responseData = await register(data);

  //   console.log('[Register Response]', responseData);

  //   if (responseData.Code == 200) {
  //     router.replace({ name: 'Login' });
  //   } else {
  //     return responseData.ErrMsg;
  //   }
  // },
  async login({ commit }, user) {
    const responseData = await login(user);

    console.log('[Login Response]', responseData);

    if (responseData.Code == 200) {
      commit('setIsLoggedIn', true);
      router.replace({ name: 'Home' });
    } else {
      return responseData.ErrMsg;
    }
  },
  async logout({ commit }) {
    await logout();

    commit('setIsLoggedIn', false);
    window.location.replace('/login');
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
