/*
  跟 cookie 有關的都放這
*/
import Cookies from 'js-cookie';
// import settings from '@/settings';

const tokenKey = 'token';
const publicKeyKey = 'publicKey';
const isLoggedInKey = 'isLoggedIn';
const langKey = 'lang'; //! 目前語系

/**
 * ? sameSite  設定跨網域是否給予存取此 cookie 的規則，有三種設定，Strict | Lax | None，參考: https://medium.com/@ChibaKuma/chrome-80-samesite-cookie-%E7%9A%84%E5%BD%B1%E9%9F%BF-dce3ecff732a
 * ? expires   天數，不過可用小數設置一天以下 ex: 0.5 代表半天, 1/48 代表半小時
 */

const tokenConfig = {
  sameSite: 'lax',
};

const publicKeyConfig = {
  sameSite: 'lax',
};

const isLoggedInConfig = {
  sameSite: 'lax',
};

const langConfig = {
  sameSite: 'lax',
  expires: 365,
};

export function cookieGetToken() {
  return Cookies.get(tokenKey);
}

export function cookieSetToken(token) {
  return Cookies.set(tokenKey, token, tokenConfig);
}

export function cookieRemoveToken() {
  return Cookies.remove(tokenKey);
}

export function cookieGetPublicKey() {
  return Cookies.get(publicKeyKey);
}

export function cookieSetPublicKey(publicKey) {
  return Cookies.set(publicKeyKey, publicKey, publicKeyConfig);
}

export function cookieRemovePublicKey() {
  return Cookies.remove(publicKeyKey);
}

export function cookieGetIsLoggedIn() {
  return Cookies.get(isLoggedInKey) == 'true';
}

export function cookieSetIsLoggedIn(isLoggedIn) {
  return Cookies.set(isLoggedInKey, isLoggedIn, isLoggedInConfig);
}

export function cookieRemoveIsLoggedIn() {
  return Cookies.remove(isLoggedInKey);
}

export function cookieGetLang() {
  return Cookies.get(langKey);
}

export function cookieSetLang(lang) {
  return Cookies.set(langKey, lang, langConfig);
}

export function cookieRemoveLang() {
  return Cookies.remove(langKey);
}
