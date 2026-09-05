const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ffmpegPath = 'C:\\Users\\91636\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-9.0.1-full_build\\bin\\ffmpeg.exe';

const brainDir = 'C:\\Users\\91636\\.gemini\\antigravity-ide\\brain\\57658d60-98a6-44a8-a6f6-c77c4ec3b95a';
const publicAssetsDir = path.resolve(__dirname, '../public/assets');
const srcAssetsHeroDir = path.resolve(__dirname, '../src/assets/hero');

if (!fs.existsSync(publicAssetsDir)) fs.mkdirSync(publicAssetsDir, { recursive: true });
if (!fs.existsSync(srcAssetsHeroDir)) fs.mkdirSync(srcAssetsHeroDir, { recursive: true });

const img1 = path.join(brainDir, 'hero_shot_01_1788525325288.jpg');
const img2 = path.join(brainDir, 'hero_shot_04_1788525458856.jpg');
const img3 = path.join(brainDir, 'hero_shot_02_1788525348588.jpg');
const img4 = path.resolve(__dirname, '../src/assets/nexovate-hero-cinematic.jpg');

console.log('1. Rendering 4 smooth 30fps clips...');

const clip1 = path.join(publicAssetsDir, 'temp_c1.mp4');
const clip2 = path.join(publicAssetsDir, 'temp_c2.mp4');
const clip3 = path.join(publicAssetsDir, 'temp_c3.mp4');
const clip4 = path.join(publicAssetsDir, 'temp_c4.mp4');
const clip1_tail = path.join(publicAssetsDir, 'temp_c1_tail.mp4');

// Clip 1: 3.6s push-in
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img1}" -vf "zoompan=z='min(zoom+0.0005,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=108:s=1920x1080:fps=30" -t 3.6 -c:v libx264 -pix_fmt yuv420p "${clip1}"`, { stdio: 'inherit' });

// Clip 2: 3.6s lateral micro-drift
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img2}" -vf "zoompan=z='min(zoom+0.0004,1.05)':x='(iw/2-(iw/zoom/2))+on*0.3':y='ih/2-(ih/zoom/2)':d=108:s=1920x1080:fps=30" -t 3.6 -c:v libx264 -pix_fmt yuv420p "${clip2}"`, { stdio: 'inherit' });

// Clip 3: 3.6s gentle pull
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img3}" -vf "zoompan=z='if(lte(zoom,1.0),1.06,max(1.0,zoom-0.0005))':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=108:s=1920x1080:fps=30" -t 3.6 -c:v libx264 -pix_fmt yuv420p "${clip3}"`, { stdio: 'inherit' });

// Clip 4: 3.6s push-in
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img4}" -vf "zoompan=z='min(zoom+0.0005,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=108:s=1920x1080:fps=30" -t 3.6 -c:v libx264 -pix_fmt yuv420p "${clip4}"`, { stdio: 'inherit' });

// Clip 1 tail to crossfade back into Clip 1 seamlessly
execSync(`"${ffmpegPath}" -y -loop 1 -i "${img1}" -vf "zoompan=z='min(zoom+0.0005,1.06)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=60:s=1920x1080:fps=30" -t 2.0 -c:v libx264 -pix_fmt yuv420p "${clip1_tail}"`, { stdio: 'inherit' });

console.log('2. Combining with seamless transitions...');

// We have 5 clips: c1 (0..3.6), c2 (crossfade at 2.8), c3 (crossfade at 5.6), c4 (crossfade at 8.4), c1_tail (crossfade at 11.2)
// Total duration = 12.0s
const combined = path.join(publicAssetsDir, 'temp_combined.mp4');
const filterComplex = `
[0:v][1:v]xfade=transition=fade:duration=0.8:offset=2.8[v1];
[v1][2:v]xfade=transition=fade:duration=0.8:offset=5.6[v2];
[v2][3:v]xfade=transition=fade:duration=0.8:offset=8.4[v3];
[v3][4:v]xfade=transition=fade:duration=0.8:offset=11.2[v4]
`.trim().replace(/\n/g, '');

execSync(`"${ffmpegPath}" -y -i "${clip1}" -i "${clip2}" -i "${clip3}" -i "${clip4}" -i "${clip1_tail}" -filter_complex "${filterComplex}" -map "[v4]" -c:v libx264 -pix_fmt yuv420p "${combined}"`, { stdio: 'inherit' });

console.log('3. Creating perfect 10.0s seamless loop and color grading...');

// Cut 0.0 to 10.0s as segment A (10s)
// The section 10.0 to 12.0s is segment B (2.0s, which is identical to the beginning of c1)
// We take segment B and crossfade it onto the first 2.0s of segment A!
const finalPublic = path.join(publicAssetsDir, 'nexovate-hero-loop.mp4');
const finalSrc = path.join(srcAssetsHeroDir, 'nexovate-hero-loop.mp4');

const loopScript = `
[0:v]trim=start=2.0:end=12.0,setpts=PTS-STARTPTS[main];
[0:v]trim=start=0.0:end=2.0,setpts=PTS-STARTPTS[intro];
[main][intro]xfade=transition=fade:duration=1.2:offset=8.8[looped];
[looped]eq=contrast=1.04:brightness=-0.02:saturation=0.96[graded]
`.trim().replace(/\n/g, '');

execSync(`"${ffmpegPath}" -y -i "${combined}" -filter_complex "${loopScript}" -map "[graded]" -t 10.0 -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -movflags +faststart -b:v 2800k "${finalPublic}"`, { stdio: 'inherit' });

// Copy to src/assets/hero
fs.copyFileSync(finalPublic, finalSrc);

// Clean temp
[clip1, clip2, clip3, clip4, clip1_tail, combined].forEach(f => {
  if (fs.existsSync(f)) fs.unlinkSync(f);
});

console.log('SUCCESS! Video created at:', finalPublic);
