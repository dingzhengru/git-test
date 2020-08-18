import axios from 'axios';
import { API_URL } from '@/settings';

export async function getTransferInfo() {
  const result = await axios.post(API_URL + '/Operator/MTransferInfo');
  return result.data;
}
