const getters = {
  siteID: state => state.site.id,
  siteCssClass: state => state.site.cssClass,
  siteCssVersion: state => state.site.cssVersion,
  siteCssType: state => state.site.cssType,
  siteCssFestival: state => state.site.cssFestival,
  siteRemoteCSSUrl: state => state.site.remoteCSSUrl,
  siteMainDomain: state => state.site.mainDomain,
  siteFullCss: state => {
    return `${state.site.cssClass}/${state.site.cssVersion}/${state.site.cssType}`;
  },
  resourceUrl: state => {
    return `${state.site.remoteCSSUrl}/ContentStyle/${state.site.mainDomain}/Member/${state.site.cssClass}/${state.site.cssVersion}/2/default/css${state.site.cssType}/common`;
  },
  lang: state => state.lang,
  token: state => state.user.token,
  isAccessed: state => state.user.isAccessed,
  account: state => state.user.account,
  pointAmount: state => state.user.pointAmount,
  level: state => state.user.level,
  washcodeAmount: state => state.user.washcodeAmount,
};
export default getters;
