const getters = {
  lang: state => state.lang,
  langList: state => state.langList,
  loadingRequestList: state => state.loadingRequestList,

  //* pwa
  pwaInstallStatus: state => state.pwa.status,
  pwaPrompt: state => state.pwa.prompt,

  //* Site
  siteID: state => state.site.info.LS_SiteID,
  siteTitle: state => state.site.info.LS_SiteTitle,
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
  siteIsSpare: state => state.site.info.IsSpare,
  siteEnableSpareDomain: state => state.site.info.EnableSpareDomain,
  siteFullCss: state => {
    return `${state.site.info.LS_CSS_Class}/${state.site.info.LS_CSS_Type}`;
  },
  siteFaviconUrl: state => {
    //* Favicon: {siteResourceUrl}/imgs/favicon/favicon.ico
    return `${state.site.info.RemoteCSSUrls}/ContentStyle/${state.site.info.LS_MainDomain}/Member/${state.site.info.LS_CSS_Class}/${state.site.info.LS_CSS_Version}/2/default/css${state.site.info.LS_CSS_Type}/common/imgs/favicon/favicon.ico`;
  },
  siteLogoUrl: state => {
    //* Logo: {樣式網址}/Site_Uploadfile/{站台ID}/Logo_{裝置}.png
    return `${state.site.info.RemoteCSSUrls}/Site_Uploadfile/${state.site.info.LS_SiteID}/Logo_1.png`;
  },
  siteAppIconUrl: state => size => {
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
  siteResourceUrl: state => {
    return `${state.site.info.RemoteCSSUrls}/ContentStyle/${state.site.info.LS_MainDomain}/Member/${state.site.info.LS_CSS_Class}/${state.site.info.LS_CSS_Version}/2/default/css${state.site.info.LS_CSS_Type}/common`;
  },
  siteResourceUrlMaintain: state => {
    return `${state.site.info.RemoteCSSUrls}/Maintain/${state.site.info.LS_MainDomain}/Member/${state.site.info.LS_CSS_Class}${state.site.info.LS_CSS_Version}/${state.site.info.LS_CSS_Type}//css`;
  },
  siteSeo: state => state.site.seo,

  //* User
  isLoggedIn: state => state.user.isLoggedIn,
  token: state => state.user.token,
  publicKey: state => state.user.publicKey,
  totalBalance: state => state.user.totalBalance,

  //* User info
  username: state => state.user.info.Lst_Account,
  PILevel: state => state.user.info.Lst_PILevel,
  PIBetAmount: state => state.user.info.Lst_PI_BetAmount,
  birthday: state => state.user.info.Lst_Birthday,
  createdDatetime: state => state.user.info.Lst_Ctime,
  currency: state => state.user.info.Lst_Currency,
  email: state => state.user.info.Lst_Email,
  isAccountOpen: state => state.user.info.Lst_Account_Open,
  isEnableRememberOption: state => state.user.info.Lst_Enable_Remember_Option,
  isDemoAccount: state => state.user.info.Lst_IsDemoAccount,
  newMailCount: state => state.user.info.Lst_NewMailCount,
  realName: state => state.user.info.Lst_Realname,
  isUsingfirstDeposit: state => state.user.info.Lst_UsingfirstDeposit,
  bankId1: state => state.user.info.Lst_BankID_1,
  bankName1: state => state.user.info.Lst_BankName_1,
  bankAccount1: state => state.user.info.Lst_BankAccount_1,
  bankBrach1: state => state.user.info.Lst_Bank_Branches_1,
  bankAccountName1: state => state.user.info.Lst_BankAccountName_1,
  bankId2: state => state.user.info.Lst_BankID_2,
  bankName2: state => state.user.info.Lst_BankName_2,
  bankAccount2: state => state.user.info.Lst_BankAccount_2,
  bankBrach2: state => state.user.info.Lst_Bank_Branches_2,
  bankAccountName2: state => state.user.info.Lst_BankAccountName_2,
  bankId3: state => state.user.info.Lst_BankID_3,
  bankName3: state => state.user.info.Lst_BankName_3,
  bankAccount3: state => state.user.info.Lst_BankAccount_3,
  bankBrach3: state => state.user.info.Lst_Bank_Branches_3,
  bankAccountName3: state => state.user.info.Lst_BankAccountName_3,
};
export default getters;
