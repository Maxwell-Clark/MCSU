import { AttitudesGrid } from '../components/Landing/AttitudesGrid/AttitudesGrid';
import { Disclaimer } from '../components/Landing/Disclaimer/Disclaimer';
import { LandingFAQ } from '../components/Landing/LandingFAQ/LandingFAQ';
import { LandingHero } from '../components/Landing/LandingHero/LandingHero';
import { TrainingBrain } from '../components/Landing/TrainingBrain/TrainingBrain';
import { OpeningHeart } from '../components/Landing/OpeningHeart/OpeningHeart';
import { WWAFacilities } from '@/components/WWAFacilities/WWAFacilities';
import '@mantine/carousel/styles.css';

export default function HomePage() {
  return (
    <>
      <LandingHero />
      <Disclaimer />
      <div id="training-brain">
        <TrainingBrain />
      </div>
      <OpeningHeart />
      <AttitudesGrid />
      <LandingFAQ />
      <WWAFacilities />
    </>
  );
}
