// QuickZeta service worker.
// Scope: whole site (registered at "/", so it can intercept any request).
//
// Strategy, kept deliberately simple and honest about what it actually does:
//  - On first install, precache the offline fallback page and a couple of
//    core static assets, so the fallback itself always works even before
//    anything else has been visited.
//  - For page navigations: try the network first (so visitors always get
//    the freshest version when online), falling back to a cached copy of
//    that exact page if one exists, and finally to the offline page if not.
//  - For everything else (JS/CSS chunks, images, fonts — same-origin or
//    cross-origin CDN assets alike): stale-while-revalidate — serve
//    instantly from cache if we have it, while quietly re-fetching a fresh
//    copy in the background for next time. This is what lets a tool you've
//    already opened once keep working without a connection.

const CACHE_NAME = "quickzeta-v1";
const OFFLINE_URL = "/offline.html";
const PRECACHE_URLS = [OFFLINE_URL, "/icon-192.png", "/icon-512.png"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Only ever handle simple GETs — never intercept POSTs or other methods.
  if (request.method !== "GET") return;

  // Page navigations: network-first, falling back to cache, then to the
  // offline page as a last resort.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(request);
          return cached || caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // Everything else: stale-while-revalidate.
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          // Cache same-origin responses and cross-origin "opaque" CDN
          // responses alike — opaque responses can't be inspected, but
          // they're still safely cacheable and re-servable later.
          if (response && (response.ok || response.type === "opaque")) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
