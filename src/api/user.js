import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.4 token-取得token
export async function apiGetTokenAndPublicKey() {
  const result = await axios.post(API_URL + '/siteinfo/Token');
  return result.data;
}

//* 2.8  LoginIn-會員登入
export async function apiLogin(data) {
  const result = await axios.post(API_URL + '/Member/LoginIn', data);
  return result.data;
}

//* 2.8 LogOut-登出
export async function apiLogout() {
  const result = await axios.post(API_URL + '/Member/LogOut');
  return result.data;
}

//* 2.9  KeepUserOnline-心跳
export async function apiKeepUserOnline() {
  const result = await axios.post(API_URL + '/Siteinfo/KeepUserOnline');
  return result.data;
}

//* 2.10   取得錢包額度
export async function apiGetAllGamePoint() {
  const result = await axios.post(API_URL + '/Siteinfo/MGetAllGamePoint');
  return result.data;
}

//* 2.13  MemInfo - 取得會員資訊
export async function apiGetUserInfo() {
  const result = await axios.post(API_URL + '/Member/MemInfo');
  return result.data;
}

//* 2.14   取得抽獎次數
export async function apiGetLotteryCount() {
  const result = await axios.post(API_URL + '/Siteinfo/MGetLotteryCount');
  return result.data;
}

//* 2.15  SimpleRegister-POST會員註冊
export async function apiRegister(data) {
  const result = await axios.post(API_URL + '/Member/SimpleRegister', data);
  return result.data;
}

//* 2.56  會員中心-  會員中心-個人資料畫面
export async function apiGetRegisterAdvanceNew() {
  const result = await axios.post(API_URL + '/Member/RegisterAdvanceNew');
  return result.data;
}

//* 2.54  會員中心-修改密碼
export async function apiChangePassword(data) {
  const result = await axios.post(API_URL + '/Member/MChangePassword', data);
  return result.data;
}

//* 2.58  會員中心-取款密碼
export async function apiChangePasswordWithdrawal(data) {
  const result = await axios.post(API_URL + '/Member/MChgWithdrawalsPwd', data);
  return result.data;
}

//* 2.60  會員中心-會員銀行資訊列表
export async function apiGetBankInfoList() {
  const result = await axios.post(API_URL + '/Member/MBankInfoList');
  return result.data;
}

//* 2.64  交易中心-會員中心-個人資料更新
export async function apiAdvancedRegisterNew(data) {
  const result = await axios.post(API_URL + '/Member/AdvancedRegisterNew', data);
  return result.data;
}

//* 2.65  會員登入-記住我
export async function apiGetRememberInfo() {
  const result = await axios.post(API_URL + '/Member/RememberInfo');
  return result.data;
}

//* 2.68 手机版记忆帐密 手機版記憶帳密(修改密碼頁面)
export async function apiChangeRemember(data) {
  const result = await axios.post(API_URL + '/Member/MChangeReMember', data);
  return result.data;
}
