import axios from 'axios';
import { API_URL } from '@/settings';

//* 手機版記憶帳密(修改密碼頁面)
export async function apiChangeRemember(data) {
  const result = await axios.post(API_URL + '/Member/MChangeReMember', data);
  return result.data;
}

//* 會員登入-記住我
export async function apiGetRememberInfo() {
  const result = await axios.post(API_URL + '/Member/RememberInfo');
  return result.data;
}

//* 個人資料畫面
export async function apiGetRegisterAdvanceNew() {
  const result = await axios.post(API_URL + '/Member/RegisterAdvanceNew');
  return result.data;
}

//* 個人資料更新
export async function apiAdvancedRegisterNew(data) {
  const result = await axios.post(API_URL + '/Member/AdvancedRegisterNew', data);
  return result.data;
}

//* 銀行資訊
export async function apiGetBankInfoList() {
  const result = await axios.post(API_URL + '/Member/MBankInfoList');
  return result.data;
}

//* 心跳
export async function apiKeepUserOnline() {
  const result = await axios.post(API_URL + '/Siteinfo/KeepUserOnline');
  return result.data;
}

//* 取得會員資訊
export async function apiGetUserInfo() {
  const result = await axios.post(API_URL + '/Member/MemInfo');
  return result.data;
}

//* 取得錢包額度
export async function apiGetAllGamePoint() {
  const result = await axios.post(API_URL + '/Siteinfo/MGetAllGamePoint');
  return result.data;
}

//* 取得 Token & PublicKey
export async function apiGetTokenAndPublicKey() {
  const result = await axios.post(API_URL + '/siteinfo/Token');
  return result.data;
}

export async function apiRegister(data) {
  const result = await axios.post(API_URL + '/Member/SimpleRegister', data);
  return result.data;
}

export async function apiLogin(data) {
  const result = await axios.post(API_URL + '/Member/LoginIn', data);
  return result.data;
}

export async function apiLogout() {
  const result = await axios.post(API_URL + '/Member/LogOut');
  return result.data;
}

export async function apiChangePassword(data) {
  const result = await axios.post(API_URL + '/Member/MChangePassword', data);
  return result.data;
}
export async function apiChangePasswordWithdrawal(data) {
  const result = await axios.post(API_URL + '/Member/MChgWithdrawalsPwd', data);
  return result.data;
}
