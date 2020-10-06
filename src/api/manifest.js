import axios from 'axios';
// import { API_URL } from '@/settings';

export async function getManifest() {
  const result = await axios.get('http://api.caza7.re888show.com/api/Siteinfo/ManifestJson');
  return result.data;
}
