import axios from 'axios';
import { API_URL } from '@/settings';

export async function getNewsList(data) {
  const result = await axios.post(API_URL + '/Msg/MessageList', data);
  return result.data;
}

export async function getInboxList(data) {
  const result = await axios.post(API_URL + '/Msg/MInbox_Load', data);
  return result.data;
}

export async function getInboxDetail(data) {
  const result = await axios.post(API_URL + '/Msg/MInbox_LoadDetail', data);
  return result.data;
}

export async function getMailCategoryList() {
  const result = await axios.post(API_URL + '/Msg/MailCategoryList');
  return result.data;
}
