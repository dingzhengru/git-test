import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetBannerList(params) {
  const result = await axios.get(API_URL + '/Banner/GetPromotionBanner', { params });
  return result.data;
}
