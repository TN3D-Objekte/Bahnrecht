// BahnRecht Service Worker
// Version: 1.0 — beim Update hier hochzählen → Browser lädt alles neu
const CACHE_NAME = 'bahnrecht-v2';

// Alle Dateien die offline verfügbar sein sollen
const FILES_TO_CACHE = [
  './bahnrecht.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// Installation: alle Dateien in Cache laden
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[SW] Caching app shell');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  // Sofort aktiv werden ohne auf Tab-Schließen zu warten
  self.skipWaiting();
});

// Aktivierung: alten Cache aufräumen
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== CACHE_NAME) {
          console.log('[SW] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  // Sofort Kontrolle übernehmen
  self.clients.claim();
});

// Fetch: Cache-First Strategie
// → Erst aus Cache laden, bei Misserfolg vom Netz holen
self.addEventListener('fetch', function(event) {
  // Nur GET-Anfragen cachen
  if (event.request.method !== 'GET') return;

  // Externe Ressourcen (Fonts, CDN) mit Network-First behandeln
  const url = new URL(event.request.url);
  const isExternal = url.origin !== self.location.origin;

  if (isExternal) {
    // Netz zuerst, Cache als Fallback
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          // Erfolgreiche externe Antwort optional cachen
          if (response && response.status === 200) {
            var responseClone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(function() {
          // Offline: aus Cache versuchen
          return caches.match(event.request);
        })
    );
  } else {
    // Eigene Dateien: Cache zuerst
    event.respondWith(
      caches.match(event.request).then(function(response) {
        if (response) {
          return response;
        }
        // Nicht im Cache → vom Netz laden und cachen
        return fetch(event.request).then(function(networkResponse) {
          if (networkResponse && networkResponse.status === 200) {
            var responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        });
      })
    );
  }
});
