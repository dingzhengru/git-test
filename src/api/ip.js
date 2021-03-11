import jsonp from 'jsonp';

export function getIP() {
  return new Promise((resolve, reject) => {
    jsonp('https://api.ipify.org/?format=jsonp', null, (err, data) => {
      if (err) {
        console.error(err.message);
        reject(err.message);
      } else {
        resolve(data);
      }
    });
  });
}

// export async function getIPDetail(params) {
//   const result = await axios.get('https://wq.apnic.net/query', { params });
//   return result.data;
// }
