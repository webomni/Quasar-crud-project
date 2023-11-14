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
import { StaleWhileRevalidate, NetworkFirst } from "workbox-strategies";
import { Queue } from "workbox-background-sync";

// desabilita os logs da caixa de trabalho
/* self.__WB_DISABLE_DEV_LOGS = true; */

self.skipWaiting();
clientsClaim();

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

let backgroundSyncSupport = "sync" in self.registration ? true : false;
console.log("backgroundSyncSupport: ", backgroundSyncSupport);

/**
 * queue - createPost
 */
var createPostQueue = null;
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

registerRoute(
  ({ url }) => url.href.startsWith("/api/cadastros"),
  new NetworkFirst()
);
registerRoute(
  ({ url }) => url.href.startsWith("http"),
  new StaleWhileRevalidate()
);

/**
 * events - fetch
 */
console.log("veio 1");
if (backgroundSyncSupport) {
  self.addEventListener("fetch", (event) => {
    // Add in your own criteria here to return early if this
    // isn't a request that should use background sync.
    console.log("veio 2");
    if (event.request.method !== "POST") {
      return;
    }
    console.log("event.request.url");
    console.log(event);
    if (event.request.url.endsWith("cadastros")) {
      console.log("url = true");
      const bgSyncLogic = async () => {
        try {
          const response = await fetch(event.request.clone());
          return response;
        } catch (error) {
          console.log("erro queue: ", error);
          await createPostQueue.pushRequest({ request: event.request });
          return error;
        }
      };

      event.respondWith(bgSyncLogic());
    }
  });
}
