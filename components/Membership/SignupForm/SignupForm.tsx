'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextInput, PasswordInput, Button, Stack, Alert, Anchor } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { createClient } from '@/lib/supabase/client';
import classes from './SignupForm.module.css';

interface SignupFormProps {
  tier: string;
}

export function SignupForm({ tier }: SignupFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<'signup' | 'login'>('signup');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();

      if (mode === 'signup') {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name, tier }),
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Signup failed');
          setLoading(false);
          return;
        }

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          setError('Account created but sign-in failed. Please try logging in.');
          setLoading(false);
          return;
        }

        router.push('/membership/payment');
        router.refresh();
      } else {
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
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Stack>
        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
            {error}
          </Alert>
        )}

        {mode === 'signup' && (
          <TextInput
            label="Full Name"
            placeholder="Your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
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
          autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
        />

        <Button type="submit" fullWidth mt="xl" loading={loading}>
          {mode === 'signup' ? 'Create Account' : 'Sign In'}
        </Button>

        {mode === 'signup' ? (
          <Anchor component="button" type="button" size="sm" ta="center" onClick={() => { setMode('login'); setError(''); }}>
            Already have an account? Sign in
          </Anchor>
        ) : (
          <Anchor component="button" type="button" size="sm" ta="center" onClick={() => { setMode('signup'); setError(''); }}>
            Need an account? Sign up
          </Anchor>
        )}
      </Stack>
    </form>
  );
}
