if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw_cache_site.js')
      // .register('./sw.js')
      .then(reg => console.log('SW: register'))
      .catch(err => console.log(`SW: failed ${err}`))
  })
}
