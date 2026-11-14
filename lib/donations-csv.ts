export interface DonationCsvRow {
  donatedAt: Date;
  name: string | null;
  email: string | null;
  amount: number;
  currency: string;
  addressLine1: string | null;
  addressLine2: string | null;
  city: string | null;
  state: string | null;
  postalCode: string | null;
  country: string | null;
  stripeSessionId: string;
}

const HEADERS = [
  'Date',
  'Name',
  'Email',
  'Amount',
  'Currency',
  'Street Address',
  'Apt/Suite',
  'City',
  'State',
  'ZIP',
  'Country',
  'Stripe Session',
];

/**
 * Quotes per RFC 4180, and neutralises values a spreadsheet would run as a formula
 * (donor-entered names/addresses starting with = + - @).
 */
export function csvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) {
    return '';
  }
  let text = String(value);
  if (typeof value === 'string' && /^[=+\-@\t\r]/.test(text)) {
    text = `'${text}`;
  }
  return /[",\r\n]/.test(text) || text !== String(value) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function donationsToCsv(donations: DonationCsvRow[]): string {
  const rows = donations.map((d) => [
    d.donatedAt.toISOString().slice(0, 10),
    d.name,
    d.email,
    (d.amount / 100).toFixed(2),
    d.currency.toUpperCase(),
    d.addressLine1,
    d.addressLine2,
    d.city,
    d.state,
    d.postalCode,
    d.country,
    d.stripeSessionId,
  ]);
  return [HEADERS, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
}
