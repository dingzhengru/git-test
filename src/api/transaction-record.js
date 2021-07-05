import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.17   出納櫃台-存款紀錄
export async function apiGetRecordDeposit() {
  const result = await axios.post(API_URL + '/PointRecord/MDeposit');
  return result.data;
}

//* 2.18   出納櫃台-取款紀錄
export async function apiGetRecordWithdrawal() {
  const result = await axios.post(API_URL + '/PointRecord/MWithdrawals');
  return result.data;
}

//* 2.20   出納櫃台-轉帳紀錄
export async function apiGetRecordTransfer(data) {
  const result = await axios.post(API_URL + '/PointRecord/MTransfer', data);
  return result.data;
}

//* 2.22   出納櫃台-紅利紀錄
export async function apiGetRecordBonus(data) {
  const result = await axios.post(API_URL + '/PointRecord/MActivityTransaction', data);
  return result.data;
}

//* 2.23   出納櫃台-開獎紀錄
export async function apiGetRecordLottery(data) {
  const result = await axios.post(API_URL + '/PointRecord/MLuckyWheelLotteryResult', data);
  return result.data;
}

//* 2.29   出納櫃台-調整紀錄
export async function apiGetRecordAdjustment(data) {
  const result = await axios.post(API_URL + '/PointRecord/MAdjustment', data);
  return result.data;
}

//* 2.35   出納櫃台-提取限制紀錄
export async function apiGetRecordWithdrawalRestriction(data) {
  const result = await axios.post(API_URL + '/PointRecord/MActivityWashcode', data);
  return result.data;
}

//* 2.87  存款紀錄圖片
export async function apiGetDepositImageUrl(data) {
  const result = await axios.post(API_URL + '/PointRecord/MDepositImageUrl', data);
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
