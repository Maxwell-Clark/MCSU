'use client';

import { useState, useEffect } from 'react';
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
  Text,
  Title,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { createClient } from '@/lib/supabase/client';
import type { TierData } from '@/lib/membership-tiers';
import classes from './SignupWizard.module.css';

interface SignupWizardProps {
  tierSlug: string;
  tier: TierData;
}

export function SignupWizard({ tierSlug, tier }: SignupWizardProps) {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<'signup' | 'login'>('signup');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Re-initialize Givebutter when reaching payment step
  useEffect(() => {
    if (active === 2) {
      window.Givebutter?.init();
    }
  }, [active]);

  const handleNextAccount = () => {
    setError('');
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setActive(1);
  };

  const handleNextContact = async () => {
    setError('');
    if (!phone.trim()) {
      setError('Please enter your phone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, phone, tier: tierSlug }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed');
        setLoading(false);
        return;
      }

      setActive(2);
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
              onClick={() => { setMode('signup'); setError(''); }}
            >
              Need an account? Sign up
            </Anchor>
          </Stack>
        </form>
      </Paper>
    );
  }

  // Signup wizard with stepper
  return (
    <div className={classes.wrapper}>
      <Stepper active={active} onStepClick={(step) => step < active && setActive(step)}>
        <Stepper.Step label="Account" description="Name & credentials">
          <Paper withBorder shadow="md" p={30} mt="md" radius="md">
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
                  onClick={() => { setMode('login'); setError(''); }}
                >
                  Already have an account?
                </Anchor>
                <Button onClick={handleNextAccount}>Next</Button>
              </Group>
            </Stack>
          </Paper>
        </Stepper.Step>

        <Stepper.Step label="Contact" description="Phone number">
          <Paper withBorder shadow="md" p={30} mt="md" radius="md">
            <Stack>
              {error && (
                <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                  {error}
                </Alert>
              )}

              <TextInput
                label="Phone Number"
                placeholder="(555) 123-4567"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
              />

              <Group justify="flex-end" mt="xl">
                <Button variant="default" onClick={() => { setActive(0); setError(''); }}>
                  Back
                </Button>
                <Button onClick={handleNextContact} loading={loading}>
                  Next
                </Button>
              </Group>
            </Stack>
          </Paper>
        </Stepper.Step>

        <Stepper.Step label="Payment" description="Complete membership">
          <Paper withBorder shadow="md" p="xl" mt="md" radius="md" className={classes.widgetContainer}>
            <Title order={3} ta="center">
              Complete Your {tier.name} Membership
            </Title>
            <Text c="dimmed" ta="center" mt="sm" mb="xl">
              {tier.monthlyPrice} &middot; {tier.yearlyPrice}
            </Text>

            <givebutter-widget id={tier.givebutterId}></givebutter-widget>
          </Paper>

          <Button
            variant="subtle"
            fullWidth
            mt="lg"
            loading={loading}
            onClick={async () => {
              setLoading(true);
              try {
                const supabase = createClient();
                const { error: signInError } = await supabase.auth.signInWithPassword({
                  email,
                  password,
                });
                if (signInError) {
                  setError('Sign-in failed. Please try logging in from the membership page.');
                  return;
                }
                router.push('/membership/dashboard');
                router.refresh();
              } catch {
                setError('An error occurred. Please try again.');
              } finally {
                setLoading(false);
              }
            }}
          >
            Go to Dashboard
          </Button>
        </Stepper.Step>
      </Stepper>
    </div>
  );
}
