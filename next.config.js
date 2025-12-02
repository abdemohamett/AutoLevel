/* eslint-disable @typescript-eslint/no-require-imports */
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

module.exports = withPWA({
  reactStrictMode: true,
  // Add empty turbopack config to silence the warning
  // PWA plugin uses webpack, but we can still use Turbopack for dev
  turbopack: {},
});

