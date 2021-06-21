import { API_URL } from '@/settings';

const getters = {
  lang: state => state.lang,
  langList: state => state.langList,
  langName: state =>
    state.langList.length > 0 ? state.langList.find(item => item.Lst_Locales_Code === state.lang).Lst_Locales_Name : '',
  loadingList: state => state.loadingList,

  //* 當 siteinfo 在 LoadingList 中的時候 (用於判斷是否顯示網頁)
  loadingListIncludeSiteInfo: state => state.loadingList.includes('/api/Siteinfo/getinfo'),

  //* Logo 處的標題 (Z版)
  pageTitle: state => state.pageTitle,

  //* 是否顯示至頂的按鈕
  isShowGoTopButton: state => state.isShowGoTopButton,

  //* pwa
  pwaInstallStatus: state => state.pwa.status,
  pwaPrompt: state => state.pwa.prompt,
  pwaInstallTime: state => state.pwa.installTime,
  pwaIsShowButton: state => state.pwa.isShowButton,

  //* modal
  modalTransferIsShow: state => state.modalTransferIsShow,
  modalTransferProduct: state => state.modalTransferProduct,
  modalWinWheelIsShow: state => state.modalWinWheelIsShow,
  modalRedEnvelopeIsShow: state => state.modalRedEnvelopeIsShow,
  modalMessageSiteBlockedIsShow: state => state.modalMessageSiteBlockedIsShow,
  modalMessageApkDownloadIsShow: state => state.modalMessageApkDownloadIsShow,

  //* 橫版
  modalLangIsShow: state => state.modalLangIsShow,
  modalAuthIsShow: state => state.modalAuthIsShow,
  modalContactIsShow: state => state.modalContactIsShow,
  modalAlertIsShow: state => state.modalAlertIsShow,
  modalAlertText: state => state.modalAlertText,

  //* Site.setting
  siteSetting: state => state.site.setting,

  //* 判斷是否維護
  siteIsActive: state => state.site.info.Lst_SiteStatus === 0,
  siteIsMaintain: state => state.site.info.Lst_SiteStatus === 10,
  siteIsClosed: state => state.site.info.Lst_SiteStatus === 20,

  //* Site.info
  siteID: state => state.site.info.LS_SiteID,
  siteTitle: state => state.site.info.LS_SiteTitle,
  siteLang: state => state.site.info.LS_Language,
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
  sitePopLinkList: state => state.site.info.SitePopLinkList,
  siteIsSpare: state => state.site.info.IsSpare,
  siteEnableSpareDomain: state => state.site.info.EnableSpareDomain,
  siteIsMultiStyle: state => state.site.info.MultiStyle,
  siteMultiStyleId: state => state.site.info.Lst_MultiStyleID,
  siteWalletType: state => state.site.info.WalletType,
  siteIsPortrait: state => state.site.info.IsPortrait,
  siteAPKLink: state => state.site.info.APKLink,

  siteIsLandscape: state => !state.site.info.IsPortrait,
  siteIsWalletTypeNoTransfer: state => state.site.info.WalletType === 2,
  siteNoticeLinkMain: (state, getters) => {
    return getters.sitePopLinkList ? getters.sitePopLinkList.find(item => item.PageType === 1) || {} : {};
  },
  siteNoticeLinkDeposit: (state, getters) => {
    return getters.sitePopLinkList ? getters.sitePopLinkList.find(item => item.PageType === 2) || {} : {};
  },
  siteFullCss: state => {
    return `${state.site.info.LS_CSS_Class}/${state.site.info.LS_CSS_Type}`;
  },
  siteManifestUrl: () => {
    return `${API_URL}/Siteinfo/ManifestJson`;
  },
  siteFaviconUrl: (state, getters) => {
    //* Favicon: {樣式網址}/Site_Uploadfile/{站台ID}/FavoriteIcon.ico
    if (getters.siteIsMultiStyle && getters.siteMultiStyleId > 0) {
      return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/${getters.siteID}/${getters.siteMultiStyleId}/FavoriteIcon.ico`;
    }
    return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/${getters.siteID}/FavoriteIcon.ico`;
  },
  siteLogoUrl: (state, getters) => {
    //* Logo: {樣式網址}/Site_Uploadfile/{站台ID}/Logo_{裝置}.png
    const device = getters.siteIsLandscape ? 2 : 1;
    if (getters.siteIsMultiStyle && getters.siteMultiStyleId > 0) {
      return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/${getters.siteID}/${getters.siteMultiStyleId}/Logo_${device}.png`;
    }
    return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/${getters.siteID}/Logo_${device}.png`;
  },
  siteAppIconUrl: (state, getters) => size => {
    //* AppIcon: {樣式網址}/Site_Uploadfile/{站台ID}/AppIcon_{尺寸}.png
    if (getters.siteIsMultiStyle && getters.siteMultiStyleId > 0) {
      return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/${getters.siteID}/${getters.siteMultiStyleId}/AppIcon_${size}.png`;
    }
    return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/${getters.siteID}/AppIcon_${size}.png`;
  },
  siteIOSUrl: (state, getters) => size => {
    //* IOS過場: {樣式網址}/Site_Uploadfile/{站台ID}/IOS_{尺寸}.png
    if (getters.siteIsMultiStyle && getters.siteMultiStyleId > 0) {
      return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/${getters.siteID}/${getters.siteMultiStyleId}/IOS_${size}.png`;
    }
    return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/${getters.siteID}/IOS_${size}.png`;
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
  siteProductImage: (state, getters) => product => {
    return `${getters.siteResourceUrl}/imgs/game/game${product.Lst_Product_id}-0${product.Lst_Game_Classify}-01.png`;
  },
  siteProductImagePortrait: (state, getters) => product => {
    return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/${getters.siteID}/ProductImg/${product.Lst_Product_Proxy_Tag}_1.png`;
  },
  siteProductImageLandscape: (state, getters) => product => {
    return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/${getters.siteID}/ProductImg/${product.Lst_Product_Proxy_Tag}_2_1.png`;
  },
  siteProductImageLandscapeSmall: (state, getters) => product => {
    return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/${getters.siteID}/ProductImg/${product.Lst_Product_Proxy_Tag}_2_2.png`;
  },
  siteProductImagePortraitDefault: (state, getters) => product => {
    return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/2/ProductImg/${product.Lst_Product_Proxy_Tag}_1.png`;
  },
  siteProductImageLandscapeDefault: (state, getters) => product => {
    return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/2/ProductImg/${product.Lst_Product_Proxy_Tag}_2_1.png`;
  },
  siteProductImageLandscapeSmallDefault: (state, getters) => product => {
    return `${getters.siteRemoteCSSUrl}/Site_Uploadfile/2/ProductImg/${product.Lst_Product_Proxy_Tag}_2_2.png`;
  },
  siteLotteryButtonBgWinWheel: (state, getters) => {
    return `${getters.siteResourceUrl}/imgs/ad/rotaryTable.png`;
  },
  siteLotteryButtonBgRedEnvelope: (state, getters) => {
    return `${getters.siteResourceUrl}/imgs/ad/luckyDraw.png`;
  },

  //* site.seo
  siteSeo: state => state.site.seo,
  siteSeoList: state => state.site.seo.SeoList,
  siteSeoTitle: state => state.site.seo.LS_SiteTitle,

  siteDomainRedirect: state => state.site.domainRedirect,

  siteIsPreview: state => state.site.isPreview,

  //* User
  userIsLoggedIn: state => state.user.isLoggedIn,
  userToken: state => state.user.token,
  userPublicKey: state => state.user.publicKey,

  //* User.pointInfo
  userTotalBalance: state => state.user.pointInfo.TotalBalance,
  userGamePointList: state => state.user.pointInfo.GameSitePoints || [],
  userGamePointWallet: state => {
    return state.user.pointInfo && state.user.pointInfo.GameSitePoints
      ? state.user.pointInfo.GameSitePoints.find(item => item.Product_id == 9999)
      : {};
  },
  userGamePointById: state => id => {
    return state.user.pointInfo && state.user.pointInfo.GameSitePoints
      ? state.user.pointInfo.GameSitePoints.find(item => item.Product_id == id)
      : {};
  },

  //* User.lotteryCountList
  userLotteryCountWinWheel: state => state.user.lotteryCountList.find(item => item.Type == 0) || {},
  userLotteryCountRedEnvelope: state => state.user.lotteryCountList.find(item => item.Type == 1) || {},

  //* User info
  userInfo: state => state.user.info,
  userAccount: state => state.user.info.Lst_Account,
  userPILevel: state => state.user.info.Lst_PILevel,
  userVIPLevel: state => state.user.info.Lst_VIPlevel,
  userVIPLevelName: state => state.user.info.Lst_VIPlevelName,
  userPIBetAmount: state => state.user.info.Lst_PI_BetAmount,
  userBindBank: state => state.user.info.Lst_BindAccount,
  userHasWithdrawalPassWord: state => state.user.info.Lst_HasWithdrawalPassWord,
  userBirthday: state => state.user.info.Lst_Birthday,
  userCreatedDatetime: state => state.user.info.Lst_Ctime,
  userCurrency: state => state.user.info.Lst_Currency,
  userEmail: state => state.user.info.Lst_Email,
  userRealName: state => state.user.info.Lst_Realname,
  userNickname: state => state.user.info.Lst_Nickname,
  userMobile: state => state.user.info.Lst_Mobile,
  userIsAccountOpen: state => state.user.info.Lst_Account_Open,
  userIsEnableRememberOption: state => state.user.info.Lst_Enable_Remember_Option,
  userIsDemoAccount: state => state.user.info.Lst_IsDemoAccount,
  userNewMailCount: state => state.user.info.Lst_NewMailCount,
  userIsUsingfirstDeposit: state => state.user.info.Lst_UsingfirstDeposit,
  userBankId1: state => state.user.info.Lst_BankID_1,
  // userBankName1: (state, getters) => getters.userBankById(getters.userBankId1).Lst_BankName || '',
  userBankAccount1: state => state.user.info.Lst_BankAccount_1,
  userBankBrach1: state => state.user.info.Lst_Bank_Branches_1,
  userBankAccountName1: state => state.user.info.Lst_BankAccountName_1,
  userBankId2: state => state.user.info.Lst_BankID_2,
  // userBankName2: (state, getters) => getters.userBankById(getters.userBankId2).Lst_BankName || '',
  userBankAccount2: state => state.user.info.Lst_BankAccount_2,
  userBankBrach2: state => state.user.info.Lst_Bank_Branches_2,
  userBankAccountName2: state => state.user.info.Lst_BankAccountName_2,
  userBankId3: state => state.user.info.Lst_BankID_3,
  userBankName3: (state, getters) => getters.userBankById(getters.userBankId3).Lst_BankName || '',
  // userBankAccount3: state => state.user.info.Lst_BankAccount_3,
  userBankBrach3: state => state.user.info.Lst_Bank_Branches_3,
  userBankAccountName3: state => state.user.info.Lst_BankAccountName_3,
  // userBankById: state => id => {
  //   return state.user.bankList.find(item => item.Lst_BankId === id) || {};
  // },
  userWithdrawalCount: state => state.user.info.Lst_WithdrawalsNum,

  //* Product
  productList: state => state.product.list,
  productListByClassify: state => classify => {
    if (classify == 0) {
      return state.product.list;
    }

    return state.product.list.filter(item => item.Lst_Game_Classify == classify);
  },
  productById: state => id => state.product.list.find(item => item.Lst_Product_id == id) || {},
  productLiveList: state => state.product.list.filter(item => item.Lst_Game_Classify == 1),
  productSlotList: state => state.product.list.filter(item => item.Lst_Game_Classify == 2),
  productSportList: state => state.product.list.filter(item => item.Lst_Game_Classify == 3),
  productP2PList: state => state.product.list.filter(item => item.Lst_Game_Classify == 5),
  productClassifyList: state => {
    const classifyList = [
      {
        Lst_Game_Classify: 0,
        Lst_Game_Classify_Name: 'home.product.nav.all',
      },
    ];
    const classifyNumberList = state.product.list
      .map(item => item.Lst_Game_Classify)
      .filter((item, index, arr) => arr.indexOf(item) === index)
      .sort();

    classifyNumberList.forEach(classify => {
      const product = state.product.list.find(item => item.Lst_Game_Classify === classify);
      classifyList.push({
        Lst_Game_Classify: product.Lst_Game_Classify,
        Lst_Game_Classify_Name: product.Lst_Game_Classify_Name,
      });
    });

    return classifyList;
  },
};
export default getters;
