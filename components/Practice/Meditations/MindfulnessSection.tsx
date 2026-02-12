'use client';

import {
  Accordion,
  Box,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import classes from './MindfulnessSection.module.css';

type Point = {
  title: string;
  description: string;
};

type Section = {
  label: string;
  points: Point[];
};

type MindfulnessSectionProps = {
  title: string;
  sections: Section[];
};

export function MindfulnessSection({ title, sections }: MindfulnessSectionProps) {
  return (
    <Box mx="auto" w="100%">
      <Title order={2} mb="md" ta="center" className={classes.title}>
        {title}
      </Title>

      <Accordion
        variant="separated"
        radius="lg"
        transitionDuration={300}
        classNames={{
          item: classes.accordionItem,
          control: classes.accordionControl,
        }}
      >
        {sections.map((section, idx) => (
          <Accordion.Item key={idx} value={section.label}>
            <Accordion.Control>
              <Title order={4} className={classes.title}>{section.label}</Title>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                {section.points.map((point, pidx) => (
                  <div key={pidx} className={classes.pointCard}>
                    <Text className={classes.pointTitle}>{point.title}</Text>
                    <Text className={classes.pointDescription}>{point.description}</Text>
                  </div>
                ))}
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
}
