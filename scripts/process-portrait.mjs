import sharp from "sharp";

const src = "public/portrait-source.png";
const out = "public/portrait.png";

const input = sharp(src).ensureAlpha();
const { data, info } = await input.raw().toBuffer({ resolveWithObject: true });
const channels = info.channels;

// Make near-white pixels transparent. Use brightness + low-saturation check
// so we catch slightly-off-white backgrounds (cream, F8F5F0-ish anti-aliasing)
// without eating into the orange ring or skin tones.
for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  const brightness = (r + g + b) / 3;

  if (brightness > 215 && sat < 25) {
    // Fully transparent for clearly-background pixels
    data[i + 3] = 0;
  } else if (brightness > 195 && sat < 30) {
    // Feather the edge to avoid harsh cutout
    data[i + 3] = Math.floor((255 - brightness) * 4);
  }
}

await sharp(data, { raw: { width: info.width, height: info.height, channels } })
  .png()
  .toFile(out);

console.log(`wrote ${out} (${info.width}x${info.height})`);
