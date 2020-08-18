import axios from 'axios';
import { API_URL } from '@/settings';

export async function getWithdrawal(data) {
  const result = await axios.post(API_URL + '/Operator/Withdrawals', data);
  return result.data;
}
