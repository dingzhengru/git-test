import axios from 'axios';
import { API_URL } from '@/settings';

export async function getTokenAndPublicKey() {
  const result = await axios.post(API_URL + '/siteinfo/Token');
  return result.data;
}

export async function login(data) {
  const result = await axios.post(API_URL + '/Member/LoginIn', data);
  return result.data;
}

export async function logout() {
  const result = await axios.post(API_URL + '/Member/LogOut');
  return result.data;
}
