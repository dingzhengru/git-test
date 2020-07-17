const getters = {
  siteID: state => state.site.id,
  siteCssClass: state => state.site.cssClass,
  siteCssVersion: state => state.site.cssVersion,
  siteCssType: state => state.site.cssType,
  siteCssFestival: state => state.site.cssFestival,
  lang: state => state.lang,
  token: state => state.user.token,
  isAccessed: state => state.user.isAccessed,
  account: state => state.user.account,
  pointAmount: state => state.user.pointAmount,
  level: state => state.user.level,
  washcodeAmount: state => state.user.washcodeAmount,
};
export default getters;
