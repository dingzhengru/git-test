import axios from 'axios';
import { API_URL } from '@/settings';

export async function getJackpotTotal(data) {
  const result = await axios.post(API_URL + '/Game/MGetJackpotTotal', data);
  return result.data;
}

export async function getGameUrl(data) {
  const result = await axios.post(API_URL + '/Game/MLobbyGameRedirect', data);
  return result.data;
}

export async function getGameLobbyProduct(data) {
  const result = await axios.post(API_URL + '/Game/MGetGameLobbyProduct', data);
  return result.data;
}

export async function getGameLobbyCategory(data) {
  const result = await axios.post(API_URL + '/Game/MGetGameLobbyMenu', data);
  return result.data;
}

export async function getGameLobbyGameList(data) {
  const result = await axios.post(API_URL + '/Game/MGetGameLobbyList', data);
  return result.data;
}

//* 導向遊戲大廰(站外連結)
export async function getGameRedirectUrl(data) {
  const result = await axios.post(API_URL + '/Game/MGameRedirectUrl', data);
  return result.data;
}

/**
 ** 真人遊戲
 */

export async function getLiveGameLobbyCategory(data) {
  const result = await axios.post(API_URL + '/Game/MGetLiveLobbyMenu', data);
  return result.data;
}
