import store from '@/store';
import axios from 'axios';
import {
  API_URL,
  API_RETRY_COUNT_LIMIT,
  API_REQUEST_TIMEOUT,
  API_AUTH_LIST,
  API_CRYPTO_LIST,
  API_CRYPTO_BIG_DATA_LIST,
  API_NOT_ALL_PARAMS_CRYPTO_BIG_DATA_LIST,
  API_NO_ALERT_LIST,
  API_NO_LOADING_LIST,
  SITE_INFO_LOAD_FAIL_MESSAGE,
} from '@/settings';
import { rsaEncrypt, rsaEncryptLong } from '@/utils/rsa';

//* 設置 timeout (預設是 0，代表沒有 timeout)
axios.defaults.timeout = API_REQUEST_TIMEOUT;

//* 紀錄重新發送次數
let retryCount = 0;

//* 重新發送所需的變數
let retryRequestData = null;

//* 針對 201: 帳號被踢線，登出(清除SESSION資訊)，前端ALERT 顯示訊息(多語系文字)
//* 會因為多個 api 同時觸發 201 ，導致 alert 很多次，因此設置此變數
let Respond201Count = 0;

//* 用於檢查 url 是否在列表中
function checkUrlInList(list, url) {
  const item = url.replace(`${API_URL}/`, '');
  return list.includes(item);
}

axios.interceptors.request.use(
  config => {
    //* 存取重新發送的資料
    retryRequestData = config.data;

    //* 放進 loading 列表，篩選掉不會進 loading 的 API
    if (!checkUrlInList(API_NO_LOADING_LIST, config.url)) {
      store.commit('pushLoading', config.url);
    }

    //* Authorization
    if (checkUrlInList(API_AUTH_LIST, config.url)) {
      config.headers = {
        Authorization: `Bearer ${store.getters.userToken}`,
      };
    }

    //* 加密
    if (checkUrlInList(API_CRYPTO_LIST, config.url)) {
      config.data = {
        rsaMsg: rsaEncrypt(config.data, store.getters.userPublicKey),
      };
    }

    //* 大數據加密
    else if (checkUrlInList(API_CRYPTO_BIG_DATA_LIST, config.url)) {
      config.data = {
        rsaMsg: rsaEncryptLong(config.data, store.getters.userPublicKey),
      };
    }

    //* 大數據加密，但並非全部參數都要加密的情況，EX: 存款動作(需加密: rsaData, 不須加密: noRsaData)
    else if (checkUrlInList(API_NOT_ALL_PARAMS_CRYPTO_BIG_DATA_LIST, config.url)) {
      const rsaMsg = rsaEncryptLong(config.data.rsaData, store.getters.userPublicKey);
      const noRsaData = config.data.noRsaData;

      config.data = Object.assign({ rsaMsg }, noRsaData);
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async res => {
    console.log(`[${res.config.url.replace(`${API_URL}/`, '')}]`, res.data);

    //* 從 loading 列表取出一個
    if (!checkUrlInList(API_NO_LOADING_LIST, res.config.url)) {
      store.commit('popLoading');
    }

    if (res.data.Code == 201) {
      //* 201: 帳號被踢線，登出(清除SESSION資訊)，前端ALERT 顯示訊息(多語系文字)

      //* isResponded201 是避免多次執行 alert 的變數
      if (Respond201Count == 0) {
        Respond201Count++;
        window.alert(res.data.ErrMsg);
        store.dispatch('user/logout');
      }
      return;
    } else if (res.data.Code == 599) {
      //* 599: 正常操作回應錯誤訊息，前端ALERT 顯示訊息(多語系文字)

      //* 篩選掉不要 alert 的 api
      if (!checkUrlInList(API_NO_ALERT_LIST, res.config.url)) {
        window.alert(res.data.ErrMsg);
      }
    } else if (res.data.Code == 502 || res.data.Code == 615) {
      //* 502: TokenError，前端不顯示錯誤訊息內容(不正常操作)
      //* 615: JsonError，前端不顯示錯誤訊息內容(不正常操作)

      //* 先拿下來存取，避免被 Token 的請求取代
      res.config.data = retryRequestData;

      //* 重新取得 Token 與 公鑰
      await store.dispatch('user/getTokenAndPublicKey');

      //* 重新發送請求
      if (retryCount < API_RETRY_COUNT_LIMIT) {
        retryCount++;
        return axios(res.config);
      }
      retryCount = 0;
    }
    return res;
  },
  async error => {
    console.log('[Response Error]', error);
    console.log('[Response Error] [error.response]', error.response);

    //* siteInfo 取得失敗
    if (error.config.url == `${API_URL}/Siteinfo/getinfo`) {
      window.alert(SITE_INFO_LOAD_FAIL_MESSAGE);
      return;
    }

    //* 判斷是否要 popLoading
    if (!checkUrlInList(API_NO_LOADING_LIST, error.config.url)) {
      store.commit('popLoading');
    }

    if (error.response.status == 401) {
      //* 先拿下來存取，避免被 Token 的請求取代
      error.response.config.data = retryRequestData;

      //* 重新取得 Token 與 公鑰
      await store.dispatch('user/getTokenAndPublicKey');

      //* 重新發送請求
      if (retryCount < API_RETRY_COUNT_LIMIT) {
        retryCount++;
        return axios(error.response.config);
      }
      retryCount = 0;
    }

    return Promise.reject(error);
  }
);
