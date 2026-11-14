'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Stepper,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Alert,
  Anchor,
  Group,
  Paper,
  Title,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { createClient } from '@/lib/supabase/client';
import { addressSchema, passwordSchema, phoneSchema, emailSchema } from '@/lib/validations';
import type { TierData } from '@/lib/membership-tiers';
import {
  AddressFields,
  EMPTY_ADDRESS_VALUE,
  type AddressValue,
} from '@/components/Forms/AddressFields/AddressFields';
import { MembershipCheckout } from '@/components/Membership/MembershipCheckout/MembershipCheckout';
import classes from './SignupWizard.module.css';

interface SignupWizardProps {
  tierSlug: string;
  tier: TierData;
}

export function SignupWizard({ tierSlug, tier }: SignupWizardProps) {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<'signup' | 'login'>('signup');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState<AddressValue>(EMPTY_ADDRESS_VALUE);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setError(emailResult.error.issues[0]?.message || 'Invalid email');
      return;
    }
    const phoneResult = phoneSchema.safeParse(phone);
    if (!phoneResult.success) {
      setError(phoneResult.error.issues[0]?.message || 'Invalid phone number');
      return;
    }
    const addressResult = addressSchema.safeParse(address);
    if (!addressResult.success) {
      setError(addressResult.error.issues[0]?.message || 'Please enter your full address');
      return;
    }
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      setError(passwordResult.error.issues[0]?.message || 'Invalid password');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
          phone,
          address: addressResult.data,
          tier: tierSlug,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      // Sign in immediately after signup so the session is ready
      const supabase = createClient();
      await supabase.auth.signInWithPassword({ email, password });
      setPassword('');
      setActive(1);
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      router.push('/membership/dashboard');
      router.refresh();
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Login mode — simple form, no stepper
  if (mode === 'login') {
    return (
      <div ref={formRef}>
      <Paper withBorder shadow="md" p={30} radius="md">
        <form onSubmit={handleLogin}>
          <Stack>
            <Title order={3} ta="center">Sign In</Title>

            {error && (
              <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                {error}
              </Alert>
            )}

            <TextInput
              label="Email"
              placeholder="you@example.com"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />

            <Button type="submit" fullWidth mt="xl" loading={loading}>
              Sign In
            </Button>

            <Anchor
              component="button"
              type="button"
              size="sm"
              ta="center"
              onClick={() => { setMode('signup'); setError(''); setTimeout(() => formRef.current?.querySelector<HTMLInputElement>('input')?.focus(), 100); }}
            >
              Need an account? Sign up
            </Anchor>
          </Stack>
        </form>
      </Paper>
      </div>
    );
  }

  // Signup wizard with stepper
  return (
    <div className={classes.wrapper} ref={formRef}>
      {/* No step clicking: once the account is created, going back would re-submit signup */}
      <Stepper active={active}>
        <Stepper.Step label="Account" description="Your details">
          <Paper withBorder shadow="md" p={30} mt="md" radius="md">
            <form onSubmit={handleCreateAccount}>
              <Stack>
                {error && (
                  <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                    {error}
                  </Alert>
                )}

                <TextInput
                  label="Full Name"
                  placeholder="Your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />

                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />

                <TextInput
                  label="Phone Number"
                  placeholder="(555) 123-4567"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />

                <AddressFields value={address} onChange={setAddress} required />

                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />

                <Group justify="space-between" mt="xl">
                  <Anchor
                    component="button"
                    type="button"
                    size="sm"
                    onClick={() => { setMode('login'); setError(''); setTimeout(() => formRef.current?.querySelector<HTMLInputElement>('input')?.focus(), 100); }}
                  >
                    Already have an account?
                  </Anchor>
                  <Button type="submit" loading={loading}>
                    Next
                  </Button>
                </Group>
              </Stack>
            </form>
          </Paper>
        </Stepper.Step>

        <Stepper.Step label="Payment" description="Complete membership">
          <Paper withBorder shadow="md" p="xl" mt="md" radius="md" className={classes.widgetContainer}>
            <Title order={3} ta="center" mb="xl">
              Complete Your {tier.name} Membership
            </Title>

            {/* Only mount once the account exists — the checkout API requires a session */}
            {active === 1 && <MembershipCheckout tier={tier} />}
          </Paper>

          <Button
            variant="subtle"
            fullWidth
            mt="lg"
            onClick={() => {
              router.push('/membership/dashboard');
              router.refresh();
            }}
          >
            Skip for now — Go to Dashboard
          </Button>
        </Stepper.Step>
      </Stepper>
    </div>
  );
}
