//* Site
export const SITE_INFO_LOAD_FAIL_MESSAGE = 'Load failed. Please refresh the page and retry.';

//* API
//* API URL
// export const API_URL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:80/api';
export const API_URL = '/api';

//* 重新發送次數限制
export const API_RETRY_COUNT_LIMIT = 1;

//* 預設的 timeout (後端指定: 10秒)
export const API_REQUEST_TIMEOUT = 10000;

//* 轉帳的 timeout (後端指定: 20秒)
export const API_TIMEOUT_TRANSFER = 20000;

//* 需加密的 API
export const API_CRYPTO_LIST = ['Member/LoginIn', 'Member/MChangePassword', 'Member/MChgWithdrawalsPwd'];

//* 需使用"大數據加密"的 API
export const API_CRYPTO_BIG_DATA_LIST = [
  'Member/SimpleRegister',
  'Operator/MWithdrawals',
  'Member/AdvancedRegisterNew',
];

//* 需使用"大數據加密"的 API，但並非全部參數都要加密的情況，EX: 存款動作中的匯款收據圖片
export const API_NOT_ALL_PARAMS_CRYPTO_BIG_DATA_LIST = ['Operator/MSingleDeposit'];

//* 回傳為 599 時，但不要 alert 的 API，像是登入、註冊、需開新頁面的 API (避免 alert 中斷)
export const API_NO_ALERT_LIST = [
  'Member/LoginIn',
  'Member/SimpleRegister',
  'Game/MGameRedirectUrl',
  'Game/MLobbyGameRedirect',
];

//* 不顯示 Loading 的 API
export const API_NO_LOADING_LIST = [
  'Siteinfo/KeepUserOnline',
  'Game/MGetJackpotTotal',
  'Member/CheckField',
  'Proxy/MPlayLottery',
  'Proxy/MGetWinPrize',
];

//* 需要 Authorization bearer token 的 API
export const API_AUTH_LIST = [
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
  'Siteinfo/MGetLotteryCount',
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
  'Msg/MessageList',
  'Msg/MInbox_Load',
  'Msg/MInbox_LoadDetail',
  'Msg/MailCategoryList',
  'Msg/MailCompose',
  'Proxy/MPlayLottery',
  'Proxy/MGetWinPrize',
];
