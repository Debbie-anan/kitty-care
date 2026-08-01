const CACHE_NAME = 'kitty-care-v3';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/bg.jpg',
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
  const url = new URL(e.request.url);
  if (e.request.mode === 'navigate' || url.pathname.endsWith('.html')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
  } else {
    e.respondWith(
      caches.match(e.request).then(r => r || fetch(e.request))
    );
  }
});
