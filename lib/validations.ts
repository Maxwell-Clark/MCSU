import { z } from 'zod';
import { TIER_SLUGS } from '@/lib/membership-tiers';

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
  name: z.string().min(1).max(200).optional(),
  phone: z.string().optional(),
  role: z.enum(['admin', 'member']).optional(),
  membershipTier: z
    .enum(TIER_SLUGS as [string, ...string[]])
    .nullable()
    .optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
