import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.61  優惠活動-列表
export async function apiGetPromotionList(params) {
  const result = await axios.get(API_URL + '/Promotion/PromotionList', { params });
  return result.data;
}

//* 2.62  優惠活動-列表明細
export async function apiGetPromotionDetail(params) {
  const result = await axios.get(API_URL + '/Promotion/PromotionDetail', { params });
  return result.data;
}
