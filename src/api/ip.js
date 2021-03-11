// import jsonp from 'jsonp';
import axios from 'axios';

export async function getIP() {
  // jsonp('https://api.ipify.org/?format=jsonp', null, (err, data) => {
  //   if (err) {
  //     console.error(err.message);
  //   } else {
  //     console.log('data', data);
  //   }
  // });
  const result = await axios.get('https://api.ipify.org/?format=jsonp');
  return result.data;
}

// export async function getIPDetail(params) {
//   const result = await axios.get('https://wq.apnic.net/query', { params });
//   return result.data;
// }
