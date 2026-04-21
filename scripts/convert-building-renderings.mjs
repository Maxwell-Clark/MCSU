import { readdir, mkdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SRC = 'assets/building_rendering';
const DST = 'public/images/building';
const MAX_WIDTH = 2560;
const QUALITY = 82;

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/^\d+[_\s-]*/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

await mkdir(DST, { recursive: true });

const entries = (await readdir(SRC)).filter((f) => /\.tiff?$/i.test(f));
if (entries.length === 0) {
  console.error(`No TIFFs found in ${SRC}`);
  process.exit(1);
}

for (const file of entries) {
  const { name } = parse(file);
  const outName = `${slugify(name)}.webp`;
  const outPath = join(DST, outName);

  const pipeline = sharp(join(SRC, file)).rotate();
  const meta = await pipeline.metadata();
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline.resize({ width: MAX_WIDTH });
  }

  await pipeline.webp({ quality: QUALITY }).toFile(outPath);
  console.log(`✓ ${file} → ${outPath}`);
}
