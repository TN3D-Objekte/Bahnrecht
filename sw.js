// BahnRecht Service Worker v4
// Beim Update hier hochzählen → Browser lädt alles neu
const CACHE_NAME = 'bahnrecht-v4';
const CACHE_STATIC = [
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHE_STATIC);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k){ return k !== CACHE_NAME; })
            .map(function(k){ return caches.delete(k); })
      );
    }).then(function(){
      return self.clients.matchAll({ includeUncontrolled: true });
    }).then(function(clients){
      clients.forEach(function(client){
        client.postMessage({ type: 'SW_UPDATED' });
      });
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') return;
  var url = event.request.url;
  var isHTML = url.endsWith('.html') || url.endsWith('/');

  if (isHTML) {
    // Network First: immer aktuellste Version von GitHub laden
    event.respondWith(
      fetch(event.request).then(function(response) {
        if (response && response.status === 200) {
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, response.clone());
          });
        }
        return response;
      }).catch(function() {
        // Offline-Fallback aus Cache
        return caches.match(event.request).then(function(cached){
          return cached || caches.match('./bahnrecht.html');
        });
      })
    );
  } else {
    // Cache First für Icons/Manifest
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        return cached || fetch(event.request).then(function(response) {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, response.clone());
            });
          }
          return response;
        });
      })
    );
  }
});
