import axios from 'axios';
import { API_URL } from '@/settings';

export async function getRegisterFieldList() {
  const result = await axios.post(API_URL + '/Member/RegisterNew');
  return result.data;
}
