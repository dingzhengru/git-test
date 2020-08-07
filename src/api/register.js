import axios from 'axios';
import { API_URL } from '@/settings';

export async function getRegisterFieldList(data) {
  const result = await axios.post(API_URL + '/Member/RegisterNew', data);
  return result.data;
}
