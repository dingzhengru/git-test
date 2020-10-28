const getters = {
  lang: state => state.lang,
  loadingRequestList: state => state.loadingRequestList,
  pwaInstallStatus: state => state.pwa.status,
  pwaPrompt: state => state.pwa.prompt,
  siteID: state => state.site.info.LS_SiteID,
  siteCssClass: state => state.site.info.LS_CSS_Class,
  siteCssVersion: state => state.site.info.LS_CSS_Version,
  siteCssType: state => state.site.info.LS_CSS_Type,
  siteCssFestival: state => state.site.info.LS_CSS_Festival,
  siteRemoteCSSUrl: state => state.site.info.RemoteCSSUrls,
  siteMainDomain: state => state.site.info.LS_MainDomain,
  siteIsNewPromotion: state => state.site.info.bNewPromotion,
  siteName: state => state.site.info.LS_SiteName,
  siteIsOpenRememberMe: state => state.site.info.Lst_Open_Remember_Option,
  siteStatus: state => state.site.info.Lst_SiteStatus,
  siteMaintainTimeStart: state => state.site.info.Lst_MaintainTimeStart,
  siteMaintainTimeEnd: state => state.site.info.Lst_MaintainTimeEnd,
  siteIsShowMainNotice: state => state.site.info.MainNotice,
  siteIsShowDepositNotice: state => state.site.info.DepositNotice,
  siteFullCss: state => {
    return `${state.site.info.LS_CSS_Class}/${state.site.info.LS_CSS_Type}`;
  },
  siteLogoUrl: state => {
    //* Logo: {樣式網址}/Site_Uploadfile/{站台ID}/Logo_{裝置}.png
    return `${state.site.info.RemoteCSSUrls}/Site_Uploadfile/${state.site.info.LS_SiteID}/Logo_1.png`;
  },
  siteAppIcon: state => size => {
    //* AppIcon: {樣式網址}/Site_Uploadfile/{站台ID}/AppIcon_{尺寸}.png
    return `${state.site.info.RemoteCSSUrls}/Site_Uploadfile/${state.site.info.LS_SiteID}/AppIcon_${size}.png`;
  },
  siteIOSUrl: state => size => {
    //* IOS過場: {樣式網址}/Site_Uploadfile/{站台ID}/IOS_{尺寸}.png
    return `${state.site.info.RemoteCSSUrls}/Site_Uploadfile/${state.site.info.LS_SiteID}/IOS_${size}.png`;
  },
  siteMainPageNoticeUrl: state => {
    //* 彈跳首頁圖片: {樣式網址}/Site_Uploadfile/{站台ID}/Notice/{語系}/MainPageNotice.png
    return `${state.site.info.RemoteCSSUrls}/Site_Uploadfile/${state.site.info.LS_SiteID}/Notice/${state.lang}/MainPageNotice.png`;
  },
  siteDepositNoticeUrl: state => {
    //* 存款提示圖片: {樣式網址}/Site_Uploadfile/{站台ID}/Notice/{語系}/DepositNotice.png
    return `${state.site.info.RemoteCSSUrls}/Site_Uploadfile/${state.site.info.LS_SiteID}/Notice/${state.lang}/DepositNotice.png`;
  },
  resourceUrl: state => {
    return `${state.site.info.RemoteCSSUrls}/ContentStyle/${state.site.info.LS_MainDomain}/Member/${state.site.info.LS_CSS_Class}/${state.site.info.LS_CSS_Version}/2/default/css${state.site.info.LS_CSS_Type}/common`;
  },
  resourceUrlMaintain: state => {
    return `${state.site.info.RemoteCSSUrls}/Maintain/${state.site.info.LS_MainDomain}/Member/${state.site.info.LS_CSS_Class}${state.site.info.LS_CSS_Version}/${state.site.info.LS_CSS_Type}//css`;
  },
  isLoggedIn: state => state.user.isLoggedIn,
  token: state => state.user.token,
  publicKey: state => state.user.publicKey,
  isAccountOpen: state => state.user.isAccountOpen,
  username: state => state.user.username,
  totalBalance: state => state.user.totalBalance,
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
  realName: state => state.user.realName,
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
