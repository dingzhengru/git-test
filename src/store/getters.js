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
  siteName: state => state.site.siteName,
  siteIsOpenRememberMe: state => state.site.isOpenRememberMe,
  siteStatus: state => state.site.siteStatus,
  siteMaintainTimeStart: state => state.site.maintainTimeStart,
  siteMaintainTimeEnd: state => state.site.maintainTimeEnd,
  siteIsShowMainNotice: state => state.site.mainNotice,
  siteIsShowDepositNotice: state => state.site.depositNotice,
  siteFullCss: state => {
    return `${state.site.cssClass}/${state.site.cssType}`;
  },
  siteLogoUrl: state => {
    //* Logo: {樣式網址}/Site_Uploadfile/{站台ID}/Logo_{裝置}.png
    return `${state.site.remoteCSSUrl}/Site_Uploadfile/${state.site.id}/Logo_1.png`;
  },
  siteAppIcon: state => size => {
    //* AppIcon: {樣式網址}/Site_Uploadfile/{站台ID}/AppIcon_{尺寸}.png
    return `${state.site.remoteCSSUrl}/Site_Uploadfile/${state.site.id}/AppIcon_${size}.png`;
  },
  siteIOSUrl: state => size => {
    //* IOS過場: {樣式網址}/Site_Uploadfile/{站台ID}/IOS_{尺寸}.png
    return `${state.site.remoteCSSUrl}/Site_Uploadfile/${state.site.id}/IOS_${size}.png`;
  },
  siteMainPageNoticeUrl: state => {
    //* 彈跳首頁圖片: {樣式網址}/Site_Uploadfile/{站台ID}/Notice/{語系}/MainPageNotice.png
    return `${state.site.remoteCSSUrl}/Site_Uploadfile/${state.site.id}/Notice/${state.lang}/MainPageNotice.png`;
  },
  siteDepositNoticeUrl: state => {
    //* 存款提示圖片: {樣式網址}/Site_Uploadfile/{站台ID}/Notice/{語系}/DepositNotice.png
    return `${state.site.remoteCSSUrl}/Site_Uploadfile/${state.site.id}/Notice/${state.lang}/MainPageNotice.png`;
  },
  resourceUrl: state => {
    return `${state.site.remoteCSSUrl}/ContentStyle/${state.site.mainDomain}/Member/${state.site.cssClass}/${state.site.cssVersion}/2/default/css${state.site.cssType}/common`;
  },
  resourceUrlMaintain: state => {
    return `${state.site.remoteCSSUrl}/Maintain/${state.site.mainDomain}/Member/${state.site.cssClass}${state.site.cssVersion}/${state.site.cssType}//css`;
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
  isDemoAccount: state => state.user.isDemoAccount,
  isUsingfirstDeposit: state => state.user.isUsingfirstDeposit,
  isEnableRememberOption: state => state.user.isEnableRememberOption,
  hasWithdrawalPassWord: state => state.user.hasWithdrawalPassWord,
};
export default getters;
