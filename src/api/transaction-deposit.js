import axios from 'axios';
import { API_URL } from '@/settings';

export async function getDepositInfo() {
  const result = await axios.post(API_URL + '/Operator/MSingleDepositInfo');
  return result.data;
}

export async function deposit(data) {
  const result = await axios.post(API_URL + '/Operator/MSingleDeposit', data);
  return result.data;
}
