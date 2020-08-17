const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:80/api';
//const API_URL = 'http://api.caza7.re888show.com/api',

//* 預設語系 (以後應該會由後端取得)
const DEFAULT_LANG = 'th-th';

//* 需要 Authorization bearer token 的 API
const AUTH_API_LIST = [
  'Member/LoginIn',
  'Member/SimpleRegister',
  'Siteinfo/MGetAllGamePoint',
  'Siteinfo/MGetPITTLBet',
  'Member/MemInfo',
  'PointRecord/Deposit',
  'PointRecord/Withdrawals',
  'PointRecord/ActivityTransaction',
  'PointRecord/LuckyWheelLotteryResult',
  'Game/MGetJackpotTotal',
  'Game/MGetGameLobbyProduct',
  'Game/MGetGameLobbyMenu',
  'Game/MGetGameLobbyList',
  'Game/MLobbyGameRedirect',
  'Game/MGameRedirectUrl',
  'Siteinfo/MGetLotteryCount',
  'Proxy/PlayLottery',
];

//* 需加密的 API
const CRYPTO_API_LIST = ['Member/LoginIn', 'Game/MLobbyGameRedirect'];

//* 需使用"大數據加密"的 API
const CRYPTO_BIG_DATA_API_LIST = ['Member/SimpleRegister'];

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

export {
  API_URL,
  DEFAULT_LANG,
  AUTH_API_LIST,
  CRYPTO_API_LIST,
  CRYPTO_BIG_DATA_API_LIST,
  AUTH_ROUTE_LIST,
  ACCESS_ROUTE_LIST,
  NO_AUTH_ROUTE_LIST,
};
export default {
  API_URL,
  DEFAULT_LANG,
  AUTH_API_LIST,
  CRYPTO_API_LIST,
  CRYPTO_BIG_DATA_API_LIST,
  AUTH_ROUTE_LIST,
  ACCESS_ROUTE_LIST,
  NO_AUTH_ROUTE_LIST,
};
