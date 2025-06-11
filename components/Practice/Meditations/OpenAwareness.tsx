import { MindfulnessSection } from './MindfulnessSection';

const openAwarenessSections = [
  {
    label: 'Settling In',
    points: [
      {
        title: 'Posture',
        description: `Find a relaxed, comfortable position. You could be seated on a chair or on the floor on a cushion. Try to keep your back upright, but not too tight. Hands resting wherever they’re comfortable. Tongue on the roof of your mouth or wherever it’s comfortable.`
      },
      {
        title: 'Check in with Your Body',
        description: `Notice and invite your body to relax. Let yourself relax and become curious about your body seated here—the sensations it experiences, the touch, the connection with the floor or the chair. Do your best to relax any areas of tightness or tension. Breathe.`
      },
      {
        title: 'Natural Rhythm',
        description: `Tune into the rhythm of your breath. You can feel the natural flow of breath—in, out. You don’t need to do anything to your breath. Not long, not short, but natural. See if you can feel the sensations of breath, one breath at a time. When one breath ends, the next breath begins.`
      },
    ],
  },
  {
    label: 'Transitioning into Open Awareness',
    points: [
      {
        title: 'Bring Attention to Your Anchor',
        description: `Begin the practice with focused awareness to help settle the mind and body by bringing your attention to your anchor, whether it is a point in the breath cycle or some other anchor of your choosing. Breathe into your anchor, settling into the meditation.`
      },
      {
        title: 'Begin the Open Awareness Practice',
        description: `After settling into your meditation, rather than returning your mind to your anchor when it wanders, allow your mind to focus on whatever arises to the level of your consciousness. This practice is choiceless—you are not selecting the object of attention. Notice what arises and passes without becoming entangled.`
      },
    ]
  },
  {
    label: 'Support & Self-Kindness',
    points: [
      {
        title: 'Getting Lost',
        description: `If you find the open practice uncomfortable, or you get lost or entangled in thought, just return to your anchor to get stabilized. After a few breaths, return to open awareness when you're ready. Return as many times as needed—this is all part of the practice.`
      },
      {
        title: 'End of Practice',
        description: `When you feel it's time to end your open awareness session, return to your anchor for a few breaths. This helps settle the mind and body to transition out of practice.`
      },
      {
        title: 'Self-Compassion',
        description: `Always practice with kindness. No great thing is created suddenly. Allow time. Give your best and always be kind to yourself in the process.`
      }
    ]
  }
];

export function OpenAwareness() {
  return (
    <MindfulnessSection
      title="Open Awareness Meditation"
      sections={openAwarenessSections}
    />
  );
}

