import axios from 'axios';
import { API_URL } from '@/settings';

export async function getManifest() {
  const result = await axios.get(API_URL + '/Siteinfo/ManifestJson');
  return result.data;
}
