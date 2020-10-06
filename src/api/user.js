import axios from 'axios';
import { API_URL } from '@/settings';

//* 手機版記憶帳密(修改密碼頁面)
export async function changeRemember(data) {
  const result = await axios.post(API_URL + '/Member/MChangeReMember', data);
  return result.data;
}

//* 會員登入-記住我
export async function getRememberInfo() {
  const result = await axios.post(API_URL + '/Member/RememberInfo');
  return result.data;
}

//* 帳號開通動作
export async function advancedRegisterNew(data) {
  const result = await axios.post(API_URL + '/Member/AdvancedRegisterNew', data);
  return result.data;
}

//* 銀行資訊
export async function getBankInfoList() {
  const result = await axios.post(API_URL + '/Member/MBankInfoList');
  return result.data;
}

//* 心跳
export async function keepUserOnline() {
  const result = await axios.post(API_URL + '/Siteinfo/KeepUserOnline');
  return result.data;
}

//* 取得會員資訊
export async function getUserInfo() {
  const result = await axios.post(API_URL + '/Member/MemInfo');
  return result.data;
}

//* 取得金管家
// export async function getPITTLBet() {
//   const result = await axios.post(API_URL + '/Siteinfo/MGetPITTLBet');
//   return result.data;
// }

//* 取得錢包額度
export async function getAllGamePoint() {
  const result = await axios.post(API_URL + '/Siteinfo/MGetAllGamePoint');
  return result.data;
}

//* 取得 Token & PublicKey
export async function getTokenAndPublicKey() {
  const result = await axios.post(API_URL + '/siteinfo/Token');
  return result.data;
}

export async function register(data) {
  const result = await axios.post(API_URL + '/Member/SimpleRegister', data);
  return result.data;
}

export async function login(data) {
  const result = await axios.post(API_URL + '/Member/LoginIn', data);
  return result.data;
}

export async function logout() {
  const result = await axios.post(API_URL + '/Member/LogOut');
  return result.data;
}

export async function changePassword(data) {
  const result = await axios.post(API_URL + '/Member/MChangePassword', data);
  return result.data;
}
export async function changePasswordWithdrawal(data) {
  const result = await axios.post(API_URL + '/Member/MChgWithdrawalsPwd', data);
  return result.data;
}
