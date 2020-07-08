importScripts('/workbox-sw-5.1.2.js');
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.setConfig({ debug: false });

// 目前因為語系導致頁面變化，改採用 NetworkFirst
workbox.routing.registerRoute(
  /\/Y\/NoneLogin\/MainPage/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'page-cache',
  })
);

workbox.routing.registerRoute(
  /.*\.(jpg|gif|png|js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'static-file-cache',
  })
);

self.addEventListener('install', function() {
  self.skipWaiting(); // skipWaiting 可以跳過等待，直接套用最新的快取
});
