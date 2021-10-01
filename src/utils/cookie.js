/*
  跟 cookie 有關的都放這
*/
import Cookies from 'js-cookie';
// import settings from '@/settings';

// const tokenKey = 'token';
// const tokenConfig = { sameSite: 'lax' };

// const publicKeyKey = 'publicKey';
// const publicKeyConfig = { sameSite: 'lax' };

const isLoggedInKey = 'isLoggedIn';
const isLoggedInConfig = { sameSite: 'lax' };

const langKey = 'lang';
const langConfig = { sameSite: 'lax' };

const versionKey = 'version';
const versionConfig = { sameSite: 'lax' };

const isPreviewKey = 'isPreview';
const isPreviewConfig = { sameSite: 'lax' };

const notShowMessageDateKey = 'notShowMessageDate';
const notShowMessageDateConfig = { sameSite: 'lax' };

// export function cookieGetToken() {
//   return Cookies.get(tokenKey);
// }

// export function cookieSetToken(token) {
//   return Cookies.set(tokenKey, token, tokenConfig);
// }

// export function cookieRemoveToken() {
//   return Cookies.remove(tokenKey);
// }

// export function cookieGetPublicKey() {
//   return Cookies.get(publicKeyKey);
// }

// export function cookieSetPublicKey(publicKey) {
//   return Cookies.set(publicKeyKey, publicKey, publicKeyConfig);
// }

// export function cookieRemovePublicKey() {
//   return Cookies.remove(publicKeyKey);
// }

export function cookieGetIsLoggedIn() {
  return Cookies.get(isLoggedInKey) === 'true';
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

export function cookieGetVersion() {
  return Cookies.get(versionKey);
}

export function cookieSetVersion(version) {
  return Cookies.set(versionKey, version, versionConfig);
}

export function cookieRemoveVersion() {
  return Cookies.remove(versionKey);
}

export function cookieGetIsPreview() {
  return Cookies.get(isPreviewKey) === 'true';
}

export function cookieSetIsPreview(isPreview) {
  return Cookies.set(isPreviewKey, isPreview, isPreviewConfig);
}

export function cookieRemoveIsPreview() {
  return Cookies.remove(isPreviewKey);
}

export function cookieGetNotShowMessageDate() {
  return Cookies.get(notShowMessageDateKey);
}

export function cookieSetNotShowMessageDate(date) {
  return Cookies.set(notShowMessageDateKey, date, notShowMessageDateConfig);
}

export function cookieRemoveNotShowMessageDate() {
  return Cookies.remove(notShowMessageDateKey);
}
