import axios from 'axios';
import { API_URL } from '@/settings';

export async function getLotteryCount() {
  const result = await axios.post(API_URL + '/Siteinfo/MGetLotteryCount');
  return result.data;
}

export async function playLottery() {
  const result = await axios.post(API_URL + '/Proxy/PlayLottery');
  return result.data;
}
