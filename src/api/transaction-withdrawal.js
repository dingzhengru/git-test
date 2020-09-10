import axios from 'axios';
import { API_URL } from '@/settings';

export async function getWithdrawalInfo() {
  const result = await axios.post(API_URL + '/Operator/MWithdrawalsInfo');
  return result.data;
}

export async function Withdrawal(data) {
  const result = await axios.post(API_URL + '/Operator/MWithdrawals', data);
  return result.data;
}
