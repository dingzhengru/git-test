import axios from 'axios';
import { API_URL } from '@/settings';

//* 站內遊戲館檢查帳號狀態
export async function apiCheckGameIsOpen(data) {
  const result = await axios.post(API_URL + '/Game/MCheckIsOpen', data);
  return result.data;
}

//* 導向遊戲大廰(站外連結)
export async function apiGetGameRedirectUrl(data) {
  const result = await axios.post(API_URL + '/Game/MGameRedirectUrl', data);
  return result.data;
}

//* 取得電子遊戲大廳的彩金
export async function apiGetJackpotTotal(data) {
  const result = await axios.post(API_URL + '/Game/MGetJackpotTotal', data);
  return result.data;
}

//* 取得遊戲網址
export async function apiGetGameUrl(data) {
  const result = await axios.post(API_URL + '/Game/MLobbyGameRedirect', data);
  return result.data;
}

export async function apiGetGameLobbyProduct(data) {
  const result = await axios.post(API_URL + '/Game/MGetGameLobbyProduct', data);
  return result.data;
}

export async function apiGetGameLobbyCategory(data) {
  const result = await axios.post(API_URL + '/Game/MGetGameLobbyMenu', data);
  return result.data;
}

export async function apiGetGameLobbyGameList(data) {
  const result = await axios.post(API_URL + '/Game/MGetGameLobbyList', data);
  return result.data;
}

//* 收藏遊戲 (目前只有電子有此功能)
export async function apiSetGameFav(data) {
  const result = await axios.post(API_URL + '/Game/MemberCollectionEdit', data);
  return result.data;
}

/**
 ** 真人遊戲
 */

export async function apiGetLiveGameLobbyProduct(data) {
  const result = await axios.post(API_URL + '/Game/MLiveLobby', data);
  return result.data;
}

export async function apiGetLiveGameLobbyCategory(data) {
  const result = await axios.post(API_URL + '/Game/MGetLiveLobbyMenu', data);
  return result.data;
}

export async function apiGetLiveGameLobbyGameList(data) {
  const result = await axios.post(API_URL + '/Game/MGetLiveLobbyList', data);
  return result.data;
}
