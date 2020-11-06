import axios from 'axios';
import { API_URL, API_TIMEOUT_TRANSFER } from '@/settings';

//* 轉帳的 timeout: 20秒
const transferConfig = {
  timeout: API_TIMEOUT_TRANSFER,
};

export async function apiGetTransferInfo() {
  const result = await axios.post(API_URL + '/Operator/MTransferInfo');
  return result.data;
}

export async function apiTransferPoint(data) {
  const result = await axios.post(API_URL + '/Operator/MTransferPoint', data, transferConfig);
  return result.data;
}

export async function apiTransferAllGamePointToMain() {
  const result = await axios.post(API_URL + '/Operator/MPointTransferForAllGame', {}, transferConfig);
  return result.data;
}
