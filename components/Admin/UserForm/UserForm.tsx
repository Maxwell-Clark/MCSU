'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Select,
  Alert,
  Title,
} from '@mantine/core';
import { IconAlertCircle, IconCheck } from '@tabler/icons-react';
import { createUser, updateUser } from '@/lib/actions/users';
import { TIERS } from '@/lib/membership-tiers';

interface UserData {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: string;
  membershipTier: string | null;
}

interface UserFormProps {
  user?: UserData;
}

export function UserForm({ user }: UserFormProps) {
  const router = useRouter();
  const isEditing = !!user;

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [role, setRole] = useState(user?.role || 'member');
  const [membershipTier, setMembershipTier] = useState(user?.membershipTier || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const tierOptions = TIERS.map((t) => ({ value: t.slug, label: t.name }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditing) {
        await updateUser(user.id, {
          name,
          phone,
          role,
          membershipTier: role === 'member' ? membershipTier || null : null,
        });
      } else {
        if (!password) {
          setError('Password is required for new users');
          setLoading(false);
          return;
        }
        await createUser({
          email,
          password,
          name,
          phone: phone || undefined,
          role,
          membershipTier: role === 'member' ? membershipTier || undefined : undefined,
        });
      }
      router.push('/admin/users');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="lg" maw={500}>
        <Title order={3}>{isEditing ? 'Edit User' : 'Create User'}</Title>

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
            {error}
          </Alert>
        )}

        <TextInput
          label="Name"
          placeholder="Full name"
          required
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />

        <TextInput
          label="Email"
          placeholder="user@example.com"
          type="email"
          required
          disabled={isEditing}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <PasswordInput
          label={isEditing ? 'Password (leave blank to keep current)' : 'Password'}
          placeholder={isEditing ? 'Leave blank to keep current' : 'Enter password'}
          required={!isEditing}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />

        <TextInput
          label="Phone"
          placeholder="(555) 555-5555"
          value={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
        />

        <Select
          label="Role"
          data={[
            { value: 'admin', label: 'Admin' },
            { value: 'member', label: 'Member' },
          ]}
          value={role}
          onChange={(val) => setRole(val || 'member')}
          required
        />

        {role === 'member' && (
          <Select
            label="Membership Tier"
            placeholder="Select tier"
            data={tierOptions}
            value={membershipTier}
            onChange={(val) => setMembershipTier(val || '')}
          />
        )}

        <Button type="submit" loading={loading}>
          {isEditing ? 'Save Changes' : 'Create User'}
        </Button>
      </Stack>
    </form>
  );
}
