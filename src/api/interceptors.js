import store from '@/store';
import axios from 'axios';
import {
  API_URL,
  API_REQUEST_TIMEOUT,
  API_AUTH_LIST,
  API_CRYPTO_LIST,
  API_CRYPTO_BIG_DATA_LIST,
  API_NOT_ALL_PARAMS_CRYPTO_BIG_DATA_LIST,
  API_NO_ALERT_LIST,
  API_NO_LOADING_LIST,
} from '@/settings';
import { rsaEncrypt, rsaEncryptLong } from '@/utils/rsa';
import { i18n } from '@/i18n-lazy';

// if (process.env.NODE_ENV === 'development') {
//   console.log('set axios.defaults.withCredentials = true.');
//   axios.defaults.withCredentials = true;
// }

//* 設置 timeout (預設是 0，代表沒有 timeout)
axios.defaults.timeout = API_REQUEST_TIMEOUT;

//* 針對 502: TokenError，615: JsonError
//* 看要選擇重整，還是重新發送請求(目前只有登入是重新發送)

//* 重新發送所需的變數
// let retryRequestData = null;

//* 針對 201: 帳號被踢線，登出(清除SESSION資訊)，前端ALERT 顯示訊息(多語系文字)
//* 會因為多個 api 同時觸發 201 ，導致 alert 很多次，因此設置此變數
let Responded201Count = 0;

axios.interceptors.request.use(
  config => {
    //* 放進 loading 列表，篩選掉不會進 loading 的 API
    if (!API_NO_LOADING_LIST.find(item => config.url.includes(item))) {
      store.commit('pushLoadingRequest');
    }

    //* Authorization
    if (API_AUTH_LIST.find(item => `${API_URL}/${item}` == config.url)) {
      config.headers = {
        Authorization: `Bearer ${store.getters.userToken}`,
      };
    }

    //* 加密
    if (API_CRYPTO_LIST.find(item => `${API_URL}/${item}` == config.url)) {
      config.data = {
        rsaMsg: rsaEncrypt(config.data, store.getters.userPublicKey),
      };
    }

    //* 大數據加密
    else if (API_CRYPTO_BIG_DATA_LIST.find(item => `${API_URL}/${item}` == config.url)) {
      config.data = {
        rsaMsg: rsaEncryptLong(config.data, store.getters.userPublicKey),
      };
    }

    //* 大數據加密，但並非全部參數都要加密的情況，EX: 存款動作(需加密: rsaData, 不須加密: noRsaData)
    else if (API_NOT_ALL_PARAMS_CRYPTO_BIG_DATA_LIST.find(item => `${API_URL}/${item}` == config.url)) {
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
    //* 放進 loading 列表，篩選掉不會進 loading 的 API

    if (!API_NO_LOADING_LIST.find(item => `${API_URL}/${item}` == res.config.url)) {
      store.commit('popLoadingRequest');
    }

    if (res.data.Code == 201) {
      //* 201: 帳號被踢線，登出(清除SESSION資訊)，前端ALERT 顯示訊息(多語系文字)

      //* isResponded201 是避免多次執行 alert 的變數
      if (Responded201Count == 0) {
        Responded201Count++;
        console.log('[Logout]', '201: 帳號被踢線', res.data);
        window.alert(res.data.ErrMsg);
        store.dispatch('user/logout');
      }
      return;
    } else if (res.data.Code == 502 && process.env.NODE_ENV === 'production') {
      //* 502: TokenError，前端不顯示錯誤訊息內容(不正常操作)
      console.log('[TokenError]', res);

      //* 重新取得 Token 與 公鑰
      await store.dispatch('user/getTokenAndPublicKey');

      //* 只於登入 & 註冊請求不重整
      // if (res.config.url.includes('LoginIn') || res.config.url.includes('SimpleRegister')) {
      //   return res;
      // }

      //* 先註解掉重整的部分，通常會觸發此情況，會是被踢線的情況，因 token 是無期限的
      //* 且會妨礙到被踢線的登出流程，會先執行到此重整
      // window.location.reload();
    } else if (res.data.Code == 599 && process.env.NODE_ENV === 'production') {
      //* 599: 正常操作回應錯誤訊息，前端ALERT 顯示訊息(多語系文字)

      //* 篩選掉不要 alert 的 api
      if (!API_NO_ALERT_LIST.find(item => `${API_URL}/${item}` == res.config.url)) {
        window.alert(res.data.ErrMsg);
      }
    } else if (res.data.Code == 615 && process.env.NODE_ENV === 'production') {
      //* 615: JsonError，推測是公鑰與私鑰對不上，換一把新的公鑰
      console.log('[JsonError]', res);

      //* 重新取得 Token 與 公鑰
      await store.dispatch('user/getTokenAndPublicKey');

      //* 所有請求都重新發送
      // return axios.post(res.config.url, retryRequestData);

      //* 只於登入 & 註冊請求不重整
      // if (res.config.url.includes('LoginIn') || res.config.url.includes('SimpleRegister')) {
      //   return res;
      // }
      // window.location.reload();
    }
    return res;
  },
  error => {
    if (error.config.url.includes('Siteinfo/getinfo')) {
      //* 避免載入語言前，就觸發此，所以設一個預設的(en-us)
      let alertMessage = 'Load failed. Please refresh the page and retry.';
      if (i18n.te('alert.loadFailed')) {
        alertMessage = i18n.t('alert.loadFailed');
      }
      window.alert(alertMessage);
    } else if (!API_NO_LOADING_LIST.find(item => `${API_URL}/${item}` == error.config.url)) {
      store.commit('popLoadingRequest');
    }

    console.log('[interceptors response error]', error);
    console.log('[interceptors response error] [response]', error.response);
    console.log('[interceptors response error] [url]', error.response.config.url);
    console.log('[interceptors response error] [status]', error.response.status);
    console.log('[interceptors response error] [data]', error.response.data);
    return Promise.reject(error);
  }
);
