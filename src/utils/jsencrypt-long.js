// Convert a hex string to a byte array
function hexToBytes(hex) {
  for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

// Convert a byte array to a hex string
// function bytesToHex(bytes) {
//   for (var hex = [], i = 0; i < bytes.length; i++) {
//     hex.push((bytes[i] >>> 4).toString(16));
//     hex.push((bytes[i] & 0xf).toString(16));
//   }
//   return hex.join('');
// }

JSEncrypt.prototype.encryptLong2 = function(string) {
  var k = this.getKey();
  try {
    var lt = '';
    var ct = '';
    //RSA每次加密117bytes，需要辅助方法判断字符串截取位置
    //1.获取字符串截取点
    var bytes = new Array();
    bytes.push(0);
    var byteNo = 0;
    var len, c;
    len = string.length;
    var temp = 0;
    for (var i = 0; i < len; i++) {
      c = string.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10ffff) {
        byteNo += 4;
      } else if (c >= 0x000800 && c <= 0x00ffff) {
        byteNo += 3;
      } else if (c >= 0x000080 && c <= 0x0007ff) {
        byteNo += 2;
      } else {
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
      for (var i = 0; i < bytes.length - 1; i++) {
        var str;
        if (i == 0) {
          str = string.substring(0, bytes[i + 1] + 1);
        } else {
          str = string.substring(bytes[i] + 1, bytes[i + 1] + 1);
        }
        var t1 = k.encrypt(str);
        ct += t1;
      }
      if (bytes[bytes.length - 1] != string.length - 1) {
        var lastStr = string.substring(bytes[bytes.length - 1] + 1);
        ct += k.encrypt(lastStr);
      }
      return hexToBytes(ct);
    }
    var t = k.encrypt(string);
    var y = hexToBytes(t);
    return y;
  } catch (ex) {
    return false;
  }
};
