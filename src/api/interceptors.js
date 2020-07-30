import store from '@/store';
import axios from 'axios';
import { AUTH_API_LIST, CRYPTO_API_LIST } from '@/settings';
import { rsaEncrypt } from '@/utils/rsa';

axios.interceptors.request.use(
  config => {
    //* 判斷是否在認證列表中
    if (AUTH_API_LIST.find(item => config.url.includes(item))) {
      config.headers = {
        Authorization: `Bearer ${store.getters.token}`,
      };
    }

    //* 判斷是否在加密列表中
    if (CRYPTO_API_LIST.find(item => config.url.includes(item))) {
      config.data = {
        rsaMsg: rsaEncrypt(config.data, store.getters.publicKey),
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
    return res;
  },
  error => {
    console.log('[interceptors response error]', error);
    console.log('[interceptors response error code]', error.response.status);
    console.log('[interceptors response error data]', error.response.data);
    if (error.response.status == 401) {
      return error.response;
    } else {
      return Promise.reject(error);
    }
  }
);
