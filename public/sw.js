importScripts('/workbox-sw-5.1.2.js');
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.setConfig({ debug: false });

/**
 ** 存頁面
 ** 1. 只存 / 首頁而已
 ** 2. 存所有沒有 . 的頁面
 */
workbox.routing.registerRoute(
  /^(http|https).*\/$/,
  // /^(http|https)[^\.]+$/,
  new workbox.strategies.StaleWhileRevalidate({
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
  self.skipWaiting(); //* skipWaiting 可以跳過等待 service worker 的更新週期，直接套用最新的 sw.js
});
