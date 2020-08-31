import JSEncrypt from 'jsencrypt';
// import './jsencrypt-long.js';
// import JSEncrypt from 'encryptlong';

export function rsaEncrypt(data, pubKey) {
  // 創建 "公鑰加密" 物件
  const encrypt = new JSEncrypt();

  // 設公鑰
  encrypt.setPublicKey(pubKey);

  // 加密
  return encrypt.encrypt(JSON.stringify(data));
}

export function rsaEncryptLong(data, pubKey) {
  // 創建 "公鑰加密" 物件
  const encrypt = new JSEncrypt();

  // 設公鑰
  encrypt.setPublicKey(pubKey);

  console.log('RSAEncryptLong', JSON.stringify(data));

  // 加密
  // return encrypt.encryptLong(JSON.stringify(data));
  return encrypt.encryptLong2(JSON.stringify(data));
}

function hex2b64(h) {
  let b64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let b64padchar = '=';
  let i, c;
  let ret = '';
  for (i = 0; i + 3 <= h.length; i += 3) {
    c = parseInt(h.substring(i, i + 3), 16);
    ret += b64map.charAt(c >> 6) + b64map.charAt(c & 63);
  }
  if (i + 1 == h.length) {
    c = parseInt(h.substring(i, i + 1), 16);
    ret += b64map.charAt(c << 2);
  } else if (i + 2 == h.length) {
    c = parseInt(h.substring(i, i + 2), 16);
    ret += b64map.charAt(c >> 2) + b64map.charAt((c & 3) << 4);
  }
  while ((ret.length & 3) > 0) ret += b64padchar;
  return ret;
}
JSEncrypt.prototype.encryptLong2 = function(string) {
  let k = this.getKey();
  try {
    let ct = '';
    //RSA每次加密117bytes，需要辅助方法判断字符串截取位置
    //1.获取字符串截取点
    let bytes = new Array();
    bytes.push(0);
    let byteNo = 0;
    let len, c;
    len = string.length;
    let temp = 0;
    for (let i = 0; i < len; i++) {
      c = string.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10ffff) {
        //特殊字符，如Ř，Ţ
        byteNo += 4;
      } else if (c >= 0x000800 && c <= 0x00ffff) {
        //中文以及标点符号
        byteNo += 3;
      } else if (c >= 0x000080 && c <= 0x0007ff) {
        //特殊字符，如È，Ò
        byteNo += 2;
      } else {
        // 英文以及标点符号
        byteNo += 1;
      }
      if (byteNo % 117 >= 114 || byteNo % 117 == 0) {
        if (byteNo - temp >= 114) {
          bytes.push(i);
          temp = byteNo;
        }
      }
    }
    //2.截取字符串并分段加密
    if (bytes.length > 1) {
      for (let i = 0; i < bytes.length - 1; i++) {
        let str;
        if (i == 0) {
          str = string.substring(0, bytes[i + 1] + 1);
        } else {
          str = string.substring(bytes[i] + 1, bytes[i + 1] + 1);
        }
        let t1 = k.encrypt(str);
        ct += t1;
      }
      if (bytes[bytes.length - 1] != string.length - 1) {
        let lastStr = string.substring(bytes[bytes.length - 1] + 1);
        ct += k.encrypt(lastStr);
      }
      return hex2b64(ct);
    }
    let t = k.encrypt(string);
    let y = hex2b64(t);
    return y;
  } catch (ex) {
    return false;
  }
};
