'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IconAlertCircle, IconCheck, IconClock, IconInfoCircle } from '@tabler/icons-react';
import {
  Alert,
  Anchor,
  Badge,
  Button,
  Container,
  Group,
  List,
  Loader,
  Modal,
  Paper,
  SegmentedControl,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { MembershipBilling, MembershipPayment } from '@/lib/membership-billing';
import {
  formatCents,
  getAnnualAmount,
  getTierBySlug,
  isSamePlan,
  isUpgrade,
  type BillingInterval,
  type TierData,
} from '@/lib/membership-tiers';
import { createClient } from '@/lib/supabase/client';
import { TierCards } from '../TierCards/TierCards';
import classes from './MemberDashboard.module.css';

interface MemberDashboardProps {
  name: string;
  tier: TierData;
  /** null = membership managed manually (no Stripe subscription) */
  membershipStatus: string | null;
  /** Live subscription details from Stripe; null when there is no subscription */
  billing?: MembershipBilling | null;
  payments?: MembershipPayment[];
  /** Stripe couldn't be reached while loading the page */
  billingUnavailable?: boolean;
  justPaid: boolean;
}

interface ChangePreview {
  effective: 'now' | 'renewal';
  amountDue?: number;
  effectiveAt?: number;
  recurringAmount: number;
}

const STATUS_BADGES: Record<string, { label: string; color: string }> = {
  active: { label: 'Active', color: 'teal' },
  past_due: { label: 'Payment issue', color: 'red' },
  pending: { label: 'Pending', color: 'yellow' },
  canceled: { label: 'Canceled', color: 'gray' },
};

const PAYMENT_BADGES: Record<string, { label: string; color: string }> = {
  paid: { label: 'Paid', color: 'teal' },
  open: { label: 'Due', color: 'yellow' },
  uncollectible: { label: 'Failed', color: 'red' },
  void: { label: 'Void', color: 'gray' },
};

const intervalLabel = (interval: BillingInterval) => (interval === 'month' ? 'monthly' : 'yearly');
const perInterval = (interval: BillingInterval) => (interval === 'month' ? '/mo' : '/yr');

function formatDate(unixSeconds: number) {
  return new Date(unixSeconds * 1000).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function planName(slug: string, interval: BillingInterval) {
  return `${getTierBySlug(slug)?.name ?? slug} (${intervalLabel(interval)})`;
}

async function postJson(url: string, method: 'POST' | 'DELETE', body?: unknown) {
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'An error occurred. Please try again.');
  }
  return data;
}

