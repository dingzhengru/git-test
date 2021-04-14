import router from '@/router';
import { apiGetSiteInfo, apiPostSiteInfo, apiGetSiteSeoInfo, apiPreviewModeSwitch } from '@/api/site';
import { cookieSetIsPreview, cookieRemoveIsPreview } from '@/utils/cookie';
// import { SITE_DEFAULT_STYLE_CLASS, SITE_DEFAULT_STYLE_TYPE } from '@/settings';

const state = {
  info: {},
  seo: {},
  setting: {},
  domainRedirect: '', //* 當此網域被封後，要轉移的網域
  isPreview: false,
};

const mutations = {
  setInfo(state, info) {
    state.info = info;
  },
  setSeo(state, seo) {
    state.seo = seo;
  },
  setInfoStyle(state, { siteClass, siteType }) {
    state.info.LS_CSS_Class = siteClass;
    state.info.LS_CSS_Type = siteType;
  },
  setSetting(state, setting) {
    state.setting = setting;
  },
  setDomainRedirect(state, domain) {
    state.domainRedirect = domain;
  },
  setIsPreview(state, isPreview) {
    state.isPreview = isPreview;
    cookieSetIsPreview(isPreview);
  },
  removeIsPreview(state) {
    state.isPreview = false;
    cookieRemoveIsPreview();
  },
};

const actions = {
  async getInfo({ commit }, requestData) {
    const result = await apiGetSiteInfo(requestData);

    if (result.Code == 200) {
      commit('setInfo', result.RetObj);
    }

    return result;
  },
  async postInfo({ commit }, requestData) {
    const result = await apiPostSiteInfo(requestData);
    if (result.Code == 200) {
      commit('setInfo', result.RetObj);
    }
    return result;
  },
  async getSeoInfo({ commit }, requestData) {
    const result = await apiGetSiteSeoInfo(requestData);

    if (result.Code == 200) {
      commit('setSeo', result.RetObj);

      //* Page Title
      document.title = result.RetObj.LS_SiteTitle;

      let seoInfo = {};
      if (router.currentRoute.path.includes('promotion')) {
        seoInfo = result.RetObj.SeoList.find(item => item.Lst_Code == 'pub_Promotion');
      } else if (router.currentRoute.name == 'GameLobby' && router.currentRoute.params.type == 1) {
        //* 真人娛樂
        seoInfo = result.RetObj.SeoList.find(item => item.Lst_Code == 'RYCasinos');
      } else if (router.currentRoute.name == 'GameLobby' && router.currentRoute.params.type == 2) {
        //* 電子遊戲
        seoInfo = result.RetObj.SeoList.find(item => item.Lst_Code == 'RYSlots');
      } else {
        seoInfo = result.RetObj.SeoList.find(item => item.Lst_Code == 'pub_Index');
      }
      document.querySelector('meta[name=description]').setAttribute('content', seoInfo.Lst_SEO_Info.Description);
      document.querySelector('meta[name=keywords]').setAttribute('content', seoInfo.Lst_SEO_Info.Keyword);
    }

    return result;
  },
  checkStyleExist({ state }) {
    try {
      require(`@/styles/${state.info.LS_CSS_Class}/${state.info.LS_CSS_Type}/_abstracts.scss`);
      return true;
    } catch (e) {
      return false;
    }
  },
  async loadSetting({ state, commit }, styleCode) {
    styleCode = styleCode || state.info.LS_CSS_Class;
    const setting = await import(`@/setting/${styleCode}`);
    commit('setSetting', setting.default);
    return setting.default;
  },

  async closePreview({ commit }) {
    const requestData = { PreviewMode: false };
    const result = await apiPreviewModeSwitch(requestData);

    if (result.Code === 200) {
      commit('setIsPreview', false);
      window.location.reload();
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
