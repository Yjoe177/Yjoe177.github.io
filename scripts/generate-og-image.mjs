/**
 * Rasterizes the social sharing card from SVG to PNG.
 * Run after editing public/images/og-default.svg:
 *   npm run og:generate
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'public', 'images', 'og-default.svg');
const output = join(root, 'public', 'images', 'og-default.png');

await sharp(source).resize(1200, 630).png({ compressionLevel: 9 }).toFile(output);
console.log(`Social card written to ${output}`);
