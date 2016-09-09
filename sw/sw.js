// this is the service worker which intercepts all http requests
console.log('Started service worker');
var CACHE_NAME = 'poke-trainers-cache';

self.addEventListener('install', function(event) {
  console.log('Installed', event);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache){
        return cache.addAll([
          '/iv-calculator',
          '/best-pokemon',
          '/pokemon-evolve',
          '/egg-chart',
          '/candies-calculator',
          '/about',
          '/'
        ])
      })
      .then(function(){
        return self.skipWaiting();
      })
  )
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
  event.waitUntil(
    caches.delete(CACHE_NAME)
      .then(function(){
        self.clients.claim();
      })
    );
});

self.addEventListener('fetch', function fetcher (event) {
  var request = event.request;
  // check if request
  if (request.url.indexOf('storage.googleapis.com/poketrainers-b1785.appspot.com') > -1
      || request.url.indexOf('static/js') > -1
      || request.url.indexOf('static/css') > -1
      || ( request.url.indexOf('localhost') > -1
          && request.url.indexOf('collect') === -1
          && request.url.indexOf('sockjs') === -1 )
      || ( request.url.indexOf('poketrainers.co') > -1
          && request.url.indexOf('collect') === -1) ) {
    // contentful asset detected
    //console.log('Intercepting request',request.url, event);
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // return from cache, otherwise fetch from network
          return response
            || fetch(event.request.clone())
                .then(function(response){
                  if(!response || response.status !== 200 || response.type !== 'basic'){
                    return response;
                  }
                  var responseToCache = response.clone();
                  caches
                    .open(CACHE_NAME)
                    .then(function(cache){
                      cache.put(event.request, responseToCache);
                    });
                  return response;
                });
      })
    );
  }/*else{
    console.log('Doing nothing with request', request.url, event);
  }*/
  // otherwise: ignore event
});
