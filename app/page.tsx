import { AttitudesGrid } from '../components/Landing/AttitudesGrid/AttitudesGrid';
import { LandingFAQ } from '../components/Landing/LandingFAQ/LandingFAQ';
import { LandingHero } from '../components/Landing/LandingHero/LandingHero';
import { TrainingBrain } from '../components/Landing/TrainingBrain/TrainingBrain';
import { OpeningHeart } from '../components/Landing/OpeningHeart/OpeningHeart';
import '@mantine/carousel/styles.css';

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <TrainingBrain />
      <OpeningHeart />
      <AttitudesGrid />
      <LandingFAQ />
    </>
  );
}
