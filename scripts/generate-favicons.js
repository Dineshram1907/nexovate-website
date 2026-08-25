const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SOURCE_IMAGE = 'C:\\Users\\91636\\.gemini\\antigravity-ide\\brain\\6e6ec125-9141-4e34-9d86-b6fadb0c8ce6\\.user_uploaded\\media_1787697309921.png';

const OUTPUT_DIR_PUBLIC = path.join(__dirname, '..', 'public');
const OUTPUT_DIR_APP = path.join(__dirname, '..', 'src', 'app');

// Simple ICO generator for PNG-based ICO format
function createIco(pngBuffers) {
  const numImages = pngBuffers.length;
  const headerSize = 6;
  const directorySize = 16 * numImages;
  
  let offset = headerSize + directorySize;
  const header = Buffer.alloc(headerSize);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // Type: 1 = ICO
  header.writeUInt16LE(numImages, 4); // Number of images
  
  const directories = [];
  const imageBuffers = [];

  for (const { size, buffer } of pngBuffers) {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(size >= 256 ? 0 : size, 0); // Width
    dir.writeUInt8(size >= 256 ? 0 : size, 1); // Height
    dir.writeUInt8(0, 2); // Color palette
    dir.writeUInt8(0, 3); // Reserved
    dir.writeUInt16LE(1, 4); // Color planes
    dir.writeUInt16LE(32, 6); // Bits per pixel
    dir.writeUInt32LE(buffer.length, 8); // Size of image data
    dir.writeUInt32LE(offset, 12); // Offset to image data

    directories.push(dir);
    imageBuffers.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...directories, ...imageBuffers]);
}

async function generateFavicons() {
  console.log('Reading source image:', SOURCE_IMAGE);
  
  // Trim transparent padding from official logo
  const trimmed = sharp(SOURCE_IMAGE).trim();
  const trimmedBuffer = await trimmed.toBuffer();

  const sizes = [
    { size: 16, filename: 'favicon-16x16.png' },
    { size: 32, filename: 'favicon-32x32.png' },
    { size: 48, filename: 'favicon-48x48.png' },
    { size: 180, filename: 'apple-touch-icon.png' },
    { size: 192, filename: 'android-chrome-192x192.png' },
    { size: 512, filename: 'android-chrome-512x512.png' },
  ];

  const icoPngBuffers = [];

  for (const item of sizes) {
    // Generate square image with contained fit and transparent background
    const buf = await sharp(trimmedBuffer)
      .resize(item.size, item.size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

    const publicPath = path.join(OUTPUT_DIR_PUBLIC, item.filename);
    fs.writeFileSync(publicPath, buf);
    console.log(`Generated: public/${item.filename} (${item.size}x${item.size})`);

    if (item.size === 16 || item.size === 32 || item.size === 48) {
      icoPngBuffers.push({ size: item.size, buffer: buf });
    }
  }

  // Next.js App Router icons
  // 1. src/app/icon.png (32x32 standard app icon)
  const appIconBuf = await sharp(trimmedBuffer)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(OUTPUT_DIR_APP, 'icon.png'), appIconBuf);
  console.log('Generated: src/app/icon.png');

  // 2. src/app/apple-icon.png (180x180 apple touch icon)
  const appleIconBuf = await sharp(trimmedBuffer)
    .resize(180, 180, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(OUTPUT_DIR_APP, 'apple-icon.png'), appleIconBuf);
  console.log('Generated: src/app/apple-icon.png');

  // Multi-resolution favicon.ico
  const icoBuffer = createIco(icoPngBuffers);
  fs.writeFileSync(path.join(OUTPUT_DIR_PUBLIC, 'favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(OUTPUT_DIR_APP, 'favicon.ico'), icoBuffer);
  console.log('Generated: public/favicon.ico & src/app/favicon.ico');

  // Generate web manifest
  const manifest = {
    name: "Nexovate",
    short_name: "Nexovate",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#101536",
    background_color: "#FAFBFC",
    display: "standalone"
  };
  fs.writeFileSync(path.join(OUTPUT_DIR_PUBLIC, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('Generated: public/site.webmanifest');

  console.log('All favicon assets generated successfully!');
}

generateFavicons().catch(console.error);
