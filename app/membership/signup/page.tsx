'use client';

import { useSearchParams } from 'next/navigation';
import { Container, Text, Center } from '@mantine/core';
import { SignupWizard } from '@/components/Membership/SignupWizard/SignupWizard';
import { getTierBySlug } from '@/lib/membership-tiers';
import { Suspense } from 'react';

function SignupContent() {
  const searchParams = useSearchParams();
  const tierSlug = searchParams.get('tier') || 'curious';
  const tier = getTierBySlug(tierSlug);

  if (!tier) {
    return (
      <Container size="sm" py={80}>
        <Center>
          <Text>Invalid membership tier. Please go back and select a tier.</Text>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="sm" py={80}>
      <Text c="dimmed" size="sm" ta="center" mb="xl">
        {tier.name} membership ({tier.monthlyPrice})
      </Text>

      <SignupWizard tierSlug={tierSlug} tier={tier} />
    </Container>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupContent />
    </Suspense>
  );
}
