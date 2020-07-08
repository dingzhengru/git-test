import axios from 'axios';
import settings from '@/settings';
import generateRequestID from '@/utils/generate-requestID.js';
import { langToNumber } from '@/utils/langNumberConverter';
import { rsaEncrypt } from '@/utils/rsa';
import { getToken } from '@/utils/cookie';

// * 全局的攔截器
// * 加解密可以在這進行
// * 也可以有小範圍的攔截器，參考: https://github.com/axios/axios/issues/108#issuecomment-164044648

const BucketID = settings.bucketID;

// req 攔截
axios.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// res 攔截
axios.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    return Promise.reject(error);
  }
);
