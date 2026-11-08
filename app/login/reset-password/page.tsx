'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconAlertCircle } from '@tabler/icons-react';
import {
  Alert,
  Anchor,
  Button,
  Center,
  Container,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { createClient } from '@/lib/supabase/client';
import { passwordSchema } from '@/lib/validations';
import classes from '../login.module.css';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'ready' | 'invalid'>('checking');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    createClient()
      .auth.getUser()
      .then(({ data }) => setStatus(data.user ? 'ready' : 'invalid'))
      .catch(() => setStatus('invalid'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      setError(result.error.issues[0]?.message || 'Invalid password');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) {
        setError(updateError.message);
        return;
      }
      await supabase.auth.signOut();
      router.push('/login?reset=success');
      router.refresh();
    } catch {
      setError('An error occurred. Please try again.');
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
              Choose a new password
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
              At least 8 characters, with an uppercase letter, a lowercase letter, and a number
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              {status === 'checking' && (
                <Center>
                  <Loader size="sm" />
                </Center>
              )}

              {status === 'invalid' && (
                <Stack>
                  <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                    This reset link is no longer valid.
                  </Alert>
                  <Anchor component={Link} href="/login/forgot-password" size="sm" ta="center">
                    Request a new reset link
                  </Anchor>
                </Stack>
              )}

              {status === 'ready' && (
                <form onSubmit={handleSubmit}>
                  <Stack>
                    {error && (
                      <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                        {error}
                      </Alert>
                    )}

                    <PasswordInput
                      label="New password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                    />

                    <PasswordInput
                      label="Confirm new password"
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      autoComplete="new-password"
                    />

                    <Button type="submit" fullWidth mt="md" loading={loading}>
                      Update password
                    </Button>
                  </Stack>
                </form>
              )}
            </Paper>
          </div>
        </Center>
      </Container>
    </div>
  );
}
