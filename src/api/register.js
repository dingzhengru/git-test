import axios from 'axios';
import { API_URL } from '@/settings';

//* 註冊畫面
export async function getRegisterFieldList() {
  const result = await axios.post(API_URL + '/Member/RegisterNew');
  return result.data;
}

//* 帳號開通畫面
export async function getRegisterAdvanceNew() {
  const result = await axios.post(API_URL + '/Member/RegisterAdvanceNew');
  return result.data;
}

//* 查詢推薦人是否存在
export async function checkRelatedAccountExist(params) {
  const result = await axios.post(API_URL + '/Member/AdvancedCashAgent', {}, { params });
  return result.data;
}

//* 查詢帳號
export async function checkAccountExist(params) {
  const result = await axios.post(API_URL + '/Member/CheckAgentAccount', {}, { params });
  return result.data;
}

//* 查詢姓名
export async function checkRealNameExist(params) {
  const result = await axios.post(API_URL + '/Member/CheckMemberRealname', {}, { params });
  return result.data;
}

//* 查詢手機號碼
export async function checkMobileExist(params) {
  const result = await axios.post(API_URL + '/Member/CheckMemberMobile', {}, { params });
  return result.data;
}
