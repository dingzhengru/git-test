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
// export async function checkRelatedAccountExist(params) {
//   const result = await axios.post(API_URL + '/Member/AdvancedCashAgent', {}, { params });
//   return result.data;
// }

//* 查詢註冊欄位
export async function checkRegisterFieldExist(params) {
  const result = await axios.post(API_URL + '/Member/CheckField', {}, { params });
  return result.data;
}
