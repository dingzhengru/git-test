import axios from 'axios';
import { API_URL } from '@/settings';

export async function getDepositInfo() {
  const result = await axios.post(API_URL + '/Operator/MSingleDepositInfo');
  return result.data;
}
