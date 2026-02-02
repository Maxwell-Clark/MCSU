import {
  IconBook,
  IconBrain,
  IconCalendar,
  IconLicense,
  IconMan,
  IconFirstAidKit,
  IconMicroscope,
  IconHeart,
  IconLungs,
  IconCloudDataConnection,
  IconSun,
  IconUsers,
  IconClock,
} from '@tabler/icons-react';
import { ComponentType } from 'react';

export interface ProgramFeature {
  title: string;
  description?: string;
  icon: ComponentType<any>;
  list?: string[];
}

export interface Program {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  color: string;
  icon: ComponentType<any>;
  features: ProgramFeature[];
  ctaText: string;
  learnMoreContent?: string;
}

export const programs: Program[] = [
  {
    id: 'intro',
    title: 'Introduction to Mindfulness',
    shortTitle: 'Intro',
    tagline: '6-Week Introduction Course',
    description:
      'This offering consists of one 90 minute class per week for six weeks. It is an introduction to mindfulness and follows the general design of MBSR, but isn\'t as rigorous in its homework requirements.',
    color: 'sage',
    icon: IconBook,
    features: [
      {
        title: 'Mindfulness Techniques',
        icon: IconBook,
        list: [
          'Body Scan',
          'Focused Awareness',
          'Mindful Movement (yoga or walking)',
          'Loving Kindness',
          'Open Awareness',
        ],
      },
      {
        title: 'Mindfulness Teachings',
        description:
          'The classes begin with a discussion of the body and its importance in helping us stay in the present moment. The classes also helps one understand the workings of the mind including our relationship to thoughts and emotions.',
        icon: IconBrain,
      },
      {
        title: 'Current Classes',
        description:
          'Currently the class is taught through the Institute for Continuing Learning, part of the continuing learning program associated with Utah Tech University. The course is taught twice in the fall and twice in the winter semesters. The class can also be taught virtually.',
        icon: IconCalendar,
      },
    ],
    ctaText: 'Join Us',
  },
  {
    id: 'mbsr',
    title: 'Mindfulness-Based Stress Reduction',
    shortTitle: 'MBSR',
    tagline: '8-Week Evidence-Based Program',
    description:
      'MBSR is an eight-week program developed by Jon Kabat-Zinn that uses mindfulness and group learning to help individuals manage stress, pain, and emotional challenges.',
    color: 'purple',
    icon: IconBrain,
    features: [
      {
        title: 'Body Scan Meditation',
        description:
          'A guided practice where participants focus attention sequentially on different parts of the body, observing sensations without judgment to enhance body awareness and relaxation.',
        icon: IconMan,
      },
      {
        title: 'Sitting Meditation',
        description:
          'Focused attention on the breath, bodily sensations, sounds, or thoughts, fostering non-reactive awareness. It often starts with breath awareness and may expand to open monitoring of all experiences.',
        icon: IconBrain,
      },
      {
        title: 'Mindful Yoga',
        description:
          'Gentle yoga poses performed with deliberate attention to movement, breath, and bodily sensations, promoting flexibility, strength, and mindfulness in motion.',
        icon: IconFirstAidKit,
      },
      {
        title: 'Walking Meditation',
        description:
          'Slow, intentional walking while focusing on the sensations of each step, such as foot placement or weight shifts, to integrate mindfulness into daily movement.',
        icon: IconLicense,
      },
      {
        title: 'Mindful Awareness of Thoughts and Emotions',
        description:
          'Observing thoughts and feelings as passing mental events rather than facts, often using techniques like labeling thoughts or noting their impermanence.',
        icon: IconHeart,
      },
      {
        title: 'Informal Mindfulness Practices',
        description:
          'Integrating mindfulness into daily activities, such as mindful eating, listening, or routine tasks, to cultivate ongoing awareness outside formal meditation.',
        icon: IconMicroscope,
      },
    ],
    ctaText: 'Join Us',
    learnMoreContent: `Research demonstrates that MBSR, an eight-week program combining mindfulness meditation, body awareness, and yoga, effectively reduces stress by lowering cortisol levels, as evidenced by studies like those published in Psychoneuroendocrinology (2013), which found decreased stress reactivity in participants. It improves mental health outcomes, with meta-analyses (e.g., JAMA Internal Medicine, 2014) showing moderate to large effect sizes in reducing anxiety, depression, and psychological distress in diverse populations, including those with chronic illnesses. MBSR enhances emotional regulation and cognitive function, with neuroimaging studies (e.g., Frontiers in Human Neuroscience, 2015) indicating increased gray matter density in brain regions like the hippocampus, linked to learning and memory, and reduced amygdala activity, associated with lower emotional reactivity. Physically, MBSR has been shown to alleviate chronic pain, improve sleep quality, and boost immune function, as seen in trials involving cancer patients (Journal of Clinical Oncology, 2010).

MBSR is supported by hundreds of studies. In one study, adding MBSR to cardiac rehab reduced mortality by 41% over two years (Linden, 1996). It also shows strong outcomes for anxiety, depression (Khoury, 2013), and chronic pain (Anheyer et al., 2017).

Both Dr. David Tate and Kirk Benson are trained to teach MBSR. Dr. Tate wrote his Ph.D. dissertation on his research into the effect of MBSR and was taught MBSR principles by Jon Kabat-Zinn. Kirk Benson received his training at Brown University.`,
  },
  {
    id: 'everyday',
    title: 'Everyday Mindfulness',
    shortTitle: 'Everyday',
    tagline: 'Daily Practices for Well-being',
    description:
      'Everyday mindfulness practices help reduce stress, enhance well-being, and bring more joy to your daily life.',
    color: 'teal',
    icon: IconSun,
    features: [
      {
        title: 'Mindful Breathing',
        description:
          'Take moments throughout the day to focus on your breath, grounding yourself in the present moment and calming your mind.',
        icon: IconLungs,
      },
      {
        title: 'Connection with Nature',
        description:
          'Spend time outdoors and observe the sights, sounds, and smells around you. Nature offers a unique way to reconnect and reduce stress.',
        icon: IconCloudDataConnection,
      },
      {
        title: 'Daily Meditation',
        description:
          'Start or end your day with a few minutes of meditation. It can improve your focus, reduce anxiety, and foster inner peace.',
        icon: IconCalendar,
      },
      {
        title: 'Gratitude Practice',
        description:
          'Take time to acknowledge the positive aspects of your day. Practicing gratitude can shift your perspective and improve well-being.',
        icon: IconHeart,
      },
      {
        title: 'Mindful Awareness',
        description:
          'Observe your thoughts and emotions without judgment. Recognize them as passing experiences, helping you respond more calmly.',
        icon: IconSun,
      },
    ],
    ctaText: 'Explore Practices',
  },
  {
    id: 'drop-in',
    title: 'Drop-in Mindfulness',
    shortTitle: 'Drop-in',
    tagline: 'Weekly Community Practice',
    description:
      'Monday Mindfulness is led by Kirk Benson and Wake-up Wednesday is led by Dr. David B. Tate.',
    color: 'blue',
    icon: IconUsers,
    features: [
      {
        title: 'Weekly Virtual Session',
        description:
          "Monday Mindfulness is a 45 minute offering beginning at 8:00 pm each Monday evening. Join to receive our weekly news letter and an invitation to our virtual platform. Participation in the mindfulness session is completely voluntary, just drop in when you can.",
        icon: IconCalendar,
      },
      {
        title: 'Weekly In-person Session',
        description:
          "Wake-up Wednesday is an hour long offering beginning at 5:15 pm in the conference room of Dr. Tate's office. His address is 321 N. Mall Dr., Suite I-201, St. George, Utah. Just drop-in when you can.",
        icon: IconClock,
      },
      {
        title: 'Mindfulness Techniques',
        description:
          'In both drop-in sessions, you have an opportunity to practice different mindfulness techniques like focused or open awareness, body scans, loving-kindness, and other meditations. We also discuss a mindfulness related topic like how the mind works, fostering joy, relationships, how to interact with difficult emotions, and many more.',
        icon: IconBrain,
      },
      {
        title: 'Mindful Community',
        description:
          'We have the opportunity each week to practice together and hear the thoughts and feelings of other practitioners in our community. These classes help to build friendships and community.',
        icon: IconUsers,
      },
      {
        title: 'Personal Practice',
        description:
          'Each week a drop-in class can be a reminder to continue your personal practice. It is an opportunity to deepen and strengthen your personal practice.',
        icon: IconHeart,
      },
    ],
    ctaText: 'Join a Session',
  },
];

// Helper to get a program by ID
export function getProgramById(id: string): Program | undefined {
  return programs.find((p) => p.id === id);
}

// Helper to get program color
export function getProgramColor(programId: string): string {
  const program = getProgramById(programId);
  return program?.color || 'sage';
}
