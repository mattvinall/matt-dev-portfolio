import sharp from "sharp";

const src = "public/portrait-source.png";
const out = "public/portrait.png";

const input = sharp(src).ensureAlpha();
const { data, info } = await input.raw().toBuffer({ resolveWithObject: true });
const channels = info.channels;

// Make near-white pixels transparent
for (let i = 0; i < data.length; i += channels) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  if (r > 235 && g > 235 && b > 235) {
    data[i + 3] = 0;
  }
}

await sharp(data, { raw: { width: info.width, height: info.height, channels } })
  .png()
  .toFile(out);

console.log(`wrote ${out} (${info.width}x${info.height})`);
