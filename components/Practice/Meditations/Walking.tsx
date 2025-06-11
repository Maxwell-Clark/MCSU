import { MindfulnessSection } from './MindfulnessSection';
const WalkingSections = [
  {
    label: 'Postures and Directions',
    points: [
      { title: 'Postures', description: `Mindfulness is taught in four body postures: sitting, lying down, standing up, and walking. Mindfulness is not dependent on a particular posture but can be practiced in any posture. Mindful walking is the most common moving practice and has been practiced for thousands of years. If there is difficulty walking, then one can creatively find mindful movements in another posture.` },
      { title: 'Directions', description: `Stand with your weight evenly distributed between both feet, with the knees slightly bent and soft, and the upper body straight yet relaxed. The gaze is soft and directed toward the ground about 5 to 8 feet in front of you. Bring your awareness to the soles of the feet and notice the weight of your body in the heels, the balls of the feet, and the toes. Then begin to walk in a three step sequence: lift – swing – place. First with the left foot and then with the right foot. In the beginning it can be helpful to silently name each part of the sequence as we walk.` }
    ],
  },
  {
    label: 'Attention & Awareness',
    points: [
      { title: 'Attention', description: `Practicing walking meditation we simply bring our attention to the experience and sensation of walking. Rather than planning or revisiting past experiences, our attention is in the present moment, step by step. We notice the sensations of the soles of our feet pressing into the earth, muscles lifting the leg, balance, etc.` },
      { title: 'Focused Awareness', description: `Generally, walking meditation is a focused awareness practice, i.e., focused attention on the movements of each step, step by step. However, with practice one can also practice walking meditation with an open awareness approach.`  },
],
},
  {
    label: 'Wandering Mind, Distance, & Speed',
    points: [
      {
        title: 'Wandering Mind', 
        description: `The mind naturally wanders, and when you become aware that your mind has wandered (a moment of mindfulness), just kindly, without judgement, bring the mind back to the sensations of walking.`
      },{
   title: 'Distance',
    description: `You aren’t walking to get anywhere, so walk 15 to 20 feet and then turning around and walk back to the starting point. Of course, you can do walking meditation any time you are walking during the day – you may actually get somewhere, but that isn’t the object.`
  },
      {
        title: 'Speed',
        description: `Often walking meditation is done slowly, but there is no perfect speed (other than sufficient speed to maintain your balance). Experiment with different speeds and change speeds to bring variety into your practice.`
      }

    ]
  },
 ];

export function Walking() {
  return (
    <MindfulnessSection
      title="Mindful Walking"
      sections={WalkingSections}
    />
  );
}

