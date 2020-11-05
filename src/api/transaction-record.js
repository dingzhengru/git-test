import axios from 'axios';
import { API_URL } from '@/settings';

export async function apiGetRecordDeposit() {
  const result = await axios.post(API_URL + '/PointRecord/MDeposit');
  return result.data;
}

export async function apiGetRecordWithdrawal() {
  const result = await axios.post(API_URL + '/PointRecord/MWithdrawals');
  return result.data;
}

export async function apiGetRecordTransfer(data) {
  const result = await axios.post(API_URL + '/PointRecord/MTransfer', data);
  return result.data;
}

export async function apiGetRecordBonus(data) {
  const result = await axios.post(API_URL + '/PointRecord/MActivityTransaction', data);
  return result.data;
}

export async function apiGetRecordLottery(data) {
  const result = await axios.post(API_URL + '/PointRecord/MLuckyWheelLotteryResult', data);
  return result.data;
}

export async function apiGetRecordWithdrawalRestriction(data) {
  const result = await axios.post(API_URL + '/PointRecord/MActivityWashcode', data);
  return result.data;
}

export async function apiGetRecordAdjustment(data) {
  const result = await axios.post(API_URL + '/PointRecord/MAdjustment', data);
  return result.data;
}

/**
 ** Detail
 */

export async function apiGetRecordDepositDetail(data) {
  const result = await axios.post(API_URL + '/PointRecord/MDepositDetail', data);
  return result.data;
}

export async function apiGetRecordWithdrawalDetail(data) {
  const result = await axios.post(API_URL + '/PointRecord/MWithdrawalsDetail', data);
  return result.data;
}

export async function apiGetRecordTransferDetail(data) {
  const result = await axios.post(API_URL + '/PointRecord/MTransferDetail', data);
  return result.data;
}

export async function apiGetRecordDetailWithdrawalRestriction(data) {
  const result = await axios.post(API_URL + '/PointRecord/MActivityWashcodeDetail', data);
  return result.data;
}
