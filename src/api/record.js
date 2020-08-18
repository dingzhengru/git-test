import axios from 'axios';
import { API_URL } from '@/settings';

export async function getRecordDeposit() {
  const result = await axios.post(API_URL + '/PointRecord/Deposit');
  return result.data;
}

export async function getRecordWithdrawal() {
  const result = await axios.post(API_URL + '/PointRecord/Withdrawals');
  return result.data;
}

export async function getRecordTransfer(data) {
  const result = await axios.post(API_URL + '/PointRecord/Transfer', data);
  return result.data;
}

export async function getRecordBonus(data) {
  const result = await axios.post(API_URL + '/PointRecord/ActivityTransaction', data);
  return result.data;
}

export async function getRecordLottery(data) {
  const result = await axios.post(API_URL + '/PointRecord/LuckyWheelLotteryResult', data);
  return result.data;
}

export async function getRecordAdjustment(data) {
  const result = await axios.post(API_URL + '/PointRecord/Adjustment', data);
  return result.data;
}
