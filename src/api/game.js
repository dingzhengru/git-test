import axios from 'axios';
import { API_URL } from '@/settings';

//* 2.19   遊戲導向頁
export async function apiGetGameUrl(data) {
  const result = await axios.post(API_URL + '/Game/MLobbyGameRedirect', data);
  return result.data;
}

//* 2.24   導向遊戲大廰(站外連結)
export async function apiGetGameRedirectUrl(data) {
  const result = await axios.post(API_URL + '/Game/MGameRedirectUrl', data);
  return result.data;
}

//* 2.25   取得電子遊戲大廳選單資訊(館別列表)
export async function apiGetGameLobbyProduct(params) {
  const result = await axios.get(API_URL + '/Game/GetGameLobbyProduct', { params });
  return result.data;
}

export async function apiPostGameLobbyProduct(data) {
  const result = await axios.post(API_URL + '/Game/MGetGameLobbyProduct', data);
  return result.data;
}

//* 2.25 取得電子遊戲大廳的彩金
export async function apiGetJackpotTotal(data) {
  const result = await axios.post(API_URL + '/Game/MGetJackpotTotal', data);
  return result.data;
}

//* 2.26   取得電子/真人遊戲分類目錄
export async function apiPostGameLobbyCategory(data) {
  const result = await axios.post(API_URL + '/Game/MGetGameLobbyMenu', data);
  return result.data;
}

export async function apiGetGameLobbyGameList(params) {
  const result = await axios.get(API_URL + '/Game/GetGameLobbyList', { params });
  return result.data;
}

//* 2.27   取得電子/真人遊戲列表
export async function apiGetGameLobbyCategory(params) {
  const result = await axios.get(API_URL + '/Game/GetGameLobbyMenu', { params });
  return result.data;
}

export async function apiPostGameLobbyGameList(data) {
  const result = await axios.post(API_URL + '/Game/MGetGameLobbyList', data);
  return result.data;
}

//* 2.28  站內遊戲館檢查帳號狀態
export async function apiCheckGameIsOpen(data) {
  const result = await axios.post(API_URL + '/Game/MCheckIsOpen', data);
  return result.data;
}

//* 2.37   取得真人大廳選單資訊(館別列表)
export async function apiGetLiveGameLobbyProduct(params) {
  const result = await axios.get(API_URL + '/Game/LiveLobby', { params });
  return result.data;
}

export async function apiPostLiveGameLobbyProduct(data) {
  const result = await axios.post(API_URL + '/Game/MLiveLobby', data);
  return result.data;
}

//* 2.39 將遊戲加入或移除收藏 (目前只有電子有此功能)
export async function apiSetGameFav(data) {
  const result = await axios.post(API_URL + '/Game/MemberCollectionEdit', data);
  return result.data;
}

//* 2.77   取得對戰大廳選單資訊(館別列表)
export async function apiGetFightLobby(params) {
  const result = await axios.get(API_URL + '/Game/FightLobby', { params });
  return result.data;
}

export async function apiPostFightLobby(data) {
  const result = await axios.post(API_URL + '/Game/MFightLobby', data);
  return result.data;
}

//* 2.80  我的收藏
export async function apiGetGameListFav(data) {
  const result = await axios.post(API_URL + '/Game/MFavoritesList', data);
  return result.data;
}

// export async function apiGetLiveGameLobbyCategory(params) {
//   const result = await axios.get(API_URL + '/Game/GetLiveLobbyMenu', { params });
//   return result.data;
// }

// export async function apiPostLiveGameLobbyCategory(data) {
//   const result = await axios.post(API_URL + '/Game/MGetLiveLobbyMenu', data);
//   return result.data;
// }

// export async function apiGetLiveGameLobbyGameList(params) {
//   const result = await axios.get(API_URL + '/Game/GetLiveLobbyList', { params });
//   return result.data;
// }

// export async function apiPostLiveGameLobbyGameList(data) {
//   const result = await axios.post(API_URL + '/Game/MGetLiveLobbyList', data);
//   return result.data;
// }
