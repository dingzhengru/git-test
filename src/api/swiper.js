import axios from 'axios';
import { API_URL } from '@/settings';

export async function getSwiperList(data) {
  const result = await axios.post(API_URL + '/Banner/GetList', data);
  return result.data;
}
