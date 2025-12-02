/* eslint-disable @typescript-eslint/no-require-imports */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/.*\.js\.map/],
  workboxOptions: {
    disableDevLogs: true,
    // Precache all static assets
    globPatterns: ["**/*.{js,css,html,png,svg,ico,woff,woff2,ttf,eot}"],
    // Cache strategy for offline support
    runtimeCaching: [
      {
        // Cache static assets (JS, CSS, images, fonts)
        urlPattern: /^https?.*\.(js|css|png|svg|ico|woff|woff2|ttf|eot|jpg|jpeg|gif|webp)$/,
        handler: "CacheFirst",
        options: {
          cacheName: "static-resources",
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
      {
        // Cache API calls (if any) - NetworkFirst with fallback
        urlPattern: /^https?:\/\/.*\/api\/.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "api-cache",
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 24 * 60 * 60, // 1 day
          },
        },
      },
      {
        // Cache pages - NetworkFirst but fallback to cache for offline
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "pages-cache",
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
});

module.exports = withPWA({
  reactStrictMode: true,
});

