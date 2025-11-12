// T&H WebWorks Service Worker
// Provides caching, offline functionality, and performance improvements

const CACHE_NAME = 'th-webworks-v1.1.0';
const STATIC_CACHE = 'static-v1.1.0';
const DYNAMIC_CACHE = 'dynamic-v1.1.0';

// Files to cache immediately
const STATIC_FILES = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js?v=20251112',
    '/assets/TH_Assets/logo_nav_trans.webp',
    '/assets/TH_Assets/logo_full_trans.webp',
    '/assets/TH_Assets/logo_full_black.webp',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap'
];

// Files to cache on demand
const DYNAMIC_FILES = [
    '/assets/portfolio/',
    '/assets/TH_Assets/Team/',
    '/privacy.html',
    '/terms.html',
    '/404.html'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then((cache) => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Error caching static files', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other non-http requests
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                // Return cached version if available
                if (cachedResponse) {
                    // For HTML files, check for updates in background
                    if (request.destination === 'document') {
                        updateCache(request);
                    }
                    return cachedResponse;
                }
                
                // Fetch from network and cache if appropriate
                return fetch(request)
                    .then((response) => {
                        // Only cache successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Cache dynamic content
                        if (shouldCache(request)) {
                            const responseToCache = response.clone();
                            caches.open(DYNAMIC_CACHE)
                                .then((cache) => {
                                    cache.put(request, responseToCache);
                                });
                        }
                        
                        return response;
                    })
                    .catch((error) => {
                        console.error('Service Worker: Fetch failed', error);
                        
                        // Return offline fallback for HTML requests
                        if (request.destination === 'document') {
                            return caches.match('/404.html');
                        }
                        
                        // Return empty response for other failed requests
                        return new Response('', {
                            status: 408,
                            statusText: 'Request timeout'
                        });
                    });
            })
    );
});

// Update cache in background
function updateCache(request) {
    fetch(request)
        .then((response) => {
            if (response && response.status === 200) {
                caches.open(STATIC_CACHE)
                    .then((cache) => {
                        cache.put(request, response);
                    });
            }
        })
        .catch(() => {
            // Silently fail background updates
        });
}

// Determine if request should be cached
function shouldCache(request) {
    const url = new URL(request.url);
    
    // Cache images
    if (request.destination === 'image') {
        return true;
    }
    
    // Cache fonts
    if (url.pathname.includes('fonts.googleapis.com') || 
        url.pathname.includes('fonts.gstatic.com')) {
        return true;
    }
    
    // Cache CSS and JS
    if (request.destination === 'style' || request.destination === 'script') {
        return true;
    }
    
    // Cache HTML pages
    if (request.destination === 'document' && url.origin === location.origin) {
        return true;
    }
    
    return false;
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form') {
        event.waitUntil(syncContactForm());
    }
});

// Sync contact form submissions when back online
function syncContactForm() {
    return new Promise((resolve, reject) => {
        // Get stored form data from IndexedDB
        // This would be implemented with actual form data storage
        console.log('Service Worker: Syncing contact form submissions');
        resolve();
    });
}

// Push notification handling
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New update from T&H WebWorks',
        icon: '/assets/TH_Assets/logo_nav_trans.webp',
        badge: '/assets/TH_Assets/logo_nav_trans.webp',
        vibrate: [200, 100, 200],
        data: {
            url: '/'
        },
        actions: [
            {
                action: 'open',
                title: 'Open Website',
                icon: '/assets/TH_Assets/logo_nav_trans.webp'
            },
            {
                action: 'close',
                title: 'Close'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('T&H WebWorks', options)
    );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'open' || !event.action) {
        event.waitUntil(
            clients.openWindow(event.notification.data.url || '/')
        );
    }
});

// Periodic background sync for cache updates
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'cache-update') {
        event.waitUntil(updateCriticalResources());
    }
});

// Update critical resources in background
function updateCriticalResources() {
    return Promise.all([
        updateCache(new Request('/')),
        updateCache(new Request('/styles.css')),
        updateCache(new Request('/script.js'))
    ]);
}

// Handle messages from main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({ version: CACHE_NAME });
    }
});

console.log('Service Worker: Loaded successfully');
