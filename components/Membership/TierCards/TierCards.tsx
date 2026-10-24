'use client';

import type { ReactNode } from 'react';
import { IconCheck } from '@tabler/icons-react';
import { TIERS, type BillingInterval, type TierData } from '@/lib/membership-tiers';
import classes from './TierCards.module.css';

interface TierCardsProps {
  /** Which price to show first; the other is shown beneath it */
  interval?: BillingInterval;
  /** Marks the member's current tier */
  currentSlug?: string | null;
  renderAction: (tier: TierData) => ReactNode;
}

export function TierCards({ interval = 'month', currentSlug, renderAction }: TierCardsProps) {
  return (
    <div className={classes.tiersGrid}>
      {TIERS.map((tier) => {
        const isCurrent = tier.slug === currentSlug;
        const badge = isCurrent
          ? 'Your Tier'
          : tier.featured && !currentSlug
            ? 'Most Popular'
            : null;
        const cardClass = isCurrent
          ? classes.tierCardCurrent
          : tier.featured && !currentSlug
            ? classes.tierCardFeatured
            : '';

        return (
          <div
            key={tier.slug}
            className={`${classes.tierCard} ${cardClass}`}
            role="region"
            aria-label={`${tier.name} membership tier`}
          >
            {badge && <div className={classes.featuredBadge}>{badge}</div>}

            <div className={classes.tierName}>{tier.name}</div>
            <div className={classes.tierTagline}>{tier.tagline}</div>

            <div className={classes.tierPriceBlock}>
              <div className={classes.tierPrice}>
                {interval === 'month' ? tier.monthlyPrice : tier.yearlyPrice}
              </div>
              <div className={classes.tierPriceAlt}>
                {interval === 'month' ? tier.yearlyPrice : tier.monthlyPrice}
              </div>
            </div>

            {tier.prefix && <div className={classes.tierPrefix}>{tier.prefix}</div>}
            <ul className={classes.benefitsList}>
              {tier.benefits.map((benefit) => (
                <li key={benefit} className={classes.benefitItem}>
                  <IconCheck size={20} className={classes.benefitIcon} aria-hidden="true" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {renderAction(tier)}
          </div>
        );
      })}
    </div>
  );
}
