// import jsonp from 'jsonp';
// import axios from 'axios-jsonp-pro';
import jquery from 'jquery';

export function getIP() {
  // return new Promise((resolve, reject) => {
  //   jsonp('https://api.ipify.org/?format=jsonp', null, (err, data) => {
  //     if (err) {
  //       reject(err.message);
  //     } else {
  //       resolve(data);
  //     }
  //   });
  // });
  // axios.jsonp('https://api.ipify.org/?format=jsonp').then(result => {
  //   console.log(result);
  // });
  console.log(jquery);

  jquery.getJSON('https://api.ipify.org/?format=json', result => {
    console.log(result);
  });
}

// export async function getIPDetail(params) {
//   const result = await axios.get('https://wq.apnic.net/query', { params });
//   return result.data;
// }
