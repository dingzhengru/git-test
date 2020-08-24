import axios from 'axios';
import { API_URL } from '@/settings';

export async function getBetHistory(data) {
  const result = await axios.post(API_URL + '/PointRecord/MBetHistory', data);
  return result.data;
}
