/* eslint-disable @typescript-eslint/no-require-imports */
// Script to generate PWA icons
// Run with: node scripts/generate-icons.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const publicDir = path.join(__dirname, '../public');
  
  // Create SVG buffer with the "A" logo
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
      <rect width="100" height="100" rx="16" fill="#1a1a1a"/>
      <text x="50" y="72" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="700" text-anchor="middle" fill="#ffffff">A</text>
    </svg>
  `;
  
  const sizes = [192, 512];
  
  for (const size of sizes) {
    const outputPath = path.join(publicDir, `icon-${size}.png`);
    
    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(outputPath);
    
    console.log(`✅ Generated ${outputPath}`);
  }
  
  console.log('\n✨ Icons generated successfully!');
}

generateIcons().catch((error) => {
  console.error('❌ Error generating icons:', error);
  process.exit(1);
});
