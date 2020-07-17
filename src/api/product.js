import axios from 'axios';
import { API_URL } from '@/settings';

export async function getProductList(data) {
  const result = await axios.post(API_URL + '/Product/GetList', data);
  return result.data;
}
