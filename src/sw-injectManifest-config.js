// import { skipWaiting, clientsClaim } from 'workbox-core';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { precacheAndRoute } from 'workbox-precaching';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

// self.skipWaiting();
// self.clients.claim();

//* API Cache
registerRoute(
  ({ url }) => {
    return url.pathname.startsWith('/api');
  },
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({
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

registerRoute(
  /^(http|https).*\/$/,
  new StaleWhileRevalidate({
    cacheName: 'page-cache',
  })
);

registerRoute(
  /^(http|https).*\/$/,
  new StaleWhileRevalidate({
    cacheName: 'page-cache',
  })
);

registerRoute(
  /\/.*\.(?:jpg|gif|png|js|css)$/,
  new StaleWhileRevalidate({
    cacheName: 'local-static-file-cache',
  })
);

//* 測試站使用的
registerRoute(
  /^(http|https):\/\/resource.re888show.com.*$/,
  new StaleWhileRevalidate({
    cacheName: 'cors-re888show-static-file-cache',
    fetchOptions: {
      mode: 'cors',
      credentials: 'omit',
    },
  })
);

//* 正式站使用的
registerRoute(
  /^(http|https):\/\/(resource|resource2).thsitea.com.*$/,
  new StaleWhileRevalidate({
    cacheName: 'cors-thsitea-static-file-cache',
    fetchOptions: {
      mode: 'cors',
      credentials: 'omit',
    },
  })
);

registerRoute(
  /^(http|https):\/\/.*ManifestJson$/i,
  new StaleWhileRevalidate({
    cacheName: 'manifest-cache',
  })
);

precacheAndRoute(self.__WB_MANIFEST);
