import { z } from 'zod';
import { CONTENT_KIND_CONFIG, CONTENT_KINDS, type ContentField } from '@/lib/content-kinds';
import { TIER_SLUGS } from '@/lib/membership-tiers';
import { parseYouTubeId } from '@/lib/youtube';

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(/^[\d\s()+-]{7,20}$/, 'Please enter a valid phone number');

export const emailSchema = z.string().email('Please enter a valid email address');

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1, 'Name is required').max(200),
  phone: phoneSchema,
  tier: z.enum(TIER_SLUGS as [string, ...string[]], {
    message: 'Invalid membership tier',
  }),
});

export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1, 'Name is required').max(200),
  phone: z.string().optional(),
  role: z.enum(['admin', 'member']),
  membershipTier: z
    .enum(TIER_SLUGS as [string, ...string[]])
    .optional(),
});

export const updateUserSchema = z.object({
  password: passwordSchema.optional(),
  name: z.string().min(1).max(200).optional(),
  phone: z.string().optional(),
  role: z.enum(['admin', 'member']).optional(),
  membershipTier: z
    .enum(TIER_SLUGS as [string, ...string[]])
    .nullable()
    .optional(),
});

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullish()
    .transform((value) => value || null);

function isWebUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
}

/** Fields of a content item; `youtube` is the pasted link, stored as `youtubeId`. */
const CONTENT_FIELDS = ['creator', 'category', 'duration', 'youtube', 'url', 'image', 'body'] as const;

export const contentItemSchema = z
  .object({
    kind: z.enum(CONTENT_KINDS),
    title: z.string().trim().min(1, 'Title is required').max(300),
    creator: optionalText(200),
    category: optionalText(100),
    duration: optionalText(50),
    youtube: optionalText(500),
    url: optionalText(2000),
    image: optionalText(2000),
    body: z
      .string()
      .max(20000)
      .nullish()
      // Keep blank lines inside a poem; only trim the ends
      .transform((value) => value?.replace(/\r\n/g, '\n').trim() || null),
    sortOrder: z.number().int().min(0).max(1_000_000).default(0),
    active: z.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    const { fields } = CONTENT_KIND_CONFIG[data.kind];
    for (const [field, spec] of Object.entries(fields) as [ContentField, { label: string; required?: boolean }][]) {
      if (spec.required && !data[field]) {
        ctx.addIssue({ code: 'custom', path: [field], message: `${spec.label} is required` });
      }
    }
    if (fields.youtube && data.youtube && !parseYouTubeId(data.youtube)) {
      ctx.addIssue({ code: 'custom', path: ['youtube'], message: 'That is not a valid YouTube link' });
    }
    if (fields.url && data.url && !isWebUrl(data.url)) {
      ctx.addIssue({ code: 'custom', path: ['url'], message: 'Links must start with http:// or https://' });
    }
    if (fields.image && data.image && !data.image.startsWith('/') && !isWebUrl(data.image)) {
      ctx.addIssue({ code: 'custom', path: ['image'], message: 'Image must be an uploaded image or a web address' });
    }
  })
  .transform(({ youtube, ...data }) => {
    const { fields } = CONTENT_KIND_CONFIG[data.kind];
    const values = { ...data, youtube };
    // Drop anything this kind doesn't use, so stale values never reach the database
    const kept = Object.fromEntries(
      CONTENT_FIELDS.map((field) => [field, fields[field] ? values[field] : null])
    ) as Record<(typeof CONTENT_FIELDS)[number], string | null>;
    return {
      kind: data.kind,
      title: data.title,
      creator: kept.creator,
      category: kept.category,
      duration: kept.duration,
      youtubeId: kept.youtube ? parseYouTubeId(kept.youtube) : null,
      url: kept.url,
      image: kept.image,
      body: kept.body,
      sortOrder: data.sortOrder,
      active: data.active,
    };
  });

export type ContentItemInput = z.input<typeof contentItemSchema>;

export type SignupInput = z.infer<typeof signupSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
