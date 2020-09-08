const getters = {
  lang: state => state.lang,
  loadingRequestList: state => state.loadingRequestList,
  pwaInstallStatus: state => state.pwa.status,
  pwaPrompt: state => state.pwa.prompt,
  siteID: state => state.site.id,
  siteCssClass: state => state.site.cssClass,
  siteCssVersion: state => state.site.cssVersion,
  siteCssType: state => state.site.cssType,
  siteCssFestival: state => state.site.cssFestival,
  siteRemoteCSSUrl: state => state.site.remoteCSSUrl,
  siteMainDomain: state => state.site.mainDomain,
  siteIsNewPromotion: state => state.site.isNewPromotion,
  siteFullCss: state => {
    return `${state.site.cssClass}/${state.site.cssType}`;
  },
  resourceUrl: state => {
    return `${state.site.remoteCSSUrl}/ContentStyle/${state.site.mainDomain}/Member/${state.site.cssClass}/${state.site.cssVersion}/2/default/css${state.site.cssType}/common`;
  },
  isLoggedIn: state => state.user.isLoggedIn,
  token: state => state.user.token,
  publicKey: state => state.user.publicKey,
  isAccessed: state => state.user.isAccessed,
  username: state => state.user.username,
  total: state => state.user.total,
  vip: state => state.user.vip,
  roll: state => state.user.roll,
};
export default getters;
