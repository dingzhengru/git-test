import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.33  交易中心-取款頁
export async function apiGetWithdrawalInfo() {
  const result = await axios.post(API_URL + '/Operator/MWithdrawalsInfo');
  return result.data;
}

//* 2.40  交易中心-取款動作
export async function apiWithdrawal(data) {
  const result = await axios.post(API_URL + '/Operator/MWithdrawals', data);
  return result.data;
}
