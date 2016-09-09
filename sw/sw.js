// this is the service worker which intercepts all http requests
console.log('Started service worker');
self.addEventListener('install', function(event) {
  //self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});

self.addEventListener('fetch', function fetcher (event) {
  var request = event.request;
  // check if request
  if (request.url.indexOf('storage.googleapis.com/poketrainers-b1785.appspot.com') > -1) {
    // contentful asset detected
    event.respondWith(
      caches.match(event.request).then(function(response) {
        // return from cache, otherwise fetch from network
        return response || fetch(request);
      })
    );
  }
  // otherwise: ignore event
});
