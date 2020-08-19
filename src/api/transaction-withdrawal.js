import axios from 'axios';
import { API_URL } from '@/settings';

export async function getWithdrawal() {
  const result = await axios.post(API_URL + '/Operator/MWithdrawals');
  return result.data;
}
