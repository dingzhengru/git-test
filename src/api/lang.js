import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.3  Lang-取得語系列表
export async function apiGetLangList() {
  const result = await axios.get(API_URL + '/lang/GetList');
  return result.data;
}

//* 2.3 ChangeCulture -更換語系
export async function apiChangeLang(data) {
  const result = await axios.post(API_URL + '/lang/ChangeCulture', data);
  return result.data;
}
