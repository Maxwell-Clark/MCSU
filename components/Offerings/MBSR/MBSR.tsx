'use client';

import { useState } from 'react';
import {
  Title,
  SimpleGrid,
  Text,
  Container,
  Card,
  rem,
  Button,
  List,
  useMantineTheme,
  Overlay,
  Modal,
  ScrollArea,
  Divider,
} from '@mantine/core';
import {
  IconLicense,
  IconBrain,
  IconMan,
  IconFirstAidKit,
  IconMicroscope,
  IconHeart,
} from '@tabler/icons-react';
import classes from './MBSR.module.css';

interface FeatureItem {
  title: string;
  description: string;
  icon: any;
  list?: string[];
}

const mockdata: FeatureItem[] = [
  {
    title: 'Body Scan Meditation',
    description: 'A guided practice where participants focus attention sequentially on different parts of the body, observing sensations without judgment to enhance body awareness and relaxation.',
    icon: IconMan,
  },
  {
    title: 'Sitting Meditation',
    description: 'Focused attention on the breath, bodily sensations, sounds, or thoughts, fostering non-reactive awareness. It often starts with breath awareness and may expand to open monitoring of all experiences.',
    icon: IconBrain,
  },
  {
    title: 'Mindful Yoga',
    description: 'Gentle yoga poses performed with deliberate attention to movement, breath, and bodily sensations, promoting flexibility, strength, and mindfulness in motion.',
    icon: IconFirstAidKit,
  },
  {
    title: 'Walking Meditation',
    description: 'Slow, intentional walking while focusing on the sensations of each step, such as foot placement or weight shifts, to integrate mindfulness into daily movement.',
    icon: IconLicense,
  },
  {
    title: 'Mindful Awareness of Thoughts and Emotions',
    description: 'Observing thoughts and feelings as passing mental events rather than facts, often using techniques like labeling thoughts or noting their impermanence.',
    icon: IconHeart,
  },
  {
    title: 'Informal Mindfulness Practices',
    description: 'Integrating mindfulness into daily activities, such as mindful eating, listening, or routine tasks, to cultivate ongoing awareness outside formal meditation.',
    icon: IconMicroscope,
  },
];

export function MBSR() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
      {feature.list && (
        <List size="sm" spacing="xs" mt="md">
          {feature.list.map((item) => (
            <List.Item key={item}>
              <Text size="sm" c="dimmed">{item}</Text>
            </List.Item>
          ))}
        </List>
      )}
    </Card>
  ));

  return (
    <>
      <div className={classes.wrapper}>
        <Overlay color={theme.colors.blue[7]} opacity={0.85} zIndex={1} />

        <div className={classes.inner}>
          <Title className={classes.title}>
            Discover the Benefits of{' '}
            <Text component="span" inherit className={classes.highlight}>
              Mindfulness-Based Stress Reduction
            </Text>
          </Title>

          <Container size={640}>
            <Text size="lg" className={classes.description}>
              MBSR is an eight-week program developed by Jon Kabat-Zinn that uses mindfulness and group learning to help individuals manage stress, pain, and emotional challenges.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button
              className={classes.control}
              variant="white"
              gradient={{ from: 'blue', to: 'blue' }}
              size="lg"
              component="a"
              href="/offerings"
            >
              Join Us
            </Button>
            <Button 
              className={classes.control} 
              variant="white" 
              gradient={{ from: 'blue', to: 'blue' }} 
              size="lg"
              onClick={() => setOpened(true)}
              ml="md"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        size="100%"
        centered
      >
        <ScrollArea h={400}>
          <Text ta="center" size="xl" fw={700} mb="xl">
            Research on MBSR
          </Text>
          <Text size="md">
            Research demonstrates that MBSR, an eight-week program combining mindfulness meditation, body awareness, and yoga, effectively reduces stress by lowering cortisol levels, as evidenced by studies like those published in Psychoneuroendocrinology (2013), which found decreased stress reactivity in participants. It improves mental health outcomes, with meta-analyses (e.g., JAMA Internal Medicine, 2014) showing moderate to large effect sizes in reducing anxiety, depression, and psychological distress in diverse populations, including those with chronic illnesses. MBSR enhances emotional regulation and cognitive function, with neuroimaging studies (e.g., Frontiers in Human Neuroscience, 2015) indicating increased gray matter density in brain regions like the hippocampus, linked to learning and memory, and reduced amygdala activity, associated with lower emotional reactivity. Physically, MBSR has been shown to alleviate chronic pain, improve sleep quality, and boost immune function, as seen in trials involving cancer patients (Journal of Clinical Oncology, 2010).
          </Text>
          <Divider mt="md" />
          <Text mt="md" size="md">
            MBSR is supported by hundreds of studies. In one study, adding MBSR to cardiac rehab reduced mortality by 41% over two years (Linden, 1996). It also shows strong outcomes for anxiety, depression (Khoury, 2013), and chronic pain (Anheyer et al., 2017). 
          </Text>
          <Divider mt="md" />
          <Text mt="md" size="md">
            Both Dr. David Tate and Kirk Benson are trained to teach MBSR. <br />  Dr. Tate wrote is Ph.D. dissertation on his research into the effect of MBSR and was taught MBSR principles by Jon Kabat-Zinn. <br /> Kirk Benson received his training at Brown University.
          </Text>
        </ScrollArea>
      </Modal>

      <Container className={classes.content}>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl">
          {features}
        </SimpleGrid>
      </Container>
    </>
  );
}

