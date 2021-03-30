import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.6 Product-取得遊戲館
export async function apiGetProductList(params) {
  const result = await axios.get(API_URL + '/Product/GetList', { params });
  return result.data;
}

export async function apiPostProductList() {
  const result = await axios.post(API_URL + '/Product/GetList');
  return result.data;
}

//* 2.41 會員產品館別資訊(出納櫃台-轉帳紀錄)
export async function apiGetMemberProductList() {
  const result = await axios.post(API_URL + '/Product/MemProductList');
  return result.data;
}

//* 2.79  取出遊戲館的優惠活動 (遊戲館列表-立即轉帳按鈕)
//* 交易中心-轉帳選擇目的遊戲館時，帶出優惠活動
export async function apiGetProductPromotionList(data) {
  const result = await axios.post(API_URL + '/Operator/MGame_GetGameName', data);
  return result.data;
}
