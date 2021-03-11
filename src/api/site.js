import axios from 'axios';
import { API_URL } from '@/settings';

//* 檢查此網域是否健康
export async function checkSite() {
  const result = await axios.get('/');
  return result.data;
}

//* 2.1  Siteinfo取得站台資訊
export async function apiGetSiteInfo(params) {
  const result = await axios.get(API_URL + '/Siteinfo/getinfo', { params });
  return result.data;
}
export async function apiPostSiteInfo(data) {
  const result = await axios.post(API_URL + '/Siteinfo/getinfo', data);
  return result.data;
}

//* 2.70 推廣碼
export async function apiSendProxyCode(data) {
  const result = await axios.post(API_URL + '/Siteinfo/ProxyCode', data);
  return result.data;
}

//* 2.71 SEO資訊
export async function apiGetSiteSeoInfo(params) {
  const result = await axios.get(API_URL + '/SiteInfo/SeoInfo', { params });
  return result.data;
}

export async function apiPostSiteSeoInfo() {
  const result = await axios.post(API_URL + '/SiteInfo/SeoInfo');
  return result.data;
}

/**
 ** 2.76 取得健康網域
 ** 1. 此網域為健康，就會回傳此網域
 ** 2. 若此網域不健康，另外有網域是健康的，則會回傳那個健康網域
 ** 3. 若所有網域都不健康 => 空值
 ** 4. DomainName 跟 Referer 對不上的話 => 空值
 */
export async function apiGetDomainInfo(params) {
  const result = await axios.get('https://api.starbets.re888show.com/api/Siteinfo/DomainInfo', { params });
  return result.data;
}
