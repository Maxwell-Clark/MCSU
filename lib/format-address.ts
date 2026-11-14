export interface AddressParts {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
  /** ISO country code; 'US' is omitted from the output */
  country?: string | null;
}

/** Formats an address as one line, e.g. "123 Main St, Apt 4, St. George, UT 84770". */
export function formatAddress(parts: AddressParts): string {
  const cityLine = [parts.city, [parts.state, parts.postalCode].filter(Boolean).join(' ')]
    .filter(Boolean)
    .join(', ');
  const country = parts.country && parts.country !== 'US' ? parts.country : null;
  return [parts.line1, parts.line2, cityLine, country].filter(Boolean).join(', ');
}
