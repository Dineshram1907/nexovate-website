const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ffmpegPath = 'C:\\Users\\91636\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.1-full_build\\bin\\ffmpeg.exe';
const brainDir = 'C:\\Users\\91636\\.gemini\\antigravity-ide\\brain\\57658d60-98a6-44a8-a6f6-c77c4ec3b95a';
const publicAssetsDir = path.resolve(__dirname, '../public/assets');
const srcAssetsHeroDir = path.resolve(__dirname, '../src/assets/hero');
const srcAssetsDir = path.resolve(__dirname, '../src/assets');

if (!fs.existsSync(publicAssetsDir)) fs.mkdirSync(publicAssetsDir, { recursive: true });
if (!fs.existsSync(srcAssetsHeroDir)) fs.mkdirSync(srcAssetsHeroDir, { recursive: true });

const img1 = path.join(brainDir, 'editorial_study_golden_hour_1788526088828.jpg');
const img2 = path.join(brainDir, 'editorial_study_subtle_move_1788526237063.jpg');

// Copy primary frame as high-res poster fallback
const posterPath = path.join(srcAssetsDir, 'editorial-study-hero.jpg');
fs.copyFileSync(img1, posterPath);

console.log('1. Rendering 60fps clips with ultra-subtle living-photograph motion...');

const c1 = path.join(publicAssetsDir, 'life_c1.mp4');
const c2 = path.join(publicAssetsDir, 'life_c2.mp4');
const c3 = path.join(publicAssetsDir, 'life_c3.mp4');

// Clip 1: 5.0s steady photographic frame
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img1}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p" -t 5.5 -r 60 -c:v libx264 -preset slow -crf 17 "${c1}"`, { stdio: 'inherit' });

// Clip 2: 5.0s subtle breathing / micro movement
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img2}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p" -t 5.5 -r 60 -c:v libx264 -preset slow -crf 17 "${c2}"`, { stdio: 'inherit' });

// Clip 3: 5.0s return to starting position
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img1}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p" -t 5.5 -r 60 -c:v libx264 -preset slow -crf 17 "${c3}"`, { stdio: 'inherit' });

console.log('2. Assembling seamless 10.0s infinite loop...');

const finalPublic = path.join(publicAssetsDir, 'nexovate-hero-loop.mp4');
const finalSrc = path.join(srcAssetsHeroDir, 'nexovate-hero-loop.mp4');

// Crossfade c1 (0..5.5) -> c2 at 3.5s (2.0s dissolve) -> c3 at 7.0s (2.0s dissolve)
// Result is 10.0s, where 0.0s and 10.0s are both identically frame 1 with zero jump!
const filterComplex = `
[0:v][1:v]xfade=transition=fade:duration=2.0:offset=3.5[v1];
[v1][2:v]xfade=transition=fade:duration=2.0:offset=7.0[v2];
[v2]eq=contrast=1.02:brightness=0.00:saturation=1.00[out]
`.trim().replace(/\n/g, '');

execSync(`"${ffmpegPath}" -y -i "${c1}" -i "${c2}" -i "${c3}" -filter_complex "${filterComplex}" -map "[out]" -t 10.0 -r 60 -c:v libx264 -profile:v high -level 4.2 -pix_fmt yuv420p -movflags +faststart -b:v 4500k "${finalPublic}"`, { stdio: 'inherit' });

fs.copyFileSync(finalPublic, finalSrc);

[c1, c2, c3].forEach(f => {
  if (fs.existsSync(f)) fs.unlinkSync(f);
});

console.log('SUCCESS! Ultra-realistic seamless loop created at:', finalPublic);
