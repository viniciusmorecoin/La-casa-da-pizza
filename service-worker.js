const CACHE_NAME = 'lacasa-cache-v1';
const assets = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  './icon-192.png',
  './icon-512.png'
];

// Instalação: Salva arquivos essenciais no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Ativação: Limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    })
  );
});

// Busca: Serve do cache se estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
