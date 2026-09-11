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
//  - For everything else (JS/CSS chunks, images, fonts, and — importantly —
//    large downloaded assets like AI model files: same-origin or
//    cross-origin CDN alike): stale-while-revalidate — serve instantly from
//    cache if we have it, while quietly re-fetching a fresh copy in the
//    background for next time.
//
// IMPORTANT: the Cache API cannot store HTTP 206 (Partial Content)
// responses — browsers use 206 for range requests, which large files
// (like AI model downloads) commonly trigger. Attempting cache.put() on a
// 206 response throws, so those responses are explicitly skipped below.
// Caching is also never allowed to interfere with delivering the actual
// network response to the page — every cache.put() is wrapped so a
// caching failure can never break or corrupt the real fetch.

const CACHE_NAME = "quickzeta-v2";
const OFFLINE_URL = "/offline.html";
const PRECACHE_URLS = [OFFLINE_URL, "/icon-192.png", "/icon-512.png"];

function isCacheable(response) {
  // Only ever cache complete, successful responses. 206 (partial content)
  // is explicitly excluded — the Cache API rejects it outright, which is
  // exactly the bug this fixes.
  return !!response && (response.status === 200 || response.type === "opaque");
}

function safeCachePut(cache, request, response) {
  // Caching is a nice-to-have side effect — it must never throw in a way
  // that could affect the actual response already being returned to the
  // page, so every failure here is swallowed, not propagated.
  try {
    if (isCacheable(response)) {
      cache.put(request, response).catch(() => {});
    }
  } catch (e) {
    // Ignore — caching failures should never break the real request.
  }
}

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

  // Only ever handle simple GETs — never intercept POSTs, range requests
  // with a Range header get handled by the browser's normal network path
  // when we don't have a full cached copy, avoiding partial-response
  // caching issues entirely.
  if (request.method !== "GET") return;

  // Page navigations: network-first, falling back to cache, then to the
  // offline page as a last resort.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => safeCachePut(cache, request, copy));
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          return cachedResponse || caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  // Everything else: stale-while-revalidate.
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const networkFetch = fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => safeCachePut(cache, request, copy));
          return response;
        })
        .catch(() => cachedResponse);
      return cachedResponse || networkFetch;
    })
  );
});
