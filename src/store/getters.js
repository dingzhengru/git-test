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
  currency: state => state.user.currency,
  createdDatetime: state => state.user.createdDatetime,
  fullName: state => state.user.fullName,
  email: state => state.user.email,
  birthday: state => state.user.birthday,
  bankId1: state => state.user.bankId1,
  bankName1: state => state.user.bankName1,
  bankAccount1: state => state.user.bankAccount1,
  bankBrach1: state => state.user.bankBrach1,
  bankAccountName1: state => state.user.bankAccountName1,
};
export default getters;
