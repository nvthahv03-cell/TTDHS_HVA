// ============================================================================
// TTĐHS HVA - SERVICE WORKER
// PWA CACHE + FIREBASE CLOUD MESSAGING
// ============================================================================

const CACHE_NAME = 'ttdhs-hva-v3';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './site.webmanifest',
  './android-chrome-192x192.png',
  './android-chrome-512x512.png',
  './favicon.ico'
];

// ============================================================================
// 1. XỬ LÝ CLICK THÔNG BÁO
// Đặt trước importScripts Firebase để tránh FCM ghi đè hành vi click.
// ============================================================================

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl =
    event.notification?.data?.url ||
    event.notification?.data?.link ||
    './main.html';

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {

      for (const client of clientList) {
        if ('focus' in client) {
          client.postMessage({
            type: 'HVA_NOTIFICATION_CLICK',
            data: event.notification.data || {}
          });

          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});

// ============================================================================
// 2. FIREBASE CLOUD MESSAGING
// ============================================================================

importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'
);

importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
);

firebase.initializeApp({
  apiKey: "AIzaSyBDl-ZYwKJ7f0pvLNr7RUfbM0AS5VD3p60",
  authDomain: "ttdhs-hva.firebaseapp.com",
  projectId: "ttdhs-hva",
  storageBucket: "ttdhs-hva.firebasestorage.app",
  messagingSenderId: "1057528079472",
  appId: "1:1057528079472:web:1e1b5e080f50e7ac3780b5"
});

const messaging = firebase.messaging();

// ============================================================================
// 3. THÔNG BÁO KHI APP Ở NỀN / ĐÃ ĐÓNG
// ============================================================================

messaging.onBackgroundMessage((payload) => {
  console.log('[TTDHS-HVA] Background message:', payload);

  const notification = payload.notification || {};
  const data = payload.data || {};

  const title =
    notification.title ||
    data.title ||
    'TTĐHS Hòa Vang';

  const options = {
    body:
      notification.body ||
      data.body ||
      'Thầy/Cô có thông báo mới.',

    icon: './android-chrome-192x192.png',
    badge: './android-chrome-192x192.png',

    data: {
      ...data,
      url: data.url || data.link || './main.html'
    },

    tag: data.notificationId || data.objectId || 'ttdhs-hva',

    renotify: true
  };

  return self.registration.showNotification(title, options);
});

// ============================================================================
// 4. CÀI ĐẶT PWA CACHE
// ============================================================================

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// ============================================================================
// 5. KÍCH HOẠT SERVICE WORKER
// ============================================================================

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// ============================================================================
// 6. CACHE / NETWORK
// Không can thiệp các request POST và request ngoài HTTP/HTTPS.
// ============================================================================

self.addEventListener('fetch', (event) => {

  if (
    event.request.method !== 'GET' ||
    !event.request.url.startsWith('http')
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
  );
});
