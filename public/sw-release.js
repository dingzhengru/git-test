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
 */
workbox.routing.registerRoute(
  ({ url }) => {
    const pageList = ['/', '/contact', '/about', '/news'];
    const pageListStartWith = ['/promotion'];

    return (
      pageList.some(item => url.pathname === item && url.search === '') ||
      pageListStartWith.some(item => url.pathname.startsWith(item))
    );
  },
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'page-cache',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [200, 403],
      }),
    ],
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
  /^(http|https):\/\/resource.h3use.co.*$/,
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
