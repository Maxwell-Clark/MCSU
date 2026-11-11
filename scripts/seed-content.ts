/**
 * Copies the videos, music and Resources content that used to be hardcoded into the
 * ContentItem table, so the site looks the same after the switch to the admin console.
 * Safe to re-run: any kind that already has rows is skipped.
 *
 * Run after applying prisma/sql/2026-11-10_add_content_items.sql:
 *
 *   npx tsx --env-file=.env scripts/seed-content.ts
 */
import { PrismaClient } from '@prisma/client';
import { DEFAULT_CONTENT } from '../lib/content-defaults';
import { CONTENT_KINDS } from '../lib/content-kinds';

const prisma = new PrismaClient();

async function main() {
  for (const kind of CONTENT_KINDS) {
    const existing = await prisma.contentItem.count({ where: { kind } });
    if (existing > 0) {
      console.log(`${kind}: ${existing} items already present, skipping`);
      continue;
    }

    const items = DEFAULT_CONTENT.filter((item) => item.kind === kind);
    await prisma.contentItem.createMany({
      data: items.map((item, index) => ({
        kind,
        title: item.title,
        creator: item.creator ?? null,
        category: item.category ?? null,
        duration: item.duration ?? null,
        youtubeId: item.youtubeId ?? null,
        url: item.url ?? null,
        image: item.image ?? null,
        body: item.body ?? null,
        // Gaps of 10 leave room to slot new items in between
        sortOrder: (index + 1) * 10,
      })),
    });
    console.log(`${kind}: added ${items.length} items`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
