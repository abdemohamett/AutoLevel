# Offline PWA Testing Guide

## ⚠️ Important: PWA Only Works in Production Build

The PWA service worker is **disabled in development mode** (`npm run dev`). You **must build and run in production** for offline to work.

## 📱 Steps to Test Offline on Mobile

### 1. Build the App for Production

```bash
npm run build
npm run start
```

This will:
- Generate the service worker
- Precache all assets
- Enable offline functionality

### 2. Access from Your Phone

**Option A: Same Network (Local Testing)**
1. Find your computer's IP address:
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` or `ip addr`
2. On your phone, open: `http://YOUR_IP:3000`
   - Example: `http://192.168.1.100:3000`

**Option B: Deploy to Production**
1. Deploy to Vercel/Netlify
2. Access from your phone via the deployed URL
3. **Important**: PWAs require HTTPS in production (Vercel/Netlify provide this automatically)

### 3. Install the PWA on Your Phone

**Android (Chrome):**
1. Open the app in Chrome
2. Tap the menu (3 dots) → "Add to Home screen" or "Install app"
3. Confirm installation

**iPhone (Safari):**
1. Open the app in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Confirm

### 4. Test Offline Mode

1. **After installing**, open the app from the home screen
2. Let it load completely (this caches everything)
3. **Turn off WiFi and mobile data** on your phone
4. Close and reopen the app
5. The app should work completely offline!

## 🔍 Troubleshooting

### Service Worker Not Registering

1. **Check if you're in production mode:**
   ```bash
   npm run build
   npm run start
   ```
   Don't use `npm run dev` - PWA is disabled there!

2. **Check service worker file exists:**
   - After building, check `public/sw.js` or `public/workbox-*.js` exists
   - Visit `http://localhost:3000/sw.js` - should see service worker code

3. **Clear browser cache:**
   - Chrome: Settings → Privacy → Clear browsing data
   - Safari: Settings → Safari → Clear History and Website Data

### App Not Working Offline

1. **Make sure you visited the app while online first:**
   - The service worker needs to cache assets on first visit
   - Visit the app, wait a few seconds, then go offline

2. **Check service worker registration:**
   - Chrome DevTools (on desktop): Application → Service Workers
   - Should show "activated and running"

3. **Verify caching:**
   - Chrome DevTools: Application → Cache Storage
   - Should see cached resources

### Mobile-Specific Issues

1. **HTTPS Required (Production):**
   - Local testing (localhost) works without HTTPS
   - Production deployment needs HTTPS
   - Vercel/Netlify provide HTTPS automatically

2. **iOS Safari Limitations:**
   - Service workers work in Safari iOS 11.3+
   - May need to add to home screen for best experience
   - Some features may be limited compared to Android

3. **Clear App Data:**
   - Uninstall and reinstall the PWA
   - This clears old cached data

## ✅ Verification Checklist

- [ ] Built with `npm run build`
- [ ] Running with `npm run start` (not `npm run dev`)
- [ ] Service worker file exists in `public/` folder
- [ ] Visited app while online (to cache assets)
- [ ] Installed as PWA on phone
- [ ] Tested offline mode (WiFi + data off)
- [ ] App loads and works offline

## 🚀 Quick Test Commands

```bash
# Build and start production server
npm run build && npm run start

# Check if service worker exists
ls public/sw.js public/workbox-*.js

# Test locally (desktop)
# Open http://localhost:3000
# Chrome DevTools → Application → Service Workers → Check "Offline"
# Refresh page - should still work
```

## 📝 Notes

- **Development mode (`npm run dev`)**: PWA disabled, service worker not active
- **Production mode (`npm run start`)**: PWA enabled, service worker active
- **First visit**: App must be visited online to cache assets
- **Subsequent visits**: Works offline after initial caching

