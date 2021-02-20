import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetPromotionList() {
  const result = await axios.get(API_URL + '/Promotion/PromotionList');
  return result.data;
}

export async function apiPostPromotionList() {
  const result = await axios.post(API_URL + '/Promotion/PromotionList');
  return result.data;
}

export async function apiGetPromotionDetail(params) {
  const result = await axios.get(API_URL + '/Promotion/PromotionDetail', { params });
  return result.data;
}

export async function apiPostPromotionDetail(data) {
  const result = await axios.post(API_URL + '/Promotion/PromotionDetail', data);
  return result.data;
}
