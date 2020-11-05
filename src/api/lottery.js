import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetLotteryCount() {
  const result = await axios.post(API_URL + '/Siteinfo/MGetLotteryCount');
  return result.data;
}

export async function apiPlayLottery(data) {
  const result = await axios.post(API_URL + '/Proxy/MPlayLottery', data);
  return result.data;
}

export async function apiPlayLotteryResult(data) {
  const result = await axios.post(API_URL + '/Proxy/MGetWinPrize', data);
  return result.data;
}
