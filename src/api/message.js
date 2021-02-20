import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetMessageList(params) {
  const result = await axios.get(API_URL + '/Msg/GetList', { params });
  return result.data;
}

export async function apiPostMessageList(data) {
  const result = await axios.post(API_URL + '/Msg/GetList', data);
  return result.data;
}
