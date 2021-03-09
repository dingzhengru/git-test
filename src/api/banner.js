import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.67 Banner-新版取得輪播列表
export async function apiGetBannerList(params) {
  const result = await axios.get(API_URL + '/Banner/GetPromotionBanner', { params });
  return result.data;
}
