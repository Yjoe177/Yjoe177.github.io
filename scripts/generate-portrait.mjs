/**
 * Generates the web-optimized portrait from the original Youssef.jpg.
 *
 * The crop was selected with face detection (OpenCV YuNet):
 *   face box in the 1706x1280 source: x=773, y=429, w=185, h=251
 *   portrait crop: x=524, y=213, w=682, h=853 (4:5)
 *   output: 800x1000, face centered with 26% headroom and 37% side margins
 *
 * The original remains untouched at the project root. Run with:
 *   npm run portrait:generate
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'Youssef.jpg');
const output = join(root, 'public', 'images', 'youssef-amr.jpg');

await sharp(source)
  .rotate()
  .extract({ left: 524, top: 213, width: 682, height: 853 })
  .resize(800, 1000, { fit: 'cover' })
  .jpeg({ quality: 84, mozjpeg: true, progressive: true })
  .toFile(output);

console.log(`Web portrait written to ${output}`);
