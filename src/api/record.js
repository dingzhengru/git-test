import axios from 'axios';
import { API_URL } from '@/settings';

export async function getRecordDeposit() {
  const result = await axios.post(API_URL + '/PointRecord/Deposit');
  return result.data;
}
