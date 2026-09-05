import fs from 'fs';
import path from 'path';

const assetsDir = path.resolve('assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Generate SVG files that can serve as local assets
const svgs = {
  'sky.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4a95c9"/><stop offset="60%" stop-color="#79b7dd"/><stop offset="100%" stop-color="#a4d2ed"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`,
  'bridge.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600" width="1200" height="600"><path d="M100,550 Q600,100 1100,550 L1100,600 L100,600 Z" fill="#d9ccb8" opacity="0.95"/><path d="M250,550 Q600,220 950,550 Z" fill="#1b4d3e" opacity="0.9"/></svg>`,
  'bazaar.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 600" width="1920" height="600"><rect y="200" width="100%" height="400" fill="#7a624d" opacity="0.85"/></svg>`,
  'icon1.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68" width="68" height="68"><rect width="68" height="68" rx="14" fill="#000"/><path d="M20,48 Q34,20 48,48" stroke="#fdf1e1" stroke-width="4" fill="none"/></svg>`,
  'icon2.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68" width="68" height="68"><rect width="68" height="68" rx="14" fill="#000"/><circle cx="34" cy="34" r="16" stroke="#fdf1e1" stroke-width="4" fill="none"/></svg>`,
  'icon3.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 68" width="68" height="68"><rect width="68" height="68" rx="14" fill="#000"/><polygon points="34,18 48,46 20,46" stroke="#fdf1e1" stroke-width="4" fill="none"/></svg>`
};

for (const [name, content] of Object.entries(svgs)) {
  fs.writeFileSync(path.join(assetsDir, name), content.trim());
}

console.log('Asset templates created in assets/ directory.');
