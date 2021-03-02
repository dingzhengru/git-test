import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetPromotionList(params) {
  const result = await axios.get(API_URL + '/Promotion/PromotionList', { params });
  return result.data;
}

export async function apiGetPromotionDetail(params) {
  const result = await axios.get(API_URL + '/Promotion/PromotionDetail', { params });
  return result.data;
}
