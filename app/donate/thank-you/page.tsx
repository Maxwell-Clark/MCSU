import Link from 'next/link';
import { redirect } from 'next/navigation';
import type Stripe from 'stripe';
import { Button, Container, Text, Title } from '@mantine/core';
import { logger } from '@/lib/logger';
import { getStripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

interface ThankYouPageProps {
  searchParams: Promise<{ session_id?: string }>;
}

export default async function DonationThankYouPage({ searchParams }: ThankYouPageProps) {
  const { session_id: sessionId } = await searchParams;
  if (!sessionId) {
    redirect('/donate');
  }

  let session: Stripe.Checkout.Session | null = null;
  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId);
  } catch (error) {
    logger.error('Failed to load donation session', { action: 'donation_thank_you' }, error);
  }

  // Payment not completed — send them back to try again
  if (session?.status === 'open') {
    redirect('/donate');
  }

  const amount = session?.amount_total ?? null;
  const name = session?.customer_details?.name;

  const firstName = name?.split(' ')[0];

  return (
    <Container size="sm" py={80} ta="center">
      <Title order={1}>Thank you{firstName ? `, ${firstName}` : ''}!</Title>
      <Text size="lg" mt="md">
        {amount !== null
          ? `Your gift of $${(amount / 100).toLocaleString('en-US')} has been received.`
          : 'Your gift has been received.'}{' '}
        A receipt has been sent to your email.
      </Text>
      <Text mt="md">
        Your generosity helps us bring mindfulness programs, resources, and community to Southern
        Utah.
      </Text>
      <Button component={Link} href="/" mt="xl" size="md">
        Return Home
      </Button>
      <Text size="sm" c="dimmed" fs="italic" mt="xl">
        The Mindfulness Center of Southern Utah is a 501(c)(3) nonprofit organization. Your donation
        may be tax-deductible to the extent allowed by law. Please consult your tax advisor for
        details.
      </Text>
    </Container>
  );
}
