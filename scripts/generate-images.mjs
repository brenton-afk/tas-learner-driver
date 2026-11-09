// Generates the app icons and the 1200x630 link preview image into public/.
// Run with: node scripts/generate-images.mjs  (only needed if you change the artwork)
import sharp from 'sharp';

const BG = '#1F2328';
const YELLOW = '#F5C518';
const out = (f) => new URL(`../public/${f}`, import.meta.url).pathname;

// The yellow L plate, drawn as shapes (no fonts needed). Coordinates are in a 100x100 box.
const plate = (x, y, size, radius = 12) => `
  <g transform="translate(${x} ${y}) scale(${size / 100})">
    <rect width="100" height="100" rx="${radius}" fill="${YELLOW}"/>
    <path d="M33 20 h15 v44 h22 v15 h-37 z" fill="#111"/>
  </g>`;

const svg = (w, h, body) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`,
  );

async function png(file, w, h, body) {
  await sharp(svg(w, h, body))
    .png({ compressionLevel: 9 })
    .toFile(out(file));
  console.log('wrote', file);
}

// Standard icons: plate on a dark rounded tile.
for (const size of [192, 512]) {
  await png(
    `pwa-${size}x${size}.png`,
    size,
    size,
    `<rect width="${size}" height="${size}" rx="${size * 0.18}" fill="${BG}"/>${plate(size * 0.14, size * 0.14, size * 0.72)}`,
  );
}
// Maskable: full-bleed background, plate inside the 80% safe zone.
await png(
  'maskable-512x512.png',
  512,
  512,
  `<rect width="512" height="512" fill="${BG}"/>${plate(128, 128, 256)}`,
);
// Apple touch icon: iOS rounds corners itself, so no transparency.
await png(
  'apple-touch-icon.png',
  180,
  180,
  `<rect width="180" height="180" fill="${BG}"/>${plate(27, 27, 126)}`,
);
// Favicon SVG.
await import('node:fs').then((fs) =>
  fs.writeFileSync(
    out('favicon.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${plate(0, 0, 100, 14)}</svg>\n`,
  ),
);
console.log('wrote favicon.svg');

// Link preview image (Open Graph / Twitter), 1200x630.
const font = 'font-family="Helvetica Neue, Helvetica, Arial, sans-serif"';
const stop = `<svg x="0" y="0" width="150" height="150" viewBox="0 0 120 120"><polygon points="37,8 83,8 112,37 112,83 83,112 37,112 8,83 8,37" fill="#C8102E" stroke="#fff" stroke-width="5"/><text x="60" y="72" text-anchor="middle" ${font} font-weight="700" font-size="30" fill="#fff">STOP</text></svg>`;
const giveway = `<svg x="170" y="0" width="150" height="150" viewBox="0 0 120 120"><polygon points="8,14 112,14 60,110" fill="#fff" stroke="#C8102E" stroke-width="9"/><text x="60" y="47" text-anchor="middle" ${font} font-weight="700" font-size="17" fill="#141414">GIVE</text><text x="60" y="68" text-anchor="middle" ${font} font-weight="700" font-size="17" fill="#141414">WAY</text></svg>`;
const school = `<svg x="340" y="0" width="150" height="150" viewBox="0 0 120 120"><rect x="10" y="6" width="100" height="108" rx="6" fill="#F5C518" stroke="#141414" stroke-width="4"/><circle cx="60" cy="52" r="33" fill="#fff" stroke="#C8102E" stroke-width="9"/><text x="60" y="66" text-anchor="middle" ${font} font-weight="700" font-size="34" fill="#141414">40</text><text x="60" y="103" text-anchor="middle" ${font} font-weight="700" font-size="12" fill="#141414">SCHOOL ZONE</text></svg>`;
await png(
  'og-image.png',
  1200,
  630,
  `
  <rect width="1200" height="630" fill="${BG}"/>
  ${plate(80, 80, 120, 14)}
  <text x="230" y="140" ${font} font-weight="800" font-size="64" letter-spacing="1" fill="#F1EEE7">TASMANIAN ROAD RULES</text>
  <text x="230" y="192" ${font} font-weight="500" font-size="34" fill="#A3ADB7">Learner licence practice — free, works offline</text>
  <text x="80" y="300" ${font} font-weight="700" font-size="40" fill="#F5C518">80 questions · Mock test · Cheat sheet</text>
  <g transform="translate(80 350)">${stop}${giveway}${school}</g>
  <rect x="0" y="560" width="1200" height="70" fill="#171A1E"/>
  <g fill="${YELLOW}">${Array.from({ length: 22 }, (_, i) => `<rect x="${i * 56}" y="589" width="32" height="12" rx="2"/>`).join('')}</g>
`,
);
