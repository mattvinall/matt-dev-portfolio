import sharp from "sharp";

const src = "public/portrait-source.png";
const out = "public/portrait.png";

// 1. Read raw pixels
const input = sharp(src).ensureAlpha();
const { data, info } = await input.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

// 2. Detect the orange ring's bounding box (find min/max x,y of orange pixels).
// Orange is roughly r > 200, g in 90-160, b < 100.
let minX = width, minY = height, maxX = 0, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r > 200 && g > 80 && g < 170 && b < 110) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
}

// 3. Compute the ring center + outer radius
const cx = (minX + maxX) / 2;
const cy = (minY + maxY) / 2;
const radius = Math.min((maxX - minX) / 2, (maxY - minY) / 2) + 1;

console.log(`ring detected: center=(${cx.toFixed(1)}, ${cy.toFixed(1)}) radius=${radius.toFixed(1)}`);

// 4. Mask: anything outside the ring's outer edge becomes transparent.
//    Anti-alias by feathering the last ~1.5px.
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > radius + 1) {
      data[i + 3] = 0;
    } else if (dist > radius - 0.5) {
      const t = (radius + 1 - dist) / 1.5;
      data[i + 3] = Math.max(0, Math.min(data[i + 3], Math.floor(255 * t)));
    }
  }
}

// 5. Crop tightly around the ring so the canvas matches the visual circle
const pad = 4;
const left = Math.max(0, Math.floor(cx - radius - pad));
const top = Math.max(0, Math.floor(cy - radius - pad));
const cropWidth = Math.min(width - left, Math.ceil((radius + pad) * 2));
const cropHeight = Math.min(height - top, Math.ceil((radius + pad) * 2));

await sharp(data, { raw: { width, height, channels } })
  .extract({ left, top, width: cropWidth, height: cropHeight })
  .png()
  .toFile(out);

console.log(`wrote ${out} (${cropWidth}x${cropHeight})`);
