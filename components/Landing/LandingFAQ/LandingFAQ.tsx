"use client";
import { Container, Title, Accordion, Text, List } from '@mantine/core';
import classes from './LandingFAQ.module.css';

const mindfulnessContent = (
  <>
    <Text size="sm" mb="md" className={classes.text}>
      <strong>Mindfulness:</strong> A mental state of being fully present and aware of the current moment, without judgment. It involves observing thoughts, feelings, and sensations as they arise, often in everyday activities (e.g., eating, walking, or listening). It can be practiced informally throughout the day or as a formal exercise.
    </Text>
    <List size="sm" mb="md">
      <List.Item><Text className={classes.text}><strong>Key traits:</strong> Awareness, non-judgment, focus on the present.</Text></List.Item>
      <List.Item><Text className={classes.text}><strong>Example:</strong> Noticing the taste and texture of food while eating, without distraction.</Text></List.Item>
    </List>
    <Text size="sm" mb="md" className={classes.text}>
      <strong>Meditation:</strong> A structured practice where you set aside time to focus the mind, often to achieve calmness, clarity, or insight. It typically involves specific techniques (e.g., focusing on breath, a mantra, or visualization) and is often done in a seated, quiet setting.
    </Text>
    <List size="sm" mb="md">
      <List.Item><Text className={classes.text}><strong>Key traits:</strong> Intentional, often time-bound, uses specific techniques.</Text></List.Item>
      <List.Item><Text className={classes.text}><strong>Example:</strong> Sitting for 10 minutes focusing on your breath to calm the mind.</Text></List.Item>
    </List>
    <Text size="sm" className={classes.text}>
      <strong>Overlap:</strong> Mindfulness can be a form of meditation (e.g., mindfulness meditation focuses on present-moment awareness). Meditation often cultivates mindfulness, but not all meditation is mindfulness-based (e.g., transcendental meditation uses mantras for different goals).
    </Text>
  </>
);

const distractionContent = (
  <>
    <Text size="sm" mb="md" className={classes.text}>
      Handling distractions or a wandering mind during meditation is a common challenge, even for experienced practitioners. All minds wander – it is natural and normal and really presents an opportunity for practice. Here are practical strategies to manage it:
    </Text>
    <List size="sm" spacing="md">
      <List.Item>
        <Text size="sm" className={classes.text}><strong>Acknowledge Without Judgment:</strong> When your mind wanders, don't criticize yourself. Simply notice the distraction (e.g., a thought, sound, or sensation) and gently label it (e.g., "thinking" or "noise"). This builds awareness without frustration.</Text>
      </List.Item>
      <List.Item>
        <Text size="sm" className={classes.text}><strong>Return to Your Anchor:</strong> Choose a focal point for your meditation, like your breath, a mantra, or a part of your body like the hands or feet. When you notice your mind drifting, calmly bring your attention back to this anchor.</Text>
      </List.Item>
      <List.Item>
        <Text size="sm" className={classes.text}><strong>Reframe Distractions as Practice:</strong> View distractions as opportunities to strengthen your focus. Notice the thoughts as they arise, stay for a while and then pass away. After noticing the passing thoughts, just redirect your attention back to your anchor. Each time you redirect attention back to your anchor, you're training your mind, like exercising a muscle.</Text>
      </List.Item>
    </List>
  </>
);

const durationContent = (
  <>
    <Text size="sm" mb="md" className={classes.text}>
      The time needed to see meditation benefits varies based on individual goals, consistency, and practice type, but research and practical experience provide some guidance. An important note is that consistency may be more important than duration.
    </Text>
    <List size="sm" spacing="md">
      <List.Item>
        <Text size="sm" className={classes.text}>
          <strong>Minimum Effective Duration:</strong> Studies suggest as little as 10-20 minutes per day can yield measurable benefits, such as reduced stress, improved focus, and better emotional regulation, within 4-8 weeks of consistent practice. For example, a 2018 study in Behavioural Brain Research found that 13 minutes of daily mindfulness meditation for 8 weeks improved attention and reduced anxiety in beginners.
        </Text>
      </List.Item>
      <List.Item>
        <Text size="sm" className={classes.text}>
          <strong>Beginner Recommendations:</strong> If you're new to meditation, start with 5-10 minutes daily. This is manageable and helps build a habit. Gradually increase to 15-20 minutes as you feel comfortable. Short, consistent sessions are more effective than infrequent, longer ones.
        </Text>
      </List.Item>
      <List.Item>
        <Text size="sm" className={classes.text}>
          <strong>Specific Goals and Timeframes:</strong>
        </Text>
        <List withPadding size="sm" mt="xs">
          <List.Item>
            <Text size="sm" className={classes.text}>
              <strong>Stress Reduction:</strong> 10-15 minutes daily of mindfulness or guided meditation can lower cortisol levels in 2-4 weeks, per a 2013 study in Psychoneuroendocrinology.
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm" className={classes.text}>
              <strong>Improved Focus:</strong> 10-20 minutes of focused attention meditation (e.g., breath awareness) for 4-6 weeks can enhance concentration, as shown in a 2011 Psychological Science study.
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm" className={classes.text}>
              <strong>Emotional Resilience:</strong> Practices like loving-kindness meditation for 20 minutes daily can boost positive emotions and reduce depressive symptoms in 6-8 weeks, according to a 2008 Journal of Personality and Social Psychology study.
            </Text>
          </List.Item>
        </List>
      </List.Item>
    </List>
  </>
);

