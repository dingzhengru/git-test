import axios from 'axios';
import { API_URL } from '@/settings';

export async function getGameUrl(data) {
  const result = await axios.post(API_URL + '/Game/MLobbyGameRedirect', data);
  return result.data;
}



