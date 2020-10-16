import { skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

skipWaiting();
clientsClaim();

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
  /\/.*\.(?:jpg|gif|png|js|css)$/,
  new StaleWhileRevalidate({
    cacheName: 'local-static-file-cache',
  })
);

registerRoute(
  /^(http|https):\/\/resource.re888show.com.*$/,
  new StaleWhileRevalidate({
    cacheName: 'cors-re888show-static-file-catch',
    fetchOptions: {
      mode: 'cors',
      credentials: 'omit',
    },
  })
);

registerRoute(
  /^(http|https):\/\/resource.thsitea.com.*$/,
  new StaleWhileRevalidate({
    cacheName: 'cors-thsitea-static-file-catch',
    fetchOptions: {
      mode: 'cors',
      credentials: 'omit',
    },
  })
);

precacheAndRoute(self.__WB_MANIFEST);