export function MemberDashboard({
  name,
  tier,
  membershipStatus,
  billing = null,
  payments = [],
  billingUnavailable = false,
  justPaid,
}: MemberDashboardProps) {
  const router = useRouter();
  const [cancelOpened, { open: openCancel, close: closeCancel }] = useDisclosure(false);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState('');
  const [notice, setNotice] = useState('');
  const [actionError, setActionError] = useState('');
  const [portalLoading, setPortalLoading] = useState(false);
  const [resuming, setResuming] = useState(false);
  const [undoing, setUndoing] = useState(false);

  const [viewInterval, setViewInterval] = useState<BillingInterval>(billing?.interval ?? 'month');
  const [target, setTarget] = useState<{ slug: string; interval: BillingInterval } | null>(null);
  const [preview, setPreview] = useState<ChangePreview | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [changeError, setChangeError] = useState('');
  const [changing, setChanging] = useState(false);

  const activating = justPaid && membershipStatus !== 'active';
  const hasSubscription = membershipStatus !== null;
  const isCanceling = Boolean(billing?.cancelAtPeriodEnd || billing?.cancelAt);
  const currentPlan =
    billing?.slug && billing.interval ? { slug: billing.slug, interval: billing.interval } : null;
  const canChangePlan = Boolean(currentPlan) && membershipStatus === 'active' && !isCanceling;
  const status = membershipStatus ? STATUS_BADGES[membershipStatus] : null;

  // Poll briefly while the Stripe webhook activates the membership
  useEffect(() => {
    if (!activating) {
      return;
    }
    const timer = setInterval(() => router.refresh(), 3000);
    const stop = setTimeout(() => clearInterval(timer), 60000);
    return () => {
      clearInterval(timer);
      clearTimeout(stop);
    };
  }, [activating, router]);

  const handleManagePayment = async () => {
    setPortalLoading(true);
    setActionError('');
    try {
      const data = await postJson('/api/membership/portal', 'POST');
      if (!data.url) {
        throw new Error('Unable to open billing portal');
      }
      window.location.href = data.url;
    } catch (error) {
      setActionError((error as Error).message);
    } finally {
      setPortalLoading(false);
    }
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/membership');
    router.refresh();
  };

  const handleCancel = async () => {
    setCancelling(true);
    setCancelError('');

    try {
      const data = await postJson('/api/membership/cancel', 'POST');
      closeCancel();
      if (data.cancelAt) {
        setNotice(
          `Your membership will end on ${formatDate(data.cancelAt)}. You won't be charged again.`
        );
        router.refresh();
        return;
      }
      router.push('/membership');
      router.refresh();
    } catch (error) {
      setCancelError((error as Error).message);
    } finally {
      setCancelling(false);
    }
  };

  const handleResume = async () => {
    setResuming(true);
    setActionError('');
    try {
      await postJson('/api/membership/resume', 'POST');
      setNotice('Your membership will continue to renew.');
      router.refresh();
    } catch (error) {
      setActionError((error as Error).message);
    } finally {
      setResuming(false);
    }
  };

  const handleUndoChange = async () => {
    setUndoing(true);
    setActionError('');
    try {
      await postJson('/api/membership/change', 'DELETE');
      setNotice('Your scheduled plan change was cancelled.');
      router.refresh();
    } catch (error) {
      setActionError((error as Error).message);
    } finally {
      setUndoing(false);
    }
  };

  const openChange = async (slug: string) => {
    const next = { slug, interval: viewInterval };
    setTarget(next);
    setPreview(null);
    setChangeError('');
    setPreviewLoading(true);
    try {
      setPreview(
        await postJson('/api/membership/change/preview', 'POST', {
          tier: slug,
          interval: viewInterval,
        })
      );
    } catch (error) {
      setChangeError((error as Error).message);
    } finally {
      setPreviewLoading(false);
    }
  };

  const closeChange = () => {
    setTarget(null);
    setPreview(null);
    setChangeError('');
  };

  const confirmChange = async () => {
    if (!target) {
      return;
    }
    setChanging(true);
    setChangeError('');
    try {
      const data = await postJson('/api/membership/change', 'POST', {
        tier: target.slug,
        interval: target.interval,
      });
      setNotice(
        data.effective === 'now'
          ? `You're now on the ${planName(target.slug, target.interval)} plan.`
          : `Your plan will switch to ${planName(target.slug, target.interval)} on ${formatDate(data.effectiveAt)}.`
      );
      closeChange();
      router.refresh();
    } catch (error) {
      setChangeError((error as Error).message);
    } finally {
      setChanging(false);
    }
  };

  const renderChangeAction = (option: TierData) => {
    if (!currentPlan) {
      return null;
    }
    const choice = { slug: option.slug, interval: viewInterval };
    if (isSamePlan(currentPlan, choice)) {
      return (
        <Button fullWidth size="md" variant="light" disabled>
          Current Plan
        </Button>
      );
    }
    const upgrade = isUpgrade(currentPlan, choice);
    const label =
      option.slug === currentPlan.slug
        ? `Switch to ${intervalLabel(viewInterval)}`
        : upgrade
          ? `Upgrade to ${option.name}`
          : `Switch to ${option.name}`;
    return (
      <Stack gap={4}>
        <Button
          fullWidth
          size="md"
          variant={upgrade ? 'filled' : 'light'}
          disabled={!canChangePlan}
          onClick={() => openChange(option.slug)}
        >
          {label}
        </Button>
        <Text size="xs" c="dimmed" ta="center">
          {upgrade ? 'Takes effect today' : 'Takes effect at renewal'}
        </Text>
      </Stack>
    );
  };

  const targetIsUpgrade = currentPlan && target ? isUpgrade(currentPlan, target) : false;

  return (
    <Container size="lg" py="xl" className={classes.wrapper}>
      <Title order={2} ta="center">
        Welcome, {name}
      </Title>
      <Text c="dimmed" ta="center" mt="xs" mb="xl">
        {tier.name} Member
      </Text>

      {activating && (
        <Alert icon={<IconClock size={16} />} color="teal" variant="light" mb="lg">
          Payment received — activating your membership. This usually takes a few seconds.
        </Alert>
      )}
      {!activating && (membershipStatus === 'pending' || membershipStatus === 'canceled') && (
        <Alert icon={<IconAlertCircle size={16} />} color="yellow" variant="light" mb="lg">
          Your membership isn&apos;t active yet.{' '}
          <Link href="/membership/payment">Complete your membership</Link> to unlock your benefits.
        </Alert>
      )}
      {membershipStatus === 'past_due' && (
        <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light" mb="lg">
          We couldn&apos;t process your last payment. Please update your payment method below.
        </Alert>
      )}
      {billingUnavailable && (
        <Alert icon={<IconInfoCircle size={16} />} color="gray" variant="light" mb="lg">
          Billing details are temporarily unavailable. Please refresh in a moment.
        </Alert>
      )}
      {notice && (
        <Alert
          icon={<IconCheck size={16} />}
          color="teal"
          variant="light"
          mb="lg"
          withCloseButton
          onClose={() => setNotice('')}
        >
          {notice}
        </Alert>
      )}
      {actionError && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          color="red"
          variant="light"
          mb="lg"
          withCloseButton
          onClose={() => setActionError('')}
        >
          {actionError}
        </Alert>
      )}

      <Stack gap="xl">
        {/* Plan + benefits */}
        <div className={classes.topGrid}>
          <Paper withBorder shadow="sm" p="xl" radius="md">
            <Stack gap="sm">
              <Group justify="space-between" wrap="nowrap">
                <Title order={4}>Your Plan</Title>
                {status && (
                  <Badge color={status.color} variant="light">
                    {status.label}
                  </Badge>
                )}
              </Group>

              <Text size="xl" fw={700}>
                {tier.name}
              </Text>
              {billing?.amount != null && billing.interval ? (
                <Text size="sm">
                  {formatCents(billing.amount)}
                  {perInterval(billing.interval)} &middot; billed {intervalLabel(billing.interval)}
                </Text>
              ) : (
                <Text size="sm">
                  {tier.monthlyPrice} or {tier.yearlyPrice}
                </Text>
              )}

              {billing?.currentPeriodEnd && !isCanceling && membershipStatus === 'active' && (
                <Text size="sm" c="dimmed">
                  Renews on {formatDate(billing.currentPeriodEnd)}
                  {billing.amount != null && ` for ${formatCents(billing.amount)}`}
                </Text>
              )}

              {isCanceling && (
                <Alert color="yellow" variant="light" p="sm">
                  <Group justify="space-between" gap="sm">
                    <Text size="sm">
                      Your membership ends on{' '}
                      {formatDate((billing?.cancelAt ?? billing?.currentPeriodEnd) as number)}.
                    </Text>
                    <Button size="xs" onClick={handleResume} loading={resuming}>
                      Resume
                    </Button>
                  </Group>
                </Alert>
              )}

              {billing?.pendingChange && (
                <Alert color="blue" variant="light" p="sm">
                  <Group justify="space-between" gap="sm">
                    <Text size="sm">
                      Switching to{' '}
                      <strong>
                        {planName(billing.pendingChange.slug, billing.pendingChange.interval)}
                      </strong>{' '}
                      on {formatDate(billing.pendingChange.effectiveAt)}.
                    </Text>
                    <Button size="xs" variant="light" onClick={handleUndoChange} loading={undoing}>
                      Undo
                    </Button>
                  </Group>
                </Alert>
              )}

              {!hasSubscription && (
                <Text size="sm" c="dimmed">
                  Your membership is managed by our team. To make changes, contact us at{' '}
                  <a href="mailto:kbenson@mindfulnesscsu.org">kbenson@mindfulnesscsu.org</a>.
                </Text>
              )}
            </Stack>
          </Paper>

          <Paper withBorder shadow="sm" p="xl" radius="md">
            <Title order={4} mb="sm">
              Your Benefits
            </Title>
            {tier.prefix && (
              <Text size="sm" fw={600} c="dimmed" mb="xs">
                {tier.prefix}
              </Text>
            )}
            <List
              spacing="xs"
              icon={
                <ThemeIcon size={20} radius="xl" color="teal" aria-hidden="true">
                  <IconCheck size={12} />
                </ThemeIcon>
              }
            >
              {tier.benefits.map((benefit) => (
                <List.Item key={benefit}>{benefit}</List.Item>
              ))}
            </List>
          </Paper>
        </div>

        {/* Change plan */}
        {currentPlan && (
          <Paper withBorder shadow="sm" p="xl" radius="md">
            <Stack gap="lg">
              <Group justify="space-between" align="flex-end">
                <div>
                  <Title order={4}>Change Plan</Title>
                  <Text size="sm" c="dimmed">
                    Upgrades take effect today with a prorated charge. Downgrades take effect at
                    your next renewal.
                  </Text>
                </div>
                <SegmentedControl
                  value={viewInterval}
                  onChange={(value) => setViewInterval(value as BillingInterval)}
                  data={[
                    { label: 'Monthly', value: 'month' },
                    { label: 'Yearly', value: 'year' },
                  ]}
                />
              </Group>
              {!canChangePlan && (
                <Text size="sm" c="dimmed">
                  {isCanceling
                    ? 'Resume your membership to change plans.'
                    : 'Plan changes are available once your membership is active and up to date.'}
                </Text>
              )}
              <TierCards
                interval={viewInterval}
                currentSlug={currentPlan.slug}
                renderAction={renderChangeAction}
              />
            </Stack>
          </Paper>
        )}

        {/* Payment history */}
        {hasSubscription && !billingUnavailable && (
          <Paper withBorder shadow="sm" p="xl" radius="md">
            <Title order={4} mb="md">
              Payment History
            </Title>
            {payments.length === 0 ? (
              <Text size="sm" c="dimmed">
                No payments yet.
              </Text>
            ) : (
              <Table.ScrollContainer minWidth={480}>
                <Table verticalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Date</Table.Th>
                      <Table.Th>Description</Table.Th>
                      <Table.Th>Amount</Table.Th>
                      <Table.Th>Status</Table.Th>
                      <Table.Th>Receipt</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {payments.map((payment) => {
                      const badge = payment.status ? PAYMENT_BADGES[payment.status] : null;
                      return (
                        <Table.Tr key={payment.id}>
                          <Table.Td>{formatDate(payment.date)}</Table.Td>
                          <Table.Td>{payment.description}</Table.Td>
                          <Table.Td>{formatCents(payment.amount)}</Table.Td>
                          <Table.Td>
                            {badge && (
                              <Badge color={badge.color} variant="light" size="sm">
                                {badge.label}
                              </Badge>
                            )}
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              {payment.hostedUrl && (
                                <Anchor
                                  href={payment.hostedUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  size="sm"
                                >
                                  View
                                </Anchor>
                              )}
                              {payment.pdfUrl && (
                                <Anchor
                                  href={payment.pdfUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  size="sm"
                                >
                                  PDF
                                </Anchor>
                              )}
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              </Table.ScrollContainer>
            )}
          </Paper>
        )}

        {/* Account actions */}
        <Paper withBorder shadow="sm" p="xl" radius="md">
          <Title order={4} mb="md">
            Account
          </Title>
          <Group>
            {membershipStatus === 'active' || membershipStatus === 'past_due' ? (
              <Button variant="light" onClick={handleManagePayment} loading={portalLoading}>
                Update Payment Method
              </Button>
            ) : (
              hasSubscription && (
                <Button component={Link} href="/membership/payment" variant="light">
                  Complete Payment
                </Button>
              )
            )}
            <Button component={Link} href="/account/profile" variant="light">
              Edit Profile
            </Button>
            {!isCanceling && (
              <Button variant="light" color="red" onClick={openCancel}>
                Cancel Membership
              </Button>
            )}
            <Button variant="subtle" color="red" onClick={handleSignOut}>
              Sign Out
            </Button>
          </Group>
        </Paper>
      </Stack>

      <Modal
        opened={target !== null}
        onClose={closeChange}
        title={targetIsUpgrade ? 'Confirm Upgrade' : 'Confirm Plan Change'}
        centered
      >
        {target && currentPlan && (
          <Stack gap="md">
            <Text size="sm">
              Switch from <strong>{planName(currentPlan.slug, currentPlan.interval)}</strong> to{' '}
              <strong>{planName(target.slug, target.interval)}</strong>.
            </Text>

            {previewLoading && (
              <Group gap="xs">
                <Loader size="xs" />
                <Text size="sm" c="dimmed">
                  Calculating…
                </Text>
              </Group>
            )}
            {preview?.effective === 'now' && (
              <Text size="sm">
                You&apos;ll be charged <strong>{formatCents(preview.amountDue ?? 0)}</strong> today
                (prorated for the rest of your billing period), then{' '}
                {formatCents(preview.recurringAmount)}
                {perInterval(target.interval)}. Your new benefits start right away.
              </Text>
            )}
            {preview?.effective === 'renewal' && preview.effectiveAt && (
              <Text size="sm">
                You&apos;ll keep your current benefits until{' '}
                <strong>{formatDate(preview.effectiveAt)}</strong>. After that you&apos;ll be billed{' '}
                {formatCents(preview.recurringAmount)}
                {perInterval(target.interval)}.
              </Text>
            )}
            {!previewLoading && !preview && !changeError && (
              <Text size="sm" c="dimmed">
                {targetIsUpgrade
                  ? 'Takes effect today with a prorated charge.'
                  : 'Takes effect at your next renewal.'}{' '}
                Yearly cost: {formatCents(getAnnualAmount(target.slug, target.interval))}.
              </Text>
            )}

            {changeError && (
              <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
                {changeError}
              </Alert>
            )}

            <Group justify="flex-end">
              <Button variant="default" onClick={closeChange}>
                Keep Current Plan
              </Button>
              <Button
                onClick={confirmChange}
                loading={changing}
                disabled={previewLoading || Boolean(changeError && !preview)}
              >
                Confirm
              </Button>
            </Group>
          </Stack>
        )}
      </Modal>

      <Modal opened={cancelOpened} onClose={closeCancel} title="Cancel Membership" centered>
        <Stack gap="md">
          <Text size="sm">
            Are you sure you want to cancel your {tier.name} membership?{' '}
            {membershipStatus === 'active'
              ? "You'll keep your benefits until the end of your current billing period."
              : 'You will lose access to your member benefits immediately.'}
          </Text>
          <Text size="sm" c="dimmed">
            If you have any questions or feedback, feel free to reach out to us at{' '}
            <a href="mailto:kbenson@mindfulnesscsu.org">kbenson@mindfulnesscsu.org</a>.
          </Text>

          {cancelError && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
              {cancelError}
            </Alert>
          )}

          <Group justify="flex-end">
            <Button variant="default" onClick={closeCancel}>
              Keep Membership
            </Button>
            <Button color="red" onClick={handleCancel} loading={cancelling}>
              Confirm Cancellation
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}
