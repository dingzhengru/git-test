import axios from 'axios';
import { API_URL } from '@/settings';

export async function getNews(data) {
  const result = await axios.post(API_URL + '/Msg/MessageList', data);
  return result.data;
}
