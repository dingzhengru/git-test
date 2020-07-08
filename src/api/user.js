import axios from 'axios';
import settings from '@/settings';

const API_URL = settings.API_URL;



export async function getUserInfo(data) {
  const res = await axios.post(API_URL + '/', data);

  if (res) {
    return res.data;
  }

  return {};
}
