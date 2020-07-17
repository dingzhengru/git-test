import JSEncrypt from 'jsencrypt';

export function rsaEncrypt(data, pubKey) {
  // 創建 "公鑰加密" 物件
  const encrypt = new JSEncrypt();

  // 設公鑰
  encrypt.setPublicKey(pubKey);

  // 加密
  return encrypt.encrypt(JSON.stringify(data));
}
