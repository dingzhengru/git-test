import store from '@/store';
import axios from 'axios';
import { AUTH_API_LIST, CRYPTO_API_LIST, CRYPTO_BIG_DATA_API_LIST, NO_ALERT_API } from '@/settings';
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

    //* 判斷是否在加密列表中 (大數據加密)
    if (CRYPTO_BIG_DATA_API_LIST.find(item => config.url.includes(item))) {
      config.data = {
        rsaMsg: rsaEncryptLong(config.data, store.getters.publicKey),
      };
    }

    // console.log('[interceptors]', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  res => {
    if (res.data.Code == 201) {
      //* 201: 帳號被踢線，登出(清除SESSION資訊)，前端ALERT 顯示訊息(多語系文字)
      //* 後端會在觸發就執行登出了，且不允許前端呼叫登出方法，所以只能把 logout 做的事放這了
      console.log('[Logout]');
      store.dispatch('user/logout');
    } else if (res.data.Code == 502 && process.env.NODE_ENV === 'production') {
      //* 502: TokenError
      console.log('[TokenError]', res);
      getTokenAndPublicKey().then(result => {
        store.commit('user/setToken', result.RetObj.token);
        store.commit('user/setPublicKey', result.RetObj.publickey);
        location.reload();
      });
    } else if (res.data.Code == 599 && process.env.NODE_ENV === 'production') {
      //* 599: 正常操作回應錯誤訊息，前端ALERT 顯示訊息(多語系文字)

      //* 篩選掉不要 alert 的 api
      if (!NO_ALERT_API.find(item => res.config.url.includes(item))) {
        alert(res.data.ErrMsg);
      }
    } else if (res.data.Code == 615 && process.env.NODE_ENV === 'production') {
      //* 615: JsonError，目前登入偶會出現，推測是公鑰與私鑰對不上
      console.log('[JsonError]', res);

      //* 這邊可以不用 reload()，而是改成幫會員登入，避免會員重整後又要再登入一次
      if (res.config.url.includes('LoginIn')) {
        alert('[JsonError]', '目前登入會碰到此錯誤，推測是公私鑰沒對上');
        getTokenAndPublicKey().then(result => {
          store.commit('user/setToken', result.RetObj.token);
          store.commit('user/setPublicKey', result.RetObj.publickey);
          location.reload();
        });
      }
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
