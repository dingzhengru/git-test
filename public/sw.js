importScripts('/workbox-sw-5.1.2.js');

workbox.setConfig({ debug: false });

// workbox.routing.registerRoute(
//   /(\/AlreadyLogin\/|\/NoneLogin\/)(?!LobbyGameRedirect)/,
//   new workbox.strategies.NetworkFirst({
//     cacheName: "page-cache",
//   })
// );

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

// workbox.routing.registerRoute(
//   /(empty)/,
//   new workbox.strategies.StaleWhileRevalidate({
//     cacheName: 'global-static-file-cache',
//   })
// );

// Fetch CORS assest
// addEventListener('fetch', function(e) {
//   // Put CORS resorce host here
//   const hosts = ['https://resource.thsitea.com'];
//   if (hosts.some(host => e.request.url.startsWith(host))) {
//     e.respondWith(
//       (async function() {
//         const cachedResponse = await caches.match(e.request);
//         if (cachedResponse) {
//           return cachedResponse;
//         }

//         const networkResponse = await fetch(e.request, {
//           mode: 'cors',
//           credentials: 'omit',
//         });
//         if (networkResponse.status == '200') {
//           // if fetch success
//           const clonedResponse = networkResponse.clone();

//           e.waitUntil(
//             (async function() {
//               const cache = await caches.open('global-static-file-cache');
//               // This will be called after `return networkResponse`
//               await cache.put(e.request, clonedResponse);
//             })()
//           );
//         } else {
//           return;
//         }

//         return networkResponse;
//       })()
//     );
//   }
// });

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
