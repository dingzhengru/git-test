import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.5 Msg-取得未登入彈出訊息
//* msgtype 要取出的消息型態 (A一般 B跑馬燈 C彈出 Z重要)
export async function apiGetMessageList(params) {
  const result = await axios.get(API_URL + '/Msg/GetList', { params });
  return result.data;
}

export async function apiPostMessageList(data) {
  const result = await axios.post(API_URL + '/Msg/GetList', data);
  return result.data;
}
