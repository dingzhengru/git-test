import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetProductList(data) {
  const result = await axios.post(API_URL + '/Product/GetList', data);
  return result.data;
}

export async function apiGetMemberProductList() {
  const result = await axios.post(API_URL + '/Product/MemProductList');
  return result.data;
}
