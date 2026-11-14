import { z } from 'zod';
import { CONTENT_KIND_CONFIG, CONTENT_KINDS, type ContentField } from '@/lib/content-kinds';
import { TIER_SLUGS } from '@/lib/membership-tiers';
import { US_STATE_CODES } from '@/lib/us-states';
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

/** US mailing address. Field names match the User columns. */
export const addressSchema = z.object({
  addressLine1: z.string().trim().min(1, 'Street address is required').max(200),
  addressLine2: z
    .string()
    .trim()
    .max(200)
    .nullish()
    .transform((value) => value || null),
  city: z.string().trim().min(1, 'City is required').max(100),
  state: z.enum(US_STATE_CODES as [string, ...string[]], { message: 'Please choose a state' }),
  postalCode: z
    .string()
    .trim()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
});

export type AddressInput = z.infer<typeof addressSchema>;

const EMPTY_ADDRESS = {
  addressLine1: null,
  addressLine2: null,
  city: null,
  state: null,
  postalCode: null,
} as const;

/**
 * For profile/admin edits: an address may be left entirely blank (members who joined before
 * addresses were collected), but if any part is filled in it must be complete.
 * Omitted (undefined) stays undefined, meaning "leave the stored address unchanged".
 */
export const optionalAddressSchema = z
  .object({
    addressLine1: z.string().nullish(),
    addressLine2: z.string().nullish(),
    city: z.string().nullish(),
    state: z.string().nullish(),
    postalCode: z.string().nullish(),
  })
  .optional()
  .transform((value, ctx) => {
    if (value === undefined) {
      return undefined;
    }
    const filled = Object.values(value).some((part) => part?.trim());
    if (!filled) {
      return { ...EMPTY_ADDRESS };
    }
    // Blank parts become '' so the required-field messages apply
    const result = addressSchema.safeParse({
      addressLine1: value.addressLine1 ?? '',
      addressLine2: value.addressLine2,
      city: value.city ?? '',
      state: value.state ?? '',
      postalCode: value.postalCode ?? '',
    });
    if (!result.success) {
      for (const issue of result.error.issues) {
        ctx.addIssue({ code: 'custom', message: issue.message, path: issue.path });
      }
      return z.NEVER;
    }
    return result.data;
  });

/** What forms send for an optional address (blank strings allowed). */
export type AddressPayload = z.input<typeof optionalAddressSchema>;

export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1, 'Name is required').max(200),
  phone: phoneSchema,
  address: addressSchema,
  tier: z.enum(TIER_SLUGS as [string, ...string[]], {
    message: 'Invalid membership tier',
  }),
});

export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1, 'Name is required').max(200),
  phone: z.string().optional(),
  address: optionalAddressSchema,
  role: z.enum(['admin', 'member']),
  membershipTier: z
    .enum(TIER_SLUGS as [string, ...string[]])
    .optional(),
});

export const updateUserSchema = z.object({
  password: passwordSchema.optional(),
  name: z.string().min(1).max(200).optional(),
  phone: z.string().optional(),
  /** Omitted = leave the stored address unchanged */
  address: optionalAddressSchema,
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
