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

export function openNewWindowURL(newWindow, url) {
  if (newWindow == null || !newWindow) {
    newWindow = window.open(url);
  } else {
    newWindow.location = url;
  }
  return newWindow;
}

export function openNewWindowHTML(newWindow, htmlContent, title = '') {
  if (newWindow == null || !newWindow) {
    newWindow = window.open();
    newWindow.document.title = title;
    newWindow.document.write(htmlContent);
  } else {
    newWindow.document.title = title;
    newWindow.document.write(htmlContent);
  }
}

// export const newWindowLadingHTML = `
// <h1 style="font-size: 10vh;">Loading</h1>

// <script>

// document.title = 'Loading...';

// setInterval(() => {
//   const text = document.querySelector('h1').innerText;
//   const dotCount = text.split('.').length - 1;

//   if(dotCount >= 3) {
//     document.querySelector('h1').innerText = text.replaceAll('.', '');
//   } else {
//     document.querySelector('h1').innerText = text + '.';
//   }
// }, 300);
// </script>
// `;
