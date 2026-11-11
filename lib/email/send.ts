import { Resend } from 'resend';
import { logger } from '@/lib/logger';

const DEFAULT_FROM = 'Mindfulness Center of Southern Utah <noreply@notifications.mindfulnesscsu.org>';

let client: Resend | null = null;

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  client ??= new Resend(apiKey);
  return client;
}

export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text: string;
  /**
   * Resend drops repeat sends with the same key for 24 hours, so a retried Stripe
   * webhook doesn't email the same person twice.
   */
  idempotencyKey: string;
}

/**
 * Sends a transactional email. Never throws: a failed email is logged, and the caller
 * (usually the Stripe webhook) carries on, so a mail outage can't block payments syncing.
 */
export async function sendEmail(message: EmailMessage): Promise<boolean> {
  const resend = getResend();
  if (!resend) {
    logger.warn('RESEND_API_KEY not set; email skipped', {
      action: 'email_send',
      subject: message.subject,
    });
    return false;
  }

  try {
    const { error } = await resend.emails.send(
      {
        from: process.env.EMAIL_FROM || DEFAULT_FROM,
        to: message.to,
        subject: message.subject,
        html: message.html,
        text: message.text,
      },
      { idempotencyKey: message.idempotencyKey }
    );
    if (error) {
      logger.error('Email send failed', {
        action: 'email_send',
        subject: message.subject,
        reason: error.message,
      });
      return false;
    }
    return true;
  } catch (error) {
    logger.error('Email send failed', { action: 'email_send', subject: message.subject }, error);
    return false;
  }
}
