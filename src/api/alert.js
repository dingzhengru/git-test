import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetMessageList(data) {
  const result = await axios.post(API_URL + '/Msg/GetList', data);
  return result.data;
}
