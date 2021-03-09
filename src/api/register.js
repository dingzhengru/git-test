import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.21  RegisterNew-  未登入註冊頁
export async function apiGetRegisterFieldList() {
  const result = await axios.post(API_URL + '/Member/RegisterNew');
  return result.data;
}

//* 2.66  驗證 欄位資料是否通過
export async function apiCheckRegisterFieldExist(params) {
  const result = await axios.post(API_URL + '/Member/CheckField', {}, { params });
  return result.data;
}
