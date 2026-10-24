import { Community } from '@/components/Partner/Community/Community';
import { Individual } from '@/components/Partner/Individual/Individual';
import { Civic } from '@/components/Partner/Civic/Civic';
import { Business } from '@/components/Partner/Business/Business';
import { Tiered } from '@/components/Partner/Tiered/Tiered';

export default function PartnerWithUs() {
  return (
    <>
    <div id='tiered'>
    <Tiered />
    </div>
    <div id='community'>
    <Community />
    </div>
    {/* <div id='individual'>
      <Individual />
    </div>
    <div id='civic'>
      <Civic />
    </div> */}
    <div id='business'>
      <Business />
    </div>
    </>
  );
}
