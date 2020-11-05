import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetBannerListOld() {
  const result = await axios.post(API_URL + '/Banner/GetList');
  return result.data;
}

export async function apiGetBannerList() {
  const result = await axios.post(API_URL + '/Banner/GetPromotionBanner');
  return result.data;
}
