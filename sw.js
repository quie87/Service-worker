const cacheName = 'v2'
const cacheAssets = [
  'index.html',
  'css/style.css',
  '/js/main.js'
]

// Call install event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed')

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service worker: caching files')
        cache.addAll(cacheAssets)
      })
      .then(() => self.skipWaiting())
  )
})

// Call activate event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated')

  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service worker: clear old cash')
            return caches.delete(cache)
          }
        })
      )
    })
  )
})

// Call fetch event
self.addEventListener('fetch', e => {
  console.log('service worker: fetching...')

  e.respondWith(fetch(e.request).catch((err) => caches.match(e.request)))
})
