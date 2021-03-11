import axios from 'axios';

export async function getIP() {
  const result = await axios.get('https://api.ipify.org/?format=json');
  return result.data;
}

// export async function getIPDetail(params) {
//   const result = await axios.get('https://wq.apnic.net/query', { params });
//   return result.data;
// }
