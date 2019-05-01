const cacheName = 'v3'

// Call install event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed')
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

  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Make clone of response
        const resClone = res.clone()
        // OPen a cash
        caches
          .open(cacheName)
          .then(cache => {
          // Add response to cache
            cache.put(e.request, resClone)
          })
        return res
      })
      .catch((err) => caches.match(e.request).then(res => res))
  )
})
