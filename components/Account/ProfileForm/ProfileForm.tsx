'use client';

import { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Alert,
  Title,
  Paper,
  Divider,
} from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { updateProfile, changePassword } from '@/lib/actions/profile';

interface ProfileFormProps {
  user: {
    name: string;
    email: string;
    phone: string | null;
  };
}

export function ProfileForm({ user }: ProfileFormProps) {
  // Profile fields
  const [name, setName] = useState(user.name || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    setProfileLoading(true);

    try {
      await updateProfile({ name, phone });
      setProfileSuccess('Profile updated successfully');
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    setPasswordLoading(true);

    try {
      await changePassword({ currentPassword, newPassword });
      setPasswordSuccess('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Failed to change password');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <Stack gap="xl" maw={500}>
      <Paper withBorder p="xl" radius="md">
        <form onSubmit={handleProfileSubmit}>
          <Stack gap="md">
            <Title order={4}>Personal Information</Title>

            {profileError && (
              <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                {profileError}
              </Alert>
            )}
            {profileSuccess && (
              <Alert icon={<IconCheck size={16} />} color="green" variant="light">
                {profileSuccess}
              </Alert>
            )}

            <TextInput
              label="Name"
              placeholder="Your name"
              required
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />

            <TextInput
              label="Email"
              value={user.email}
              disabled
              description="Contact an admin to change your email"
            />

            <TextInput
              label="Phone"
              placeholder="(555) 555-5555"
              value={phone}
              onChange={(e) => setPhone(e.currentTarget.value)}
            />

            <Button type="submit" loading={profileLoading}>
              Save Changes
            </Button>
          </Stack>
        </form>
      </Paper>

      <Paper withBorder p="xl" radius="md">
        <form onSubmit={handlePasswordSubmit}>
          <Stack gap="md">
            <Title order={4}>Change Password</Title>

            {passwordError && (
              <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                {passwordError}
              </Alert>
            )}
            {passwordSuccess && (
              <Alert icon={<IconCheck size={16} />} color="green" variant="light">
                {passwordSuccess}
              </Alert>
            )}

            <PasswordInput
              label="Current Password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.currentTarget.value)}
            />

            <PasswordInput
              label="New Password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.currentTarget.value)}
            />

            <PasswordInput
              label="Confirm New Password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            />

            <Button type="submit" loading={passwordLoading} variant="outline">
              Change Password
            </Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
