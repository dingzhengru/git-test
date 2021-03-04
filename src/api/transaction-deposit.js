import axios from 'axios';
import { API_URL } from '@/settings';

//* ActivityType int (1:轉帳:2存簿:3:第三方支付)
export async function apiGetDepositAllActivityList(data) {
  const result = await axios.post(API_URL + '/Operator/MGetAllActivityList', data);
  return result.data;
}

export async function apiGetDepositInfo() {
  const result = await axios.post(API_URL + '/Operator/MSingleDepositInfo');
  return result.data;
}

export async function apiDeposit(data) {
  const result = await axios.post(API_URL + '/Operator/MSingleDeposit', data);
  return result.data;
}

export async function apiGetDepositThirdPartyInfo(data) {
  const result = await axios.post(API_URL + '/Operator/MThirdParty', data);
  return result.data;
}

export async function apiDepositThirdParty(data) {
  const result = await axios.post(API_URL + '/Operator/MDepositThirdParty', data);
  return result.data;
}

export async function apiDepositCheckOrderStatus(data) {
  const result = await axios.post(API_URL + '/Operator/CheckOrderStatus', data);
  return result.data;
}
