const CACHE = 'william-slide-teleport-v2';
const FILES = [
  './', './index.html', './styles.css', './app.js', './manifest.json',
  './assets/home-recording.mp4', './assets/home-poster.jpg', './assets/awards.jpg',
  './assets/biography.jpg', './assets/contact.jpg', './assets/icon-192.png', './assets/icon-512.png'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
