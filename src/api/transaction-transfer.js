import axios from 'axios';
import { API_URL } from '@/settings';

export async function getTransferInfo() {
  const result = await axios.post(API_URL + '/Operator/MTransferInfo');
  return result.data;
}

export async function transferPoint(data) {
  const result = await axios.post(API_URL + '/Operator/MTransferPoint', data);
  return result.data;
}

export async function transferAllGamePointToMain() {
  const result = await axios.post(API_URL + '/Operator/MPointTransferForAllGame');
  return result.data;
}