const stressContent = (
  <>
    <Text size="sm" mb="md" className={classes.text}>
      Yes, mindfulness can significantly reduce stress and anxiety. Here's a concise overview based on evidence and practical insights:
    </Text>
    <List size="sm" spacing="md">
      <List.Item>
        <Text size="sm" className={classes.text}>
          <strong>How It Works:</strong> Mindfulness involves focusing on the present moment without judgment, which helps break cycles of worry and rumination. By observing thoughts and sensations calmly, you activate the parasympathetic nervous system, reducing stress hormones like cortisol.
        </Text>
      </List.Item>
      <List.Item>
        <Text size="sm" className={classes.text}>
          <strong>Evidence:</strong>
        </Text>
        <List withPadding size="sm" mt="xs">
          <List.Item>
            <Text size="sm" className={classes.text}>
              A 2013 study in Psychoneuroendocrinology found that 10-15 minutes of daily mindfulness meditation lowered cortisol levels in stressed individuals after 4 weeks.
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm" className={classes.text}>
              A 2014 meta-analysis in JAMA Internal Medicine showed mindfulness-based interventions reduced anxiety symptoms by 20-30% in clinical populations after 8 weeks.
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm" className={classes.text}>
              A 2018 study in Behavioural Brain Research reported that 13 minutes of daily mindfulness practice for 8 weeks decreased anxiety and improved mood in non-clinical groups.
            </Text>
          </List.Item>
        </List>
      </List.Item>
      <List.Item>
        <Text size="sm" className={classes.text}>
          <strong>Practical Benefits:</strong>
        </Text>
        <List withPadding size="sm" mt="xs">
          <List.Item>
            <Text size="sm" className={classes.text}>
              <strong>Stress Reduction:</strong> Mindfulness helps you respond to stressors calmly rather than reacting impulsively, e.g., by focusing on your breath during a tense moment.
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm" className={classes.text}>
              <strong>Anxiety Management:</strong> It reduces overthinking and catastrophic thoughts by grounding you in the present, e.g., noticing body sensations instead of spiraling worries.
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm" className={classes.text}>
              <strong>Emotional Regulation:</strong> Regular practice enhances awareness of emotional triggers, helping you manage anxiety before it escalates.
            </Text>
          </List.Item>
        </List>
      </List.Item>
    </List>
  </>
);

const toolsContent = (
  <>
    <Text size="sm" mb="md" className={classes.text}>
      No, you don't need any special tools or equipment to practice mindfulness. It's a mental practice that relies on your attention and awareness, making it accessible anywhere, anytime. Here's a quick breakdown:
    </Text>
    <List size="sm" spacing="md">
      <List.Item>
        <Text size="sm" className={classes.text}>
          <strong>Essentials:</strong> All you need is your mind and a willingness to focus on the present moment. You can practice mindfulness while sitting, standing, walking, or even lying down, using your breath, body sensations, or surroundings as a focal point.
        </Text>
      </List.Item>
      <List.Item>
        <Text size="sm" className={classes.text}>
          <strong>No Cost Necessary:</strong> Mindfulness is inherently free. You don't need expensive apps, classes, or gear. For example, you can practice by focusing on your breath for 5 minutes daily, as mentioned in your earlier questions about meditation benefits.
        </Text>
      </List.Item>
      <List.Item>
        <Text size="sm" className={classes.text}>
          <strong>Portability:</strong> Since no tools are required, you can practice during daily activities (e.g., washing dishes mindfully by noticing the water's temperature) or in response to stress, aligning with your interest in reducing anxiety.
        </Text>
      </List.Item>
    </List>
  </>
);

export function LandingFAQ() {
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated" transitionDuration={400}>
        <Accordion.Item className={classes.item} value="mindfulness-meditation">
          <Accordion.Control>What is the difference between mindfulness and meditation?</Accordion.Control>
          <Accordion.Panel>{mindfulnessContent}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="distractions">
          <Accordion.Control>How do I handle distractions or a wandering mind during meditation?</Accordion.Control>
          <Accordion.Panel>{distractionContent}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="duration">
          <Accordion.Control>How long should I meditate to see benefits?</Accordion.Control>
          <Accordion.Panel>{durationContent}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="stress">
          <Accordion.Control>Can mindfulness help reduce stress and anxiety?</Accordion.Control>
          <Accordion.Panel>{stressContent}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="tools">
          <Accordion.Control>Do I need any special tools or equipment to practice mindfulness?</Accordion.Control>
          <Accordion.Panel>{toolsContent}</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}