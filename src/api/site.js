import axios from 'axios';
import { API_URL } from '@/settings';

export async function getSiteInfo(data) {
  const result = await axios.post(API_URL + '/Siteinfo/getinfo', data);
  return result.data;
}
