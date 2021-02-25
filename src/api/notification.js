import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetNewsList(params) {
  const result = await axios.get(API_URL + '/Msg/MessageList', { params });
  return result.data;
}

export async function apiPostNewsList(data) {
  const result = await axios.post(API_URL + '/Msg/MessageList', data);
  return result.data;
}

export async function apiGetInboxList(data) {
  const result = await axios.post(API_URL + '/Msg/MInbox_Load', data);
  return result.data;
}

export async function apiGetInboxDetail(data) {
  const result = await axios.post(API_URL + '/Msg/MInbox_LoadDetail', data);
  return result.data;
}

export async function apiGetMailCategoryList() {
  const result = await axios.post(API_URL + '/Msg/MailCategoryList');
  return result.data;
}

export async function apiSendMail(data) {
  const result = await axios.post(API_URL + '/Msg/MailCompose', data);
  return result.data;
}
