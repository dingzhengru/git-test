import axios from 'axios';
import { API_URL } from '@/settings';

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

//* 2.76 取得健康網域
export async function apiGetDomainInfo(data) {
  const result = await axios.post('https://api.starbets.re888show.com/api/Siteinfo/DomainInfo', data);
  return result.data;
}
