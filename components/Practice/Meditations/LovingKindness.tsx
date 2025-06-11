import { MindfulnessSection } from './MindfulnessSection';

const lovingKindnessSections = [
  {
    label: 'Beginning the Practice',
    points: [
      {
        title: 'Preparation',
        description: `Come to your meditative posture. Connect with the body and the breath, settle into the meditation. Check in with the heart to identify any sensations available.`
      },
      {
        title: 'Visualize a Loved One',
        description: `Bring to mind a loved one – this could be a benefactor, a family member, or a pet – just someone with whom you feel a warm loving connection. Allow the image to be as clear and distinct as possible.`
      }
    ]
  },
  {
    label: 'Loving-Kindness Phrases',
    points: [
      {
        title: 'Phrases for a Loved One',
        description: `With the image of the loved one clearly visible in your mind, begin to repeat to yourself three or four loving-kindness phrases. Examples include:
• May you be happy  
• May you be peaceful  
• May you be free from suffering  
• May you be safe from inner and outer harm  
• May you be healthy and strong  
• May you be peaceful and free from worry  
• May you live your life with ease  
These phrases can be modified as you desire so that you feel comfortable and at peace.`
      }
    ]
  },
  {
    label: 'Turning Inward',
    points: [
      {
        title: 'Visualize Yourself',
        description: `Bring to mind an image of yourself. The image can be as you see yourself today, or it can be an image of yourself as a child.`
      },
      {
        title: 'Repeat Phrases to Yourself',
        description: `Repeat the phrases you have chosen, substituting “I” for “you.”`
      }
    ]
  },
  {
    label: 'Expanding the Circle',
    points: [
      {
        title: 'Expanded Visualization',
        description: `You may continue by visualizing:
• Someone with whom you have a neutral relationship  
• Someone with whom you would like an improved relationship  
• A larger group or even all sentient beings  
Repeat your loving-kindness phrases for each.`
      }
    ]
  },
  {
    label: 'Flexibility in Practice',
    points: [
      {
        title: 'Be Flexible',
        description: `There is much flexibility in a loving-kindness meditation, both in the number and types of visualizations and in the phrases that are used.`
      }
    ]
  }
];

export function LovingKindness() {
  return (
    <MindfulnessSection
      title="Loving-Kindness Meditation"
      sections={lovingKindnessSections}
    />
  );
}

