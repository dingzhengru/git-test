import axios from 'axios';
import { API_URL } from '@/settings';

/**
 ** 2.63  線上客服-列表
 ** Lst_ContactType，1: Skype 2:Line 3:電話 4:Email 5:Whoscall 6:線上客服
 */
export async function apiGetContactList() {
  const result = await axios.get(API_URL + '/Siteinfo/ContactInfo');
  return result.data;
}
