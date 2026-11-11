import type { TierData } from '@/lib/membership-tiers';

const ORG_NAME = 'Mindfulness Center of Southern Utah';
const CONTACT_EMAIL = 'kbenson@mindfulnesscsu.org';

export interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function formatUsd(cents: number): string {
  const dollars = cents / 100;
  return `$${dollars.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(dollars) ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Denver',
  });
}

function firstNameOf(name?: string | null): string | null {
  const first = name?.trim().split(/\s+/)[0];
  return first || null;
}

/** Shared HTML shell: inline styles only, since many email clients strip <style>. */
function layout(bodyHtml: string, siteUrl: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f3ef;font-family:Georgia,'Times New Roman',serif;color:#2f2f2f;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f3ef;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:8px;padding:32px;">
            <tr>
              <td style="font-size:16px;line-height:1.6;">
                ${bodyHtml}
              </td>
            </tr>
          </table>
          <p style="max-width:560px;font-size:12px;line-height:1.5;color:#777777;margin:16px auto 0;">
            ${ORG_NAME} · <a href="${siteUrl}" style="color:#777777;">${siteUrl.replace(/^https?:\/\//, '')}</a><br />
            This mailbox isn't monitored. Questions? Email
            <a href="mailto:${CONTACT_EMAIL}" style="color:#777777;">${CONTACT_EMAIL}</a>.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function button(href: string, label: string): string {
  return `<p style="margin:28px 0;"><a href="${href}" style="background:#4a6b5d;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:6px;font-family:Arial,sans-serif;font-size:15px;display:inline-block;">${escapeHtml(label)}</a></p>`;
}

const TEXT_FOOTER = `\n\n—\n${ORG_NAME}\nThis mailbox isn't monitored. Questions? Email ${CONTACT_EMAIL}.`;

export interface DonationEmailInput {
  name?: string | null;
  amountCents: number;
  date: Date;
  siteUrl: string;
}

export function donationThankYouEmail({
  name,
  amountCents,
  date,
  siteUrl,
}: DonationEmailInput): RenderedEmail {
  const first = firstNameOf(name);
  const amount = formatUsd(amountCents);
  const greeting = first ? `Dear ${first},` : 'Hello,';
  const receiptLines = [
    `Organization: ${ORG_NAME}`,
    `Amount: ${amount}`,
    `Date: ${formatDate(date)}`,
    ...(name ? [`Donor: ${name}`] : []),
  ];
  const acknowledgement =
    `The ${ORG_NAME} is a 501(c)(3) nonprofit organization. No goods or services were ` +
    'provided in exchange for this contribution. Please keep this email for your tax records.';

  const html = layout(
    `<h1 style="font-size:24px;font-weight:normal;margin:0 0 20px;">Thank you for your gift</h1>
     <p>${escapeHtml(greeting)}</p>
     <p>Thank you for your generous donation of <strong>${amount}</strong>. Your gift helps us bring mindfulness programs, resources, and community to Southern Utah.</p>
     <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;padding:16px;background:#f5f3ef;border-radius:6px;width:100%;font-size:15px;">
       ${receiptLines.map((line) => `<tr><td style="padding:2px 0;">${escapeHtml(line)}</td></tr>`).join('')}
     </table>
     <p style="font-size:14px;color:#555555;">${escapeHtml(acknowledgement)}</p>
     <p>With gratitude,<br />${ORG_NAME}</p>`,
    siteUrl
  );

  const text =
    `${greeting}\n\n` +
    `Thank you for your generous donation of ${amount}. Your gift helps us bring mindfulness ` +
    'programs, resources, and community to Southern Utah.\n\n' +
    `Donation receipt\n${receiptLines.join('\n')}\n\n` +
    `${acknowledgement}\n\nWith gratitude,\n${ORG_NAME}` +
    TEXT_FOOTER;

  return { subject: `Thank you for your ${amount} donation`, html, text };
}

export interface MembershipEmailInput {
  name?: string | null;
  tier: TierData;
  /** First charge, when known (from Checkout) */
  amountCents?: number | null;
  siteUrl: string;
}

export function membershipWelcomeEmail({
  name,
  tier,
  amountCents,
  siteUrl,
}: MembershipEmailInput): RenderedEmail {
  const first = firstNameOf(name);
  const greeting = first ? `Welcome, ${first}!` : 'Welcome!';
  const dashboardUrl = `${siteUrl}/membership/dashboard`;
  const benefits = tier.prefix ? [tier.prefix, ...tier.benefits] : tier.benefits;
  const charge =
    amountCents != null ? ` Your first payment of ${formatUsd(amountCents)} has been received.` : '';

  const html = layout(
    `<h1 style="font-size:24px;font-weight:normal;margin:0 0 20px;">${escapeHtml(greeting)}</h1>
     <p>Thank you for becoming a <strong>${escapeHtml(tier.name)}</strong> member of the ${ORG_NAME}.${escapeHtml(charge)}</p>
     <p style="margin-bottom:8px;">Your membership includes:</p>
     <ul style="margin-top:0;padding-left:20px;">
       ${benefits.map((b) => `<li style="margin:4px 0;">${escapeHtml(b)}</li>`).join('')}
     </ul>
     <p>You can view your plan, change it, update your payment method, or see past payments from your membership dashboard.</p>
     ${button(dashboardUrl, 'Go to my membership')}
     <p>We're glad you're here.<br />${ORG_NAME}</p>`,
    siteUrl
  );

  const text =
    `${greeting}\n\n` +
    `Thank you for becoming a ${tier.name} member of the ${ORG_NAME}.${charge}\n\n` +
    `Your membership includes:\n${benefits.map((b) => `- ${b}`).join('\n')}\n\n` +
    'You can view your plan, change it, update your payment method, or see past payments ' +
    `from your membership dashboard:\n${dashboardUrl}\n\n` +
    `We're glad you're here.\n${ORG_NAME}` +
    TEXT_FOOTER;

  return { subject: `Welcome to the ${ORG_NAME}`, html, text };
}
