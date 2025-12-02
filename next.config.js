/* eslint-disable @typescript-eslint/no-require-imports */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/.*\.js\.map/],
  workboxOptions: {
    disableDevLogs: true,
    runtimeCaching: [
      {
        urlPattern: /^https?.*\.(js|css|png|svg|ico|woff|woff2|ttf|eot)$/,
        handler: "CacheFirst",
        options: {
          cacheName: "static-resources",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          },
        },
      },
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "pages",
          networkTimeoutSeconds: 3,
        },
      },
    ],
  },
});

module.exports = withPWA({
  reactStrictMode: true,
  // Add empty turbopack config to silence the warning
  // PWA plugin uses webpack, but we can still use Turbopack for dev
  turbopack: {},
});

