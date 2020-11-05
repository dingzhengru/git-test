import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetDepositInfo() {
  const result = await axios.post(API_URL + '/Operator/MSingleDepositInfo');
  return result.data;
}

export async function apiDeposit(data) {
  const result = await axios.post(API_URL + '/Operator/MSingleDeposit', data);
  return result.data;
}
