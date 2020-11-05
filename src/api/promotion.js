import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetPromotionList() {
  const result = await axios.post(API_URL + '/Promotion/PromotionList');
  return result.data;
}

export async function apiGetPromotionDetail(data) {
  const result = await axios.post(API_URL + '/Promotion/PromotionDetail', data);
  return result.data;
}
