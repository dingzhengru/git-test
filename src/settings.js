const API_URL = 'http://localhost:3000/api';
//const API_URL = 'http://api.caza7.re888show.com/api',

// 預設語系 (以後應該會由後端取得)
const DEFAULT_LANG = 'th-th';

// 需加密的 API
const CRYPTO_API_LIST = [];

// 需要登入才能進入的 route name(利用 beforeEach & store.getters.token)
const AUTH_ROUTE_LIST = [];

// 需要開通才能進入的 route name (利用 beforeEach & store.getters.isAccessed)
const ACCESS_ROUTE_LIST = [];

export { API_URL, DEFAULT_LANG, CRYPTO_API_LIST, AUTH_ROUTE_LIST, ACCESS_ROUTE_LIST };
export default {
  API_URL,
  DEFAULT_LANG,
  CRYPTO_API_LIST,
  AUTH_ROUTE_LIST,
  ACCESS_ROUTE_LIST,
};
