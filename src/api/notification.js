import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.48   最新消息-最新消息
export async function apiGetNewsList(params) {
  const result = await axios.get(API_URL + '/Msg/MessageList', { params });
  return result.data;
}

export async function apiPostNewsList(data) {
  const result = await axios.post(API_URL + '/Msg/MessageList', data);
  return result.data;
}

//* 2.50   最新消息-站內信
export async function apiGetInboxList(data) {
  const result = await axios.post(API_URL + '/Msg/MInbox_Load', data);
  return result.data;
}

//* 2.51   最新消息-站內信明細
export async function apiGetInboxDetail(data) {
  const result = await axios.post(API_URL + '/Msg/MInbox_LoadDetail', data);
  return result.data;
}

//* 2.52   寄件箱 -信件类别
export async function apiGetMailCategoryList() {
  const result = await axios.post(API_URL + '/Msg/MailCategoryList');
  return result.data;
}

//* 2.53   回覆信件 &寄件
export async function apiSendMail(data) {
  const result = await axios.post(API_URL + '/Msg/MailCompose', data);
  return result.data;
}
