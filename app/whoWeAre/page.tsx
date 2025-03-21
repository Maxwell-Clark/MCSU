import { WWALeadership } from '@/components/WWALeadership/WWALeadership';
import { WWAOverview } from '@/components/WWAOverview/WWAOverview'
import { WWABoard } from '@/components/WWABoard/WWABoard';
export default function WhoWeArePage() {
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
    <div id='overview'>
    <WWAOverview />
    </div>
    <div id='leadership'>
      <WWALeadership />
    </div>
    <div id='board'>
      <WWABoard />
    </div>
    </>
  );
}
