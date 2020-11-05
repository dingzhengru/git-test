import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetWithdrawalInfo() {
  const result = await axios.post(API_URL + '/Operator/MWithdrawalsInfo');
  return result.data;
}

export async function apiWithdrawal(data) {
  const result = await axios.post(API_URL + '/Operator/MWithdrawals', data);
  return result.data;
}
