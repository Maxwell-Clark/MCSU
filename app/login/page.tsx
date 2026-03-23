'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Paper, Title, Text, Center, Anchor } from '@mantine/core';
import { LoginForm } from '@/components/Admin/LoginForm/LoginForm';
import Link from 'next/link';
import classes from './login.module.css';

function LoginContent() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || undefined;

  return (
    <div className={classes.wrapper}>
      <Container size={420} py={80}>
        <Center>
          <div className={classes.formContainer}>
            <Title ta="center" className={classes.title}>
              Welcome back
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
              Sign in to your account
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <LoginForm redirect={redirect} />
            </Paper>

            <Text c="dimmed" size="sm" ta="center" mt="md">
              Need an account?{' '}
              <Anchor component={Link} href="/membership" size="sm">
                Sign up for membership
              </Anchor>
            </Text>
          </div>
        </Center>
      </Container>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  );
}
