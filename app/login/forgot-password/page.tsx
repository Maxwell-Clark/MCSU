'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { IconAlertCircle } from '@tabler/icons-react';
import {
  Alert,
  Anchor,
  Button,
  Center,
  Container,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { createClient } from '@/lib/supabase/client';
import { emailSchema } from '@/lib/validations';
import classes from '../login.module.css';

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  const invalidLink = searchParams.get('error') === 'invalid_link';
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0]?.message || 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await createClient().auth.resetPasswordForEmail(result.data, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });
      if (resetError) {
        setError('We could not send a reset email right now. Please try again later.');
        return;
      }
      setSent(true);
    } catch {
      setError('We could not send a reset email right now. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Container size={420} py={80}>
        <Center>
          <div className={classes.formContainer}>
            <Title ta="center" className={classes.title}>
              Forgot your password?
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
              Enter your email and we&apos;ll send you a reset link
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              {sent ? (
                <Alert color="green" variant="light">
                  If an account exists for that email, we&apos;ve sent a reset link. Open it in this
                  same browser.
                </Alert>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <Stack>
                    {invalidLink && !error && (
                      <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                        That reset link expired or was opened in a different browser. Please request
                        a new one.
                      </Alert>
                    )}

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

                    <Button type="submit" fullWidth mt="md" loading={loading}>
                      Send reset link
                    </Button>
                  </Stack>
                </form>
              )}
            </Paper>

            <Text ta="center" mt="md">
              <Anchor component={Link} href="/login" size="sm">
                Back to sign in
              </Anchor>
            </Text>
          </div>
        </Center>
      </Container>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordContent />
    </Suspense>
  );
}
