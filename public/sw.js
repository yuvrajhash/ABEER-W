const CACHE_NAME = 'aipl-cache-v1';
const RUNTIME_CACHE = 'aipl-runtime-v1';

// Resources to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/favicon.svg',
  '/images/og-image.jpg',
  '/images/twitter-image.jpg',
  // Add other static assets that should be available offline
];

// Install event - precache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (event.request.url.startsWith(self.location.origin)) {
    // For HTML pages - network first with cache fallback
    if (event.request.headers.get('accept').includes('text/html')) {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            // Cache the latest version of the page
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clonedResponse);
            });
            return response;
          })
          .catch(() => {
            // If network fails, try to serve from cache
            return caches.match(event.request);
          })
      );
      return;
    }
    
    // For images and other assets - cache first, network fallback
    if (
      event.request.url.match(/\.(jpe?g|png|gif|svg|webp|css|js)$/i) ||
      event.request.url.includes('/images/')
    ) {
      event.respondWith(
        caches.match(event.request)
          .then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            return fetch(event.request)
              .then((response) => {
                // Cache the fetched resource
                const clonedResponse = response.clone();
                caches.open(RUNTIME_CACHE).then((cache) => {
                  // Only cache valid responses
                  if (response.status === 200) {
                    cache.put(event.request, clonedResponse);
                  }
                });
                return response;
              });
          })
      );
      return;
    }
  }
  
  // Default strategy - network first
  event.respondWith(
    fetch(event.request)
      .catch(() => caches.match(event.request))
  );
}); 