import { getSiteInfo } from '@/api/site';

const state = {
  info: {},
  seo: {},
};

const mutations = {
  setInfo(state, info) {
    state.info = info;
  },
};

const actions = {
  async getInfo({ commit }, requestData) {
    const result = await getSiteInfo(requestData);

    console.log('[SiteInfo]', result);
    
    if (result.Code == 200) {
      commit('setInfo', result.RetObj);
    }

    //* 手動設置(測試用)
    // if (process.env.NODE_ENV === 'development ') {
    // commit('setCssClass', 'Y');
    // commit('setCssType', '02');
    // commit('setSiteStatus', 10); //* 手動設置維護
    // }

    return result;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
