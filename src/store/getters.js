const getters = {
  siteID: state => state.site.id,
  siteCssClass: state => state.site.cssClass,
  siteCssVersion: state => state.site.cssVersion,
  siteCssType: state => state.site.cssType,
  siteCssFestival: state => state.site.cssFestival,
  siteRemoteCSSUrl: state => state.site.remoteCSSUrl,
  siteMainDomain: state => state.site.mainDomain,
  siteBNewPromotion: state => state.site.bNewPromotion,
  siteFullCss: state => {
    return `${state.site.cssClass}/${state.site.cssVersion}/${state.site.cssType}`;
  },
  resourceUrl: state => {
    return `${state.site.remoteCSSUrl}/ContentStyle/${state.site.mainDomain}/Member/${state.site.cssClass}/${state.site.cssVersion}/2/default/css${state.site.cssType}/common`;
  },
  lang: state => state.lang,
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
