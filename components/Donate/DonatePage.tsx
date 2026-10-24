'use client';

import { useState } from 'react';
import { Anchor, Button, Container, NumberInput, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { IconHeartHandshake, IconBook, IconUsers } from '@tabler/icons-react';
import { StripeCheckout } from '@/components/Payments/StripeCheckout';
import classes from './DonatePage.module.css';

const PRESET_AMOUNTS = [25, 50, 100, 250];
const MIN_AMOUNT = 5;
const MAX_AMOUNT = 10000;

const IMPACT_AREAS = [
  {
    icon: IconUsers,
    title: 'Community Programs',
    description:
      'Fund workshops, group meditations, and community events that bring people together through mindfulness.',
  },
  {
    icon: IconBook,
    title: 'Mindfulness Education',
    description:
      'Support evidence-based curricula, teacher training, and educational materials for learners of all ages.',
  },
  {
    icon: IconHeartHandshake,
    title: 'Accessible Resources',
    description:
      'Help us keep guided meditations, wellness tools, and contemplative resources free and open to everyone.',
  },
];

export function DonatePage() {
  const [preset, setPreset] = useState<number | null>(50);
  const [custom, setCustom] = useState<string | number>('');
  const [checkoutAmount, setCheckoutAmount] = useState<number | null>(null);

  const amount = custom !== '' ? Number(custom) : preset;
  const amountValid =
    amount !== null && Number.isInteger(amount) && amount >= MIN_AMOUNT && amount <= MAX_AMOUNT;

  return (
    <Container size="xl" py="xl" className={classes.section}>
      {/* Hero */}
      <div className={classes.heroSection}>
        <Title order={1} className={classes.heroTitle}>
          Support Our Mission
        </Title>
        <Text className={classes.heroText}>
          The Mindfulness Center of Southern Utah is dedicated to fostering mindfulness and
          well-being in our community. Your generous donation helps us continue offering programs,
          resources, and events that make a real difference in people&apos;s lives.
        </Text>
        <Text className={classes.heroText}>
          Every contribution — no matter the size — supports our workshops, guided meditations,
          educational materials, and community partnerships. Thank you for helping us grow.
        </Text>
      </div>

      {/* Impact Cards */}
      <div className={classes.impactGrid}>
        {IMPACT_AREAS.map((area) => (
          <div key={area.title} className={classes.impactCard}>
            <area.icon size={40} stroke={1.5} className={classes.impactIcon} aria-hidden="true" />
            <div className={classes.impactTitle}>{area.title}</div>
            <Text className={classes.impactText}>{area.description}</Text>
          </div>
        ))}
      </div>

      {/* Donation */}
      <div className={classes.widgetSection}>
        <Title order={2} className={classes.widgetTitle}>
          Make Your Gift
        </Title>

        {checkoutAmount === null ? (
          <Stack className={classes.amountPicker} gap="md">
            <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="sm">
              {PRESET_AMOUNTS.map((value) => {
                const selected = custom === '' && preset === value;
                return (
                  <Button
                    key={value}
                    size="lg"
                    variant={selected ? 'filled' : 'default'}
                    aria-pressed={selected}
                    onClick={() => {
                      setPreset(value);
                      setCustom('');
                    }}
                  >
                    ${value}
                  </Button>
                );
              })}
            </SimpleGrid>

            <NumberInput
              label="Or enter a custom amount"
              placeholder="Other amount"
              prefix="$"
              size="md"
              min={MIN_AMOUNT}
              max={MAX_AMOUNT}
              allowDecimal={false}
              allowNegative={false}
              thousandSeparator=","
              value={custom}
              onChange={setCustom}
              error={
                custom !== '' && !amountValid
                  ? `Please enter an amount between $${MIN_AMOUNT} and $${MAX_AMOUNT.toLocaleString()}`
                  : undefined
              }
            />

            <Button size="lg" disabled={!amountValid} onClick={() => setCheckoutAmount(amount)}>
              {amountValid ? `Donate $${amount.toLocaleString()}` : 'Donate'}
            </Button>
            <Text size="xs" c="dimmed" ta="center">
              One-time gift. Secure payment processed by Stripe.
            </Text>
          </Stack>
        ) : (
          <div className={classes.checkout}>
            <Text ta="center" mb="md">
              Donating <strong>${checkoutAmount.toLocaleString()}</strong> &middot;{' '}
              <Anchor component="button" type="button" onClick={() => setCheckoutAmount(null)}>
                Change amount
              </Anchor>
            </Text>
            <StripeCheckout
              key={checkoutAmount}
              endpoint="/api/checkout/donation"
              body={{ amount: checkoutAmount }}
            />
          </div>
        )}
      </div>

      {/* Closing */}
      <div className={classes.closingSection}>
        <Text className={classes.closingNote}>
          The Mindfulness Center of Southern Utah is a 501(c)(3) nonprofit organization. Your
          donation may be tax-deductible to the extent allowed by law. Please consult your tax
          advisor for details.
        </Text>
      </div>
    </Container>
  );
}
