import { signupSchema, passwordSchema, phoneSchema, emailSchema, createUserSchema } from '../validations';

describe('passwordSchema', () => {
  it('rejects passwords shorter than 8 characters', () => {
    const result = passwordSchema.safeParse('Ab1');
    expect(result.success).toBe(false);
  });

  it('rejects passwords without uppercase', () => {
    const result = passwordSchema.safeParse('abcdefg1');
    expect(result.success).toBe(false);
  });

  it('rejects passwords without lowercase', () => {
    const result = passwordSchema.safeParse('ABCDEFG1');
    expect(result.success).toBe(false);
  });

  it('rejects passwords without numbers', () => {
    const result = passwordSchema.safeParse('Abcdefgh');
    expect(result.success).toBe(false);
  });

  it('accepts valid passwords', () => {
    const result = passwordSchema.safeParse('Abcdefg1');
    expect(result.success).toBe(true);
  });
});

describe('phoneSchema', () => {
  it('rejects empty strings', () => {
    const result = phoneSchema.safeParse('');
    expect(result.success).toBe(false);
  });

  it('rejects non-phone strings', () => {
    const result = phoneSchema.safeParse('not a phone');
    expect(result.success).toBe(false);
  });

  it('accepts valid phone formats', () => {
    expect(phoneSchema.safeParse('(555) 123-4567').success).toBe(true);
    expect(phoneSchema.safeParse('555-123-4567').success).toBe(true);
    expect(phoneSchema.safeParse('+1 555 123 4567').success).toBe(true);
  });
});

describe('emailSchema', () => {
  it('rejects invalid emails', () => {
    expect(emailSchema.safeParse('notanemail').success).toBe(false);
    expect(emailSchema.safeParse('').success).toBe(false);
  });

  it('accepts valid emails', () => {
    expect(emailSchema.safeParse('user@example.com').success).toBe(true);
  });
});

describe('signupSchema', () => {
  const validData = {
    email: 'test@example.com',
    password: 'Password1',
    name: 'Test User',
    phone: '(555) 123-4567',
    tier: 'curious',
  };

  it('accepts valid signup data', () => {
    expect(signupSchema.safeParse(validData).success).toBe(true);
  });

  it('rejects invalid tier', () => {
    const result = signupSchema.safeParse({ ...validData, tier: 'invalid' });
    expect(result.success).toBe(false);
  });

  it('rejects missing name', () => {
    const result = signupSchema.safeParse({ ...validData, name: '' });
    expect(result.success).toBe(false);
  });

  it('rejects weak password', () => {
    const result = signupSchema.safeParse({ ...validData, password: '123' });
    expect(result.success).toBe(false);
  });

  it('accepts all valid tier slugs', () => {
    expect(signupSchema.safeParse({ ...validData, tier: 'curious' }).success).toBe(true);
    expect(signupSchema.safeParse({ ...validData, tier: 'kindness' }).success).toBe(true);
    expect(signupSchema.safeParse({ ...validData, tier: 'gratitude' }).success).toBe(true);
  });
});

describe('createUserSchema', () => {
  it('accepts valid admin user data', () => {
    const result = createUserSchema.safeParse({
      email: 'admin@example.com',
      password: 'Password1',
      name: 'Admin User',
      role: 'admin',
    });
    expect(result.success).toBe(true);
  });

  it('rejects invalid role', () => {
    const result = createUserSchema.safeParse({
      email: 'user@example.com',
      password: 'Password1',
      name: 'User',
      role: 'superadmin',
    });
    expect(result.success).toBe(false);
  });
});
