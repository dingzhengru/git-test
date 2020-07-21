import axios from 'axios';
import { API_URL } from '@/settings';

export async function getLangList(data) {
  const result = await axios.post(API_URL + '/lang/GetList', data);
  return result.data;
}

export async function changeLang(data) {
  const result = await axios.post(API_URL + '/lang/ChangeCulture', data);
  return result.data;
}


