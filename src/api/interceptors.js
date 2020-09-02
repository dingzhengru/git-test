import store from '@/store';
import axios from 'axios';
import {
  AUTH_API_LIST,
  CRYPTO_API_LIST,
  CRYPTO_BIG_DATA_API_LIST,
  NO_ALERT_API,
  NOT_ALL_PARAMS_CRYPTO_BIG_DATA_API_LIST,
} from '@/settings';
import { rsaEncrypt, rsaEncryptLong } from '@/utils/rsa';
import { getTokenAndPublicKey } from '@/api/user';

axios.interceptors.request.use(
  config => {
    //* 判斷是否在認證列表中 (於 header 加上 Authorization: bearer ${token})
    if (AUTH_API_LIST.find(item => config.url.includes(item))) {
      config.headers = {
        Authorization: `Bearer ${store.getters.token}`,
      };
    }

    //* 判斷是否在加密列表中 (一般資料大小)
    if (CRYPTO_API_LIST.find(item => config.url.includes(item))) {
      config.data = {
        rsaMsg: rsaEncrypt(config.data, store.getters.publicKey),
      };
    }

    //* 判斷是否在加密列表中 (大數據加密)，但並非全部參數都要加密的情況，EX: 存款動作中的匯款收據圖片
    if (NOT_ALL_PARAMS_CRYPTO_BIG_DATA_API_LIST.find(item => config.url.replace('/api/', '') == item)) {
      const rsaMsg = rsaEncryptLong(config.data.rsaData, store.getters.publicKey);
      const noRsaData = config.data.noRsaData;

      config.data = Object.assign({ rsaMsg }, noRsaData);
    }

    //* 判斷是否在加密列表中 (大數據加密)
    if (CRYPTO_BIG_DATA_API_LIST.find(item => config.url.includes(item))) {
      config.data = {
        rsaMsg: rsaEncryptLong(config.data, store.getters.publicKey),
      };
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async res => {
    if (res.data.Code == 201) {
      //* 201: 帳號被踢線，登出(清除SESSION資訊)，前端ALERT 顯示訊息(多語系文字)
      //* 後端會在觸發就執行登出了，且不允許前端呼叫登出方法，所以只能把 logout 做的事放這了
      console.log('[Logout]');
      store.dispatch('user/logout');
    } else if (res.data.Code == 502 && process.env.NODE_ENV === 'production') {
      //* 502: TokenError，前端不顯示錯誤訊息內容(不正常操作)
      console.log('[TokenError]', res);
      const result = await getTokenAndPublicKey();
      store.commit('user/setToken', result.RetObj.token);
      store.commit('user/setPublicKey', result.RetObj.publickey);

      //* 只於登入請求不重整
      if (res.config.url.includes('LoginIn')) {
        return res;
      }
      window.location.reload();
    } else if (res.data.Code == 599 && process.env.NODE_ENV === 'production') {
      //* 599: 正常操作回應錯誤訊息，前端ALERT 顯示訊息(多語系文字)

      //* 篩選掉不要 alert 的 api
      if (!NO_ALERT_API.find(item => res.config.url.includes(item))) {
        alert(res.data.ErrMsg);
      }
    } else if (res.data.Code == 615 && process.env.NODE_ENV === 'production') {
      //* 615: JsonError，推測是公鑰與私鑰對不上，換一把新的公鑰
      const result = await getTokenAndPublicKey();
      store.commit('user/setToken', result.RetObj.token);
      store.commit('user/setPublicKey', result.RetObj.publickey);

      //* 只於登入請求不重整
      if (res.config.url.includes('LoginIn')) {
        return res;
      }
      window.location.reload();
    }
    return res;
  },
  error => {
    //* 取消 loading
    store.commit('setIsLoading', false);

    console.log('[interceptors response error]', error);
    console.log('[interceptors response error] [url]', error.response.config.url);
    console.log('[interceptors response error] [status]', error.response.status);
    console.log('[interceptors response error] [data]', error.response.data);
    return Promise.reject(error);
  }
);
