import axios from 'axios';
import { API_URL } from '@/settings';

export async function getRecordDeposit() {
  const result = await axios.post(API_URL + '/PointRecord/MDeposit');
  return result.data;
}

export async function getRecordWithdrawal() {
  const result = await axios.post(API_URL + '/PointRecord/MWithdrawals');
  return result.data;
}

export async function getRecordTransfer(data) {
  const result = await axios.post(API_URL + '/PointRecord/MTransfer', data);
  return result.data;
}

export async function getRecordBonus(data) {
  const result = await axios.post(API_URL + '/PointRecord/MActivityTransaction', data);
  return result.data;
}

export async function getRecordLottery(data) {
  const result = await axios.post(API_URL + '/PointRecord/MLuckyWheelLotteryResult', data);
  return result.data;
}

export async function getRecordWithdrawalRestriction(data) {
  const result = await axios.post(API_URL + '/PointRecord/MActivityWashcode', data);
  return result.data;
}

export async function getRecordAdjustment(data) {
  const result = await axios.post(API_URL + '/PointRecord/MAdjustment', data);
  return result.data;
}

/**
 ** Detail
 */

export async function getRecordDepositDetail(data) {
  const result = await axios.post(API_URL + '/PointRecord/MDepositDetail', data);
  return result.data;
}

export async function getRecordWithdrawalDetail(data) {
  const result = await axios.post(API_URL + '/PointRecord/MWithdrawalsDetail', data);
  return result.data;
}

export async function getRecordTransferDetail(data) {
  const result = await axios.post(API_URL + '/PointRecord/MTransferDetail', data);
  return result.data;
}

export async function getRecordDetailWithdrawalRestriction(data) {
  const result = await axios.post(API_URL + '/PointRecord/MActivityWashcodeDetail', data);
  return result.data;
}
