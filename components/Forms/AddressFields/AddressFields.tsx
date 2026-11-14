'use client';

import { Group, Select, Stack, TextInput } from '@mantine/core';
import { US_STATES } from '@/lib/us-states';

export interface AddressValue {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
}

export const EMPTY_ADDRESS_VALUE: AddressValue = {
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  postalCode: '',
};

/** Builds form state from a stored (nullable) address. */
export function toAddressValue(address: {
  addressLine1?: string | null;
  addressLine2?: string | null;
  city?: string | null;
  state?: string | null;
  postalCode?: string | null;
}): AddressValue {
  return {
    addressLine1: address.addressLine1 ?? '',
    addressLine2: address.addressLine2 ?? '',
    city: address.city ?? '',
    state: address.state ?? '',
    postalCode: address.postalCode ?? '',
  };
}

interface AddressFieldsProps {
  value: AddressValue;
  onChange: (value: AddressValue) => void;
  /** Shows required markers; validation itself happens in lib/validations.ts */
  required?: boolean;
}

/** US mailing address inputs (street, apt/suite, city, state, ZIP). */
export function AddressFields({ value, onChange, required = false }: AddressFieldsProps) {
  const set = (field: keyof AddressValue) => (next: string) => onChange({ ...value, [field]: next });

  return (
    <Stack gap="sm">
      <TextInput
        label="Street Address"
        placeholder="123 Main St"
        required={required}
        value={value.addressLine1}
        onChange={(e) => set('addressLine1')(e.target.value)}
        autoComplete="address-line1"
      />
      <TextInput
        label="Apt, Suite, etc."
        placeholder="Optional"
        value={value.addressLine2}
        onChange={(e) => set('addressLine2')(e.target.value)}
        autoComplete="address-line2"
      />
      <TextInput
        label="City"
        placeholder="St. George"
        required={required}
        value={value.city}
        onChange={(e) => set('city')(e.target.value)}
        autoComplete="address-level2"
      />
      <Group grow align="flex-start" gap="sm">
        <Select
          label="State"
          placeholder="Select"
          required={required}
          data={US_STATES}
          searchable
          clearable={!required}
          value={value.state || null}
          onChange={(next) => set('state')(next ?? '')}
          autoComplete="address-level1"
          comboboxProps={{ withinPortal: true }}
        />
        <TextInput
          label="ZIP Code"
          placeholder="84770"
          required={required}
          value={value.postalCode}
          onChange={(e) => set('postalCode')(e.target.value)}
          autoComplete="postal-code"
          inputMode="numeric"
          maxLength={10}
        />
      </Group>
    </Stack>
  );
}
