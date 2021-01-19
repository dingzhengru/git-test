import axios from 'axios';
import { API_URL } from '@/settings';

//* 未結算
export async function apiGetBetHistoryUnsettle() {
  const result = await axios.post(API_URL + '/PointRecord/MBetHistory');
  return result.data;
}

//* 紀錄明細
export async function apiGetBetHistoryDay(data) {
  const result = await axios.post(API_URL + '/PointRecord/MBetHistory_Day', data);
  return result.data;
}

//* 週列表
export async function apiGetBetHistoryWeek(data) {
  const result = await axios.post(API_URL + '/PointRecord/MBetHistory_Week', data);
  return result.data;
}