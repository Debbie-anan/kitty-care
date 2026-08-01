const CACHE_NAME = 'kitty-care-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/bg.png',
  './assets/idle.png',
  './assets/walk.png',
  './assets/eat.png',
  './assets/drink.png',
  './assets/play.png',
  './assets/sleep.png',
  './assets/roll.png',
  './assets/pickedup.png',
  './assets/bowl.png',
  './assets/item_bed.png',
  './assets/item_food.png',
  './assets/item_water.png',
  './assets/bell.mp3',
  './assets/eat.mp3',
  './assets/meow.mp3',
  './assets/meow2.mp3',
  './assets/purr.mp3',
  './assets/sleep.mp3',
  './assets/step.mp3',
  './assets/water.mp3',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
