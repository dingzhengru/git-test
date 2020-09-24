import axios from 'axios';
import { API_URL } from '@/settings';

export async function getBannerListOld() {
  const result = await axios.post(API_URL + '/Banner/GetList');
  return result.data;
}

export async function getBannerList() {
  const result = await axios.post(API_URL + '/Banner/GetPromotionBanner');
  return result.data;
}
