function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
}

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

  getJSON('https://api.ipify.org/?format=json', (err, data) => {
    console.log(data);
  });
}

// export async function getIPDetail(params) {
//   const result = await axios.get('https://wq.apnic.net/query', { params });
//   return result.data;
// }
