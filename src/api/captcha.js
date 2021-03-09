import axios from 'axios';
import { API_URL } from '@/settings';

/**
 ** 2.7  CAPTCHA -取得驗證碼
 ** pageCode
 **  MemberLogin: 登入頁面
 **  MemberRegister: 註冊頁面
 **  ThirdParty: 第三方支付
 */
export async function apiGetCaptcha(data) {
  const result = await axios.post(API_URL + '/images/GetCAPTCHA', data);
  return result.data;
}
