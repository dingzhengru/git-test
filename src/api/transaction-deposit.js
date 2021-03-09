import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.49  交易中心-存款頁
export async function apiGetDepositInfo() {
  const result = await axios.post(API_URL + '/Operator/MSingleDepositInfo');
  return result.data;
}

//* 2.55  交易中心-存款動作
export async function apiDeposit(data) {
  const result = await axios.post(API_URL + '/Operator/MSingleDeposit', data);
  return result.data;
}

//* 2.72  交易中心-存款第三方支付
export async function apiGetDepositThirdPartyInfo(data) {
  const result = await axios.post(API_URL + '/Operator/MThirdParty', data);
  return result.data;
}

//* 2.73  交易中心-存款優惠活動列表 ActivityType int (1:轉帳:2存簿:3:第三方支付)
export async function apiGetDepositAllActivityList(data) {
  const result = await axios.post(API_URL + '/Operator/MGetAllActivityList', data);
  return result.data;
}

//* 2.74  交易中心-第三方存款提交申請單取得支付連結
export async function apiDepositThirdParty(data) {
  const result = await axios.post(API_URL + '/Operator/MDepositThirdParty', data);
  return result.data;
}

//* 2.75  交易中心-第三方巡訪訂單是否成功
export async function apiDepositCheckOrderStatus(data) {
  const result = await axios.post(API_URL + '/Operator/CheckOrderStatus', data);
  return result.data;
}
