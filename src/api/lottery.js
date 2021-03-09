import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.57   行銷活動-轉盤/紅包資料
export async function apiPlayLottery(data) {
  const result = await axios.post(API_URL + '/Proxy/MPlayLottery', data);
  return result.data;
}

//* 2.59   行銷活動-轉盤/紅包開獎結果
export async function apiPlayLotteryResult(data) {
  const result = await axios.post(API_URL + '/Proxy/MGetWinPrize', data);
  return result.data;
}
