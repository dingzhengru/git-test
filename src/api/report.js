import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.42   投注紀錄-未結算投注
export async function apiGetBetHistoryUnsettle() {
  const result = await axios.post(API_URL + '/PointRecord/MBetHistory');
  return result.data;
}

//* 2.43   投注紀錄-帳務紀錄(日)
export async function apiGetBetHistoryDay(data) {
  const result = await axios.post(API_URL + '/PointRecord/MBetHistory_Day', data);
  return result.data;
}

//* 2.44   投注紀錄-帳務紀錄(週)
export async function apiGetBetHistoryWeek(data) {
  const result = await axios.post(API_URL + '/PointRecord/MBetHistory_Week', data);
  return result.data;
}
