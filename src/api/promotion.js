import axios from 'axios';
import { API_URL } from '@/settings';

export async function getPromotionList() {
  const result = await axios.post(API_URL + '/Promotion/PromotionList');
  return result.data;
}

export async function getPromotionDetail(data) {
  const result = await axios.post(API_URL + '/Promotion/MPromotionDetail', data);
  return result.data;
}
