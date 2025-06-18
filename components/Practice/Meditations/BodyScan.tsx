import { MindfulnessSection } from './MindfulnessSection';

const bodyScanSections = [
  {
    label: 'What & Why',
    points: [
      {
        title: 'What is a Body Scan?',
        description: 'In a body scan, we pay attention to different areas of the body one by one.'
      },
      {
        title: 'Practice Directing Your Attention',
        description: `During the body scan we frequently change the focus of
attention and so the practice allows us to notice where our attention lies and it allows us to
develop the ability to consciously shift our attention from one focus to another.`
      },
      {
        title: 'Focusing our attention',
        description: `After locating our attention on a particular area of the body, we can practice maintaining our attention on a specific body area. It strengthens our concentration.`
      },
      {
        title: 'Listening to Messages from the Body',
        description: `The body has much to teach us if we patiently listen`
      }
    ],
  },
  {
    label: 'Focusing our attention',
    points: [
      {
        title: 'Sensations',
        description: `Pay attention to the sensations or to the absence of sensations in the different parts of the body, one part at a time. Hot, cold, hard, soft, rough, smooth, tingling, tension, touch, or no sensations at all.`
      },
      {
        title: 'Pain',
        description: `We are learning how to deal with pain differently. We try to bring each part of our body into our awareness with kindness, even if we notice it is unpleasant. But if the pain is overwhelming, then skillfully take your attention to another part of the body, or to the breath.`
      },
      {
        title: 'Sleepiness',
        description: `It is easy to fall asleep during a body scan. It is normal and can be a healthy reaction if the body saying it needs rest. But if you are sleepy but don’t need additional rest, then opening your eyes or raising an arm or hand may be helpful.`
      }
    ],
  },
   {
    label: 'How to Practice a Body Scan',
    points: [
      {
        title: 'Body Position',
        description: `The body scan can be done in any position, standing, sitting, or lying down. It is commonly done in the lying down position on one’s back with feet falling apart, and arms at theside of the body, palms up.`
      },
      {
        title: 'Comfortable/Relaxed',
        description: `It is important to find a comfortable relaxed position, whether standing, sitting, or lying down.`
      },
      {
        title: 'Attention',
        description: `Allow attention to scan the body, one region at a time, and resting the attention on each new region. Pausing at each new region, becoming aware of any bodily sensations available.`
      }
    ],
  },

];

export function BodyScan() {
  return (
    <MindfulnessSection
      title="A Journey Through the Body – A Body Scan"
      sections={bodyScanSections}
    />
  );
}

