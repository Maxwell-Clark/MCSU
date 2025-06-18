import { MindfulnessSection } from './MindfulnessSection';
const breathingSections = [
  {
    label: 'Posture & Relaxation',
    points: [
      { title: 'Posture', description: `Find a relaxed, comfortable position. You could be seated on a chair or on the floor on a
cushion. Try to keep your back upright, but not too tight. Hands resting wherever they’re comfortable.
Tongue on the roof of your mouth or wherever it’s comfortable.` },
      { title: 'Check in with your body', description: `Notice and invite your body to relax. Let yourself relax and become curious
about your body seated here—the sensations it experiences, the touch, the connection with the floor or
the chair. Do your best to relax any areas of tightness or tension. Breathe.` },
      { title: 'Natural Rhythm', description: `Tune into the rhythm of your breath. You can feel the natural flow of breath—in, out.
You don’t need to do anything to your breath. Not long, not short, but natural. See if you can feel the
sensations of breath, one breath at a time. When one breath ends, the next breath begins. If you are not
able to notice the breath in all areas of the body, that is OK. We are more connected to certain areas of
the body than others, at different times of the day.`}
    ],
  },
  {
    label: 'Anchor Points',
    points: [
      { title: 'Breath as Anchor', description: `Notice where you feel your breath in your body most vividly. It might be
in your abdomen. It may be in your chest or throat or in your nostrils. Focus on that point where you
feel your breath most vividly as your anchor point, and that point to which you can return over and over
again. It can be anywhere in the breath cycle from the nostrils to the belly rising and falling.` },
      { title: 'Alternative Anchors', description: `Use hands, feet, or sound as your focus if breath isn’t helpful.For some of us, when we first start meditating, the breath isn’t a good anchor. It could be one shares space with asthma, or one may have had a traumatic experience
involving the breath earlier in life. You don’t need to use breath as your anchor. Choose another
anchor, e.g., feet, hands, whole body, or sound outside the body will work equally as well.`  },
],
},
  {
    label: 'Wandering Mind & Core Practice',
    points: [
      {
        title: 'Wandering Mind', 
        description: `Now as you focus on your anchor, you might notice that your mind may start to wander. You may start thinking about other things. If this happens, it is not a problem. It's very natural. Try to notice that your mind has wandered. You can say “thinking” or “wandering” in your head softly. And then gently redirect your attention right back to your anchor.`
      },{
   title: 'Core Practice',
    description: `When the mind wanders, with great kindness, we return to the anchor. The core of this practice is becoming aware that the mind has wandered, and then gently returning to the anchor. The awareness of wandering and then returning is the key that develops concentration and trains the mind.`
  }

    ]
  },
 ];

export function MindfulnessOfBreathing() {
  return (
    <MindfulnessSection
      title="Mindfulness of Breathing"
      sections={breathingSections}
    />
  );
}

