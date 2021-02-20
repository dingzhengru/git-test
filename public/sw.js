importScripts('/workbox-sw-5.1.2.js');

workbox.setConfig({ debug: false });

//* API Cache
workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

/**
 ** cache 頁面
 ** 1. 只存 / 首頁而已
 ** 2. 存所有沒有 . 的頁面 (目前註解掉的那個)
 */
workbox.routing.registerRoute(
  /^(http|https).*\/$/,
  // /^(http|https)[^\.]+$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'page-cache',
  })
);

workbox.routing.registerRoute(
  /\/.*\.(?:jpg|gif|png|js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'local-static-file-cache',
  })
);

workbox.routing.registerRoute(
  /^(http|https):\/\/resource.re888show.com.*$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'cors-re888show-static-file-catch',
    fetchOptions: {
      mode: 'cors',
      credentials: 'omit',
    },
  })
);

workbox.routing.registerRoute(
  /^(http|https):\/\/resource.thsitea.com.*$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'cors-thsitea-static-file-catch',
    fetchOptions: {
      mode: 'cors',
      credentials: 'omit',
    },
  })
);

// self.addEventListener('install', event => {
//   self.skipWaiting();
// });
