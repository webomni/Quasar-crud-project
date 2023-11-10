/* eslint-env serviceworker */

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */

import { clientsClaim } from "workbox-core";
import {
  precacheAndRoute,
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
} from "workbox-precaching";
import { registerRoute, NavigationRoute } from "workbox-routing";
//import { StaleWhileRevalidate } from "workbox-strategies";
import { NetworkFirst } from "workbox-strategies";
import { Queue } from "workbox-background-sync";

self.skipWaiting();
clientsClaim();

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

let backgroundSyncSupport = "sync" in self.registration ? true : false;
console.log("backgroundSyncSupport: ", backgroundSyncSupport);

/**
 * queue - createPost
 */
let createPostQueue = null;
if (backgroundSyncSupport) {
  createPostQueue = new Queue("createPostQueue");
}
/*
cleanupOutdatedCaches();

// Non-SSR fallback to index.html
// Production SSR fallback to offline.html (except for dev)
if (process.env.MODE !== "ssr" || process.env.PROD) {
  registerRoute(
    new NavigationRoute(
      createHandlerBoundToURL(process.env.PWA_FALLBACK_HTML),
      { denylist: [/sw\.js$/, /workbox-(.)*\.js$/] }
    )
  );
} */
/* registerRoute(
  ({ url }) => url.href.startsWith("http"),
  new StaleWhileRevalidate()
); */

registerRoute(({ url }) => url.href.startsWith("http"), new NetworkFirst());

/**
 * events - fetch
 */
if (backgroundSyncSupport) {
  self.addEventListener("fetch", (event) => {
    // Add in your own criteria here to return early if this
    // isn't a request that should use background sync.
    if (event.request.method !== "POST") {
      return;
    }
    if (event.request.url.endsWith("/cadastros")) {
      const bgSyncLogic = async () => {
        try {
          const response = await fetch(event.request.clone());
          return response;
        } catch (error) {
          await createPostQueue.pushRequest({ request: event.request });
          return error;
        }
      };

      event.respondWith(bgSyncLogic());
    }
  });
}
