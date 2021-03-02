import axios from 'axios';

export async function apiGetVersion() {
  const result = await axios.get('/version');
  return result.data;
}
