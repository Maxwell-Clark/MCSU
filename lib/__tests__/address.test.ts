import { csvCell, donationsToCsv } from '@/lib/donations-csv';
import { formatAddress } from '@/lib/format-address';
import { addressSchema, optionalAddressSchema, updateUserSchema } from '@/lib/validations';

const valid = {
  addressLine1: '123 Main St',
  addressLine2: '',
  city: 'St. George',
  state: 'UT',
  postalCode: '84770',
};

describe('addressSchema', () => {
  it('accepts a complete US address and blanks the optional line', () => {
    expect(addressSchema.parse(valid)).toEqual({ ...valid, addressLine2: null });
  });

  it('accepts ZIP+4', () => {
    expect(addressSchema.safeParse({ ...valid, postalCode: '84770-1234' }).success).toBe(true);
  });

  it.each([
    [{ postalCode: '8477' }, 'Please enter a valid ZIP code'],
    [{ state: 'XX' }, 'Please choose a state'],
    [{ city: '  ' }, 'City is required'],
    [{ addressLine1: '' }, 'Street address is required'],
  ])('rejects %o', (override, message) => {
    const result = addressSchema.safeParse({ ...valid, ...override });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe(message);
  });
});

describe('optionalAddressSchema', () => {
  it('treats an entirely blank address as cleared', () => {
    expect(
      optionalAddressSchema.parse({ addressLine1: '', city: ' ', state: '', postalCode: '' })
    ).toEqual({ addressLine1: null, addressLine2: null, city: null, state: null, postalCode: null });
  });

  it('leaves the address untouched when omitted', () => {
    expect(optionalAddressSchema.parse(undefined)).toBeUndefined();
    expect(updateUserSchema.parse({ name: 'Pat' })).not.toHaveProperty('address');
  });

  it('requires the rest once any part is filled in, with specific messages', () => {
    const result = optionalAddressSchema.safeParse({ addressLine1: '123 Main St' });
    expect(result.success).toBe(false);
    expect(result.error?.issues.map((i) => i.message)).toEqual([
      'City is required',
      'Please choose a state',
      'Please enter a valid ZIP code',
    ]);
  });
});

describe('formatAddress', () => {
  it('formats a US address on one line without the country', () => {
    expect(
      formatAddress({ line1: '1 Main St', line2: 'Apt 4', city: 'St. George', state: 'UT', postalCode: '84770', country: 'US' })
    ).toBe('1 Main St, Apt 4, St. George, UT 84770');
  });

  it('keeps a non-US country and skips missing parts', () => {
    expect(formatAddress({ line1: '5 King St', city: 'Toronto', country: 'CA' })).toBe(
      '5 King St, Toronto, CA'
    );
    expect(formatAddress({})).toBe('');
  });
});

describe('donations CSV', () => {
  it('quotes commas, quotes and newlines', () => {
    expect(csvCell('Smith, Jo')).toBe('"Smith, Jo"');
    expect(csvCell('say "hi"')).toBe('"say ""hi"""');
    expect(csvCell('a\nb')).toBe('"a\nb"');
    expect(csvCell(null)).toBe('');
  });

  it('neutralises spreadsheet formulas in donor-entered text', () => {
    expect(csvCell('=HYPERLINK("x")')).toBe(`"'=HYPERLINK(""x"")"`);
    expect(csvCell('-5')).toBe(`"'-5"`);
  });

  it('writes a header and one row per donation with dollar amounts', () => {
    const csv = donationsToCsv([
      {
        donatedAt: new Date('2026-11-13T15:00:00Z'),
        name: 'Jordan Lee',
        email: 'jordan@example.com',
        amount: 2550,
        currency: 'usd',
        addressLine1: '1 Main St',
        addressLine2: null,
        city: 'St. George',
        state: 'UT',
        postalCode: '84770',
        country: 'US',
        stripeSessionId: 'cs_1',
      },
    ]);
    const lines = csv.trim().split('\r\n');
    expect(lines[0]).toBe(
      'Date,Name,Email,Amount,Currency,Street Address,Apt/Suite,City,State,ZIP,Country,Stripe Session'
    );
    expect(lines[1]).toBe(
      '2026-11-13,Jordan Lee,jordan@example.com,25.50,USD,1 Main St,,St. George,UT,84770,US,cs_1'
    );
  });
});
