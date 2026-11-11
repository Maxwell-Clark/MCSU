-- Admin-managed videos, music and Resources content. Applied with `prisma db execute` (shared DB — never `prisma db push`).
CREATE TABLE IF NOT EXISTS "ContentItem" (
    "id" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "creator" TEXT,
    "category" TEXT,
    "duration" TEXT,
    "youtubeId" TEXT,
    "url" TEXT,
    "image" TEXT,
    "body" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContentItem_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "ContentItem_kind_active_sortOrder_idx" ON "ContentItem"("kind", "active", "sortOrder");
