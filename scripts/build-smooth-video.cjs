const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ffmpegPath = 'C:\\Users\\91636\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.1-full_build\\bin\\ffmpeg.exe';
const brainDir = 'C:\\Users\\91636\\.gemini\\antigravity-ide\\brain\\57658d60-98a6-44a8-a6f6-c77c4ec3b95a';
const publicAssetsDir = path.resolve(__dirname, '../public/assets');
const srcAssetsHeroDir = path.resolve(__dirname, '../src/assets/hero');

const img1 = path.join(brainDir, 'hero_shot_01_1788525325288.jpg');
const img2 = path.join(brainDir, 'hero_shot_04_1788525458856.jpg');
const img3 = path.join(brainDir, 'hero_shot_02_1788525348588.jpg');
const img4 = path.resolve(__dirname, '../src/assets/nexovate-hero-cinematic.jpg');

console.log('Testing smooth frame rendering without zoompan snapping...');

// Let's create static 1920x1080 60fps clips with slow dissolve/xfade transitions.
// When the cuts dissolve slowly (2.0s crossfade), the transition itself provides gorgeous cinematic motion without 1px crop jitter!
const c1 = path.join(publicAssetsDir, 's_c1.mp4');
const c2 = path.join(publicAssetsDir, 's_c2.mp4');
const c3 = path.join(publicAssetsDir, 's_c3.mp4');
const c4 = path.join(publicAssetsDir, 's_c4.mp4');
const c1_tail = path.join(publicAssetsDir, 's_c1_tail.mp4');

// Each slide is 4.0s long, 60 fps, perfectly rock-solid crisp 1080p
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img1}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p" -t 4.0 -r 60 -c:v libx264 -preset slow -crf 18 "${c1}"`, { stdio: 'inherit' });
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img2}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p" -t 4.0 -r 60 -c:v libx264 -preset slow -crf 18 "${c2}"`, { stdio: 'inherit' });
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img3}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p" -t 4.0 -r 60 -c:v libx264 -preset slow -crf 18 "${c3}"`, { stdio: 'inherit' });
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img4}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p" -t 4.0 -r 60 -c:v libx264 -preset slow -crf 18 "${c4}"`, { stdio: 'inherit' });
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img1}" -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,format=yuv420p" -t 3.0 -r 60 -c:v libx264 -preset slow -crf 18 "${c1_tail}"`, { stdio: 'inherit' });

// Crossfade offsets:
// c1: 0..4.0 -> xfade with c2 at 2.5 (duration 1.5) -> output 0..5.5
// xfade with c3 at 4.0 (duration 1.5) -> output 0..7.0
// xfade with c4 at 5.5 (duration 1.5) -> output 0..8.5
// xfade with c1_tail at 7.0 (duration 1.5) -> output 0..10.0
const finalPublic = path.join(publicAssetsDir, 'nexovate-hero-loop.mp4');
const finalSrc = path.join(srcAssetsHeroDir, 'nexovate-hero-loop.mp4');

const filterComplex = `
[0:v][1:v]xfade=transition=fade:duration=1.5:offset=2.5[v1];
[v1][2:v]xfade=transition=fade:duration=1.5:offset=4.5[v2];
[v2][3:v]xfade=transition=fade:duration=1.5:offset=6.5[v3];
[v3][4:v]xfade=transition=fade:duration=1.5:offset=8.5[v4];
[v4]eq=contrast=1.03:brightness=-0.02:saturation=0.96[out]
`.trim().replace(/\n/g, '');

execSync(`"${ffmpegPath}" -y -i "${c1}" -i "${c2}" -i "${c3}" -i "${c4}" -i "${c1_tail}" -filter_complex "${filterComplex}" -map "[out]" -t 10.0 -r 60 -c:v libx264 -profile:v high -level 4.2 -pix_fmt yuv420p -movflags +faststart -b:v 4000k "${finalPublic}"`, { stdio: 'inherit' });

fs.copyFileSync(finalPublic, finalSrc);

[c1, c2, c3, c4, c1_tail].forEach(f => {
  if (fs.existsSync(f)) fs.unlinkSync(f);
});

console.log('SUCCESS! Rock-solid silky smooth 60fps video generated at:', finalPublic);
