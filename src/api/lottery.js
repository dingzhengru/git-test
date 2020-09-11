import axios from 'axios';
import { API_URL } from '@/settings';

export async function getLotteryCount() {
  const result = await axios.post(API_URL + '/Siteinfo/MGetLotteryCount');
  return result.data;
}

export async function playLottery(data) {
  const result = await axios.post(API_URL + '/Proxy/MPlayLottery', data);
  return result.data;
}

export async function playLotteryResult(data) {
  const result = await axios.post(API_URL + '/Proxy/MGetWinPrize', data);
  return result.data;
}
