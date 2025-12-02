# Deploy AutoLevel PWA

## 🚀 Quick Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js apps and automatically provides HTTPS (required for PWA).

### Steps:

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your AutoLevel repository
   - Click "Deploy" (Vercel will auto-detect Next.js settings)

3. **Wait for deployment** (2-3 minutes)

4. **Test on your phone**:
   - Open the deployed URL on your phone
   - Install as PWA
   - Test offline mode

## 📱 Alternative: Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Import your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Deploy

## 🧪 Local Testing First (Optional)

If you want to test locally before deploying:

1. **Fix the build issue** (Next.js 16 + PWA plugin conflict):
   - The build might fail locally due to Turbopack conflicts
   - Vercel/Netlify use different build environments and usually work fine

2. **If build succeeds locally**:
   ```bash
   npm run build
   npm run start
   ```
   - Then access from phone via your computer's IP address

## ✅ After Deployment

1. **Visit the deployed URL on your phone**
2. **Install as PWA**:
   - Android: Chrome menu → "Add to Home screen"
   - iPhone: Safari Share → "Add to Home Screen"
3. **Test offline**:
   - Open the installed app
   - Turn off WiFi/data
   - App should work offline!

## 🔧 Troubleshooting

- **Build fails on Vercel**: Check build logs, usually PWA plugin works fine on Vercel
- **PWA not installing**: Make sure you're using HTTPS (Vercel provides this automatically)
- **Offline not working**: Visit the app online first to cache assets, then test offline

