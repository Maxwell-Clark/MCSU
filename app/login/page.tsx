'use client';

import { Container, Paper, Title, Text, Center } from '@mantine/core';
import { LoginForm } from '@/components/Admin/LoginForm/LoginForm';
import classes from './login.module.css';

export default function LoginPage() {
  return (
    <div className={classes.wrapper}>
      <Container size={420} py={80}>
        <Center>
          <div className={classes.formContainer}>
            <Title ta="center" className={classes.title}>
              Welcome back
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
              Sign in to access the admin dashboard
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <LoginForm />
            </Paper>
          </div>
        </Center>
      </Container>
    </div>
  );
}
