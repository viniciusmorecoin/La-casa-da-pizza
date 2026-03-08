const CACHE_NAME = 'la-casa-pizza-v1';
const ASSETS = [
  './',
  './index.html',
  './logo.png',
  // Adicione aqui os nomes das suas imagens de pizza se quiser que elas carreguem offline
  // './IMG_0206.png',
  // './IMG_0207.png'
];

// Instalação: Salva os arquivos essenciais no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação: Limpa caches antigos se você atualizar a versão
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estratégia: Tenta carregar da rede, se falhar (offline), pega do cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
