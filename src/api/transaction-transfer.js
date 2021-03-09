import axios from 'axios';
import { API_URL, API_TIMEOUT_TRANSFER } from '@/settings';

//* 轉帳的 timeout: 20秒
const transferConfig = {
  timeout: API_TIMEOUT_TRANSFER,
};

//* 2.32   取得轉帳資訊
export async function apiGetTransferInfo() {
  const result = await axios.post(API_URL + '/Operator/MTransferInfo');
  return result.data;
}

//* 2.34   出納櫃台-轉帳
export async function apiTransferPoint(data) {
  const result = await axios.post(API_URL + '/Operator/MTransferPoint', data, transferConfig);
  return result.data;
}

//* 2.38   全部转回我的钱包
export async function apiTransferAllGamePointToMain() {
  const result = await axios.post(API_URL + '/Operator/MPointTransferForAllGame', {}, transferConfig);
  return result.data;
}
