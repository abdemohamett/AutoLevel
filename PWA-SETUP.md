# PWA Setup Instructions

## ✅ Completed Steps

1. ✅ Configured `next.config.js` with PWA support using `@ducanh2912/next-pwa`
2. ✅ Created `public/manifest.json` with PWA configuration
3. ✅ Added PWA meta tags to `app/layout.tsx`
4. ✅ Optimized UI for mobile (larger touch targets, responsive design)

## 📱 Generate Icon Files

You need to create two icon files:
- `public/icon-192.png` (192x192 pixels)
- `public/icon-512.png` (512x512 pixels)

### Option 1: Use the HTML Generator (Easiest)

1. Open `scripts/generate-icons.html` in your browser
2. Click "Download icon-192.png"
3. Click "Download icon-512.png"
4. Move both files to the `public/` folder

### Option 2: Use Online Tool

1. Go to https://realfavicongenerator.net/ or similar
2. Upload `app/icon.svg`
3. Generate and download the PNG icons
4. Save as `icon-192.png` and `icon-512.png` in the `public/` folder

### Option 3: Use Node.js Script (Requires sharp)

```bash
npm install sharp
node scripts/generate-icons.js
```

## 🚀 Testing the PWA

1. Build the app:
   ```bash
   npm run build
   npm run start
   ```

2. Open `http://localhost:3000` in Chrome

3. Open DevTools → Application tab:
   - Check "Manifest" section - should show AutoLevel details
   - Check "Service Workers" - should show registered worker
   - Check "Storage" - verify caching

4. Test "Add to Home Screen":
   - Click the install prompt or use Chrome menu
   - "Add to Home Screen" or "Install"
   - App should open in standalone mode

5. Test offline:
   - Disable network in DevTools (Network tab → Offline)
   - Refresh the page
   - App should still work (all data is in local state)

## 📦 Deployment

Deploy to Vercel, Netlify, or any static hosting:

1. Push to GitHub
2. Connect to Vercel/Netlify
3. Deploy
4. Users can install the PWA from the deployed URL

## ✨ Features

- ✅ Works offline (no API calls, all state is local)
- ✅ Installable on mobile devices
- ✅ Standalone app experience (no browser UI)
- ✅ Mobile-optimized UI with touch-friendly controls
- ✅ Automatic caching of assets via service worker

