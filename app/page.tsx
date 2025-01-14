import { LandingBanner } from '../components/Landing/LandingBanner/LandingBanner';
import { LandingFeatures } from '../components/Landing/LandingFeatures/LandingFeatures';
import { LandingFAQ } from '../components/Landing/LandingFAQ/LandingFAQ';
import { LandingOfferings } from '../components/Landing/LandingOfferings/LandingOfferings';
import { LandingHero } from '../components/Landing/LandingHero/LandingHero';
import '@mantine/carousel/styles.css';
import '@mantine/dates/styles.css';

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <LandingFeatures />
      <LandingOfferings />
      <LandingFAQ />
      <LandingBanner />
    </>
  );
}
