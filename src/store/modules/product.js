import { apiGetProductList, apiPostProductList } from '@/api/product';

const state = {
  list: [],
};

const mutations = {
  setList(state, list) {
    state.list = list;
  },
};

const actions = {
  async getList({ commit }) {
    const result = await apiGetProductList();
    if (result.Code == 200) {
      commit('setList', result.RetObj);
    }
    return result;
  },
  async postList({ commit }) {
    const result = await apiPostProductList();
    if (result.Code == 200) {
      commit('setList', result.RetObj);
    }
    return result;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
