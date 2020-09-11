export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

export function isIos() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

//* 只要是以 Chrome OS 為基底的瀏覽器都會歸類於此
//export function isChrome() {
//   return /chrome/i.test(window.navigator.userAgent);
// }

// 判斷是否在 PWA 上執行的
export function isStandaloneMode() {
  return (
    navigator.standalone ||
    matchMedia('(display-mode: standalone)').matches ||
    matchMedia('(display-mode: fullscreen)').matches ||
    matchMedia('(display-mode: minimal-ui)').matches
  );
}
