const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:80/api';
//const API_URL = 'http://api.caza7.re888show.com/api',

//* http 請求的 timeout
const REQUEST_TIMEOUT = 10000;

//* 需要 Authorization bearer token 的 API
const AUTH_API_LIST = [
  'Member/LoginIn',
  'Member/LogOut',
  'Member/SimpleRegister',
  'Member/MemInfo',
  'Member/MChangePassword',
  'Member/MChgWithdrawalsPwd',
  'Member/RegisterAdvanceNew',
  'Member/AdvancedRegisterNew',
  'Member/MBankInfoList',
  'Member/RememberInfo',
  'Member/MChangeReMember',
  'Siteinfo/MGetAllGamePoint',
  'Siteinfo/MGetPITTLBet',
  'Product/MemProductList',
  'Operator/MSingleDepositInfo',
  'Operator/MSingleDeposit',
  'Operator/MWithdrawalsInfo',
  'Operator/MWithdrawals',
  'Operator/MTransferInfo',
  'Operator/MTransferPoint',
  'Operator/MPointTransferForAllGame',
  'PointRecord/MDeposit',
  'PointRecord/MWithdrawals',
  'PointRecord/MTransfer',
  'PointRecord/MActivityTransaction',
  'PointRecord/MLuckyWheelLotteryResult',
  'PointRecord/MActivityWashcode',
  'PointRecord/MAdjustment',
  'PointRecord/MWithdrawalsDetail',
  'PointRecord/MTransferDetail',
  'PointRecord/MActivityWashcodeDetail',
  'PointRecord/MBetHistory',
  'PointRecord/MBetHistory_Day',
  'PointRecord/MBetHistory_Week',
  'Game/MCheckIsOpen',
  'Game/MGameRedirectUrl',
  'Game/MGetJackpotTotal',
  'Game/MLobbyGameRedirect',
  'Game/MGetGameLobbyProduct',
  'Game/MGetGameLobbyMenu',
  'Game/MGetGameLobbyList',
  'Game/MLiveLobby',
  'Game/MGetLiveLobbyMenu',
  'Game/MGetLiveLobbyList',
  'Game/MemberCollectionEdit',
  'Siteinfo/MGetLotteryCount',
  'Msg/MessageList',
  'Msg/MInbox_Load',
  'Msg/MInbox_LoadDetail',
  'Msg/MailCategoryList',
  'Msg/MailCompose',
  'Proxy/MPlayLottery',
  'Proxy/MGetWinPrize',
];

//* 需加密的 API
const CRYPTO_API_LIST = ['Member/LoginIn', 'Member/MChangePassword', 'Member/MChgWithdrawalsPwd'];

//* 需使用"大數據加密"的 API
const CRYPTO_BIG_DATA_API_LIST = ['Member/SimpleRegister', 'Operator/MWithdrawals', 'Member/AdvancedRegisterNew'];

//* 需使用"大數據加密"的 API，但並非全部參數都要加密的情況，EX: 存款動作中的匯款收據圖片
const NOT_ALL_PARAMS_CRYPTO_BIG_DATA_API_LIST = ['Operator/MSingleDeposit'];

//* 需要登入才能進入的 route name(利用 beforeEach & store.getters.isLoggedIn)
const AUTH_ROUTE_LIST = [
  'GameHome',
  'GameLobby',
  'UserProfile',
  'UserChangePassword',
  'TransactionDeposit',
  'TransactionWithdrawal',
  'TransactionTransfer',
  'TransactionRecordHome',
  'TransactionRecordContent',
  'TransactionRecordDetail',
  'ReportUnsettleBet',
  'ReportBetRecord',
  'ReportBetRecordDetail',
  'NotificationNews',
  'NotificationChat',
  'NotificationChatDetail',
  'NotificationOutbox',
];

//* "不需要"登入才能進入的 route name
const NO_AUTH_ROUTE_LIST = ['Login', 'Register', 'ForgetPassword'];

//* 需要開通才能進入的 route name (利用 beforeEach & store.getters.isAccessed)
const ACCESS_ROUTE_LIST = [];

//* 回傳為 599 時，但不要 alert 的 API
//* 登入、註冊、需開新頁面的 API (避免 alert 中斷)
const NO_ALERT_API_LIST = [
  'Member/LoginIn',
  'Member/SimpleRegister',
  'Game/MGameRedirectUrl',
  'Game/MLobbyGameRedirect',
];

//* 不顯示 Loading 的 API
const NO_LOADING_API_LIST = [
  'Siteinfo/KeepUserOnline',
  'Game/MGetJackpotTotal',
  'Member/CheckField',
  'Proxy/MGetWinPrize',
];

export {
  REQUEST_TIMEOUT,
  API_URL,
  AUTH_API_LIST,
  CRYPTO_API_LIST,
  CRYPTO_BIG_DATA_API_LIST,
  NOT_ALL_PARAMS_CRYPTO_BIG_DATA_API_LIST,
  AUTH_ROUTE_LIST,
  ACCESS_ROUTE_LIST,
  NO_AUTH_ROUTE_LIST,
  NO_ALERT_API_LIST,
  NO_LOADING_API_LIST,
};
export default {
  REQUEST_TIMEOUT,
  API_URL,
  AUTH_API_LIST,
  CRYPTO_API_LIST,
  CRYPTO_BIG_DATA_API_LIST,
  NOT_ALL_PARAMS_CRYPTO_BIG_DATA_API_LIST,
  AUTH_ROUTE_LIST,
  ACCESS_ROUTE_LIST,
  NO_AUTH_ROUTE_LIST,
  NO_ALERT_API_LIST,
  NO_LOADING_API_LIST,
};
