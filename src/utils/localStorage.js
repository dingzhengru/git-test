const tokenKey = 'token';
const publicKeyKey = 'publicKey';

export function localStorageGetToken() {
  return localStorage.getItem(tokenKey);
}

export function localStorageSetToken(item) {
  return localStorage.setItem(tokenKey, item);
}

export function localStorageRemoveToken() {
  return localStorage.removeItem(tokenKey);
}

export function localStorageGetPublicKey() {
  return localStorage.getItem(publicKeyKey);
}

export function localStorageSetPublicKey(item) {
  return localStorage.setItem(publicKeyKey, item);
}

export function localStorageRemovePublicKey() {
  return localStorage.removeItem(publicKeyKey);
}
