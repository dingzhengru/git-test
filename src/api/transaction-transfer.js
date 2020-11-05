import axios from 'axios';
import { API_URL } from '@/settings';

//* 轉帳的 timeout: 20秒
const transferConfig = {
  timeout: 20000,
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
