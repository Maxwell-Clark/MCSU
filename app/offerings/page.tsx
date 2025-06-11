import { MBSR } from '@/components/Offerings/MBSR/MBSR';
import { EveryDayMindfulness } from '@/components/Offerings/EveryDayMindfulness/EveryDayMindfulness';
import { ContactUs } from '@/components/ContactUs/ContactUs';
import { IntroToMindfulness } from '@/components/Offerings/IntroToMindfulness/IntroToMindfulness';
import { MondayMindfulness } from '@/components/Offerings/MondayMindfulness/MondayMindfulness';
export default function OfferingsPage() {
    const data = [
        {
          image:
            'https://images.unsplash.com/photo-1600880292291-06e8c48d286d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
          title: 'Meet Our CEO, Sarah Johnson',
          category: 'leadership',
        },
        {
          image:
            'https://images.unsplash.com/photo-1528763380143-df0cb04c31d4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
          title: 'Our Visionary CTO, Michael Lee',
          category: 'leadership',
        },
        {
          image:
            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
          title: 'Head of Operations, Emily Davis',
          category: 'leadership',
        },
        {
          image:
            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
          title: 'Marketing Director, David Wilson',
          category: 'leadership',
        },
        {
          image:
            'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
          title: 'Finance Lead, Jessica Miller',
          category: 'leadership',
        },
        {
          image:
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
          title: 'Head of HR, Chris Johnson',
          category: 'leadership',
        },
      ];
  return (
    <>
    <div id='intro'>
      <IntroToMindfulness />
    </div>
      <div id='mbsr'>
      <MBSR />
      </div>
      <div id='everyday'>
      <EveryDayMindfulness />
      </div>
      <div id='drop_in'>
      <MondayMindfulness />
      </div>
      <div id='contact'>
      <ContactUs />
      </div>
    </>
  );
}

