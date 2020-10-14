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
  isAccountOpen: state => state.user.isAccountOpen,
  totalBalance: state => state.user.totalBalance,
  username: state => state.user.username,
  PILevel: state => state.user.PILevel,
  PIBetAmount: state => state.user.PIBetAmount,
  birthday: state => state.user.birthday,
  createdDatetime: state => state.user.createdDatetime,
  currency: state => state.user.currency,
  email: state => state.user.email,
  isEnableRememberOption: state => state.user.isEnableRememberOption,
  hasWithdrawalPassWord: state => state.user.hasWithdrawalPassWord,
  isDemoAccount: state => state.user.isDemoAccount,
  newMailCount: state => state.user.newMailCount,
  fullName: state => state.user.fullName,
  isUsingfirstDeposit: state => state.user.isUsingfirstDeposit,

  bankId1: state => state.user.bankId1,
  bankName1: state => state.user.bankName1,
  bankAccount1: state => state.user.bankAccount1,
  bankBrach1: state => state.user.bankBrach1,
  bankAccountName1: state => state.user.bankAccountName1,

  bankId2: state => state.user.bankId2,
  bankName2: state => state.user.bankName2,
  bankAccount2: state => state.user.bankAccount2,
  bankBrach2: state => state.user.bankBrach2,
  bankAccountName2: state => state.user.bankAccountName2,

  bankId3: state => state.user.bankId3,
  bankName3: state => state.user.bankName3,
  bankAccount3: state => state.user.bankAccount3,
  bankBrach3: state => state.user.bankBrach3,
  bankAccountName3: state => state.user.bankAccountName3,
};
export default getters;
