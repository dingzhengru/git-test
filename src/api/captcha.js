import axios from 'axios';
import { API_URL } from '@/settings';

export async function getCaptcha(data) {
  const result = await axios.post(API_URL + '/images/GetCAPTCHA', data);
  return result.data;
}
