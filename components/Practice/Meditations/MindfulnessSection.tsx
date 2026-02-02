'use client';

import {
  Box,
  Accordion,
  ScrollArea,
  Text,
  Title,
  Flex,
  Modal,
} from '@mantine/core';
import { useState } from 'react';
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
  const [modalOpened, setModalOpened] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  const openModal = (point: Point) => {
    setSelectedPoint(point);
    setModalOpened(true);
  };

  const renderCardList = (points: Point[]) => (
    <ScrollArea h={300}>
      <Flex wrap="wrap" justify="center" gap="md">
        {points.map((point, idx) => (
          <Box
            key={idx}
            className={classes.card}
            style={{ width: '40%', minWidth: '250px' }}
            onClick={() => openModal(point)}
          >
            <Title order={4} mb={4} className={classes.cardTitle}>{point.title}</Title>
            <Text size="sm" className={classes.cardDescription} lineClamp={4}>
              {point.description}
            </Text>
          </Box>
        ))}
      </Flex>
    </ScrollArea>
  );

  return (
    <Box mx="auto" w="80%">
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
            <Accordion.Panel>{renderCardList(section.points)}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title={
          <Title order={3} className={classes.modalTitle}>
            {selectedPoint?.title}
          </Title>
        }
        size="lg"
        centered
        radius="lg"
        overlayProps={{
          blur: 8,
          opacity: 0.5,
        }}
        transitionProps={{
          transition: 'fade',
          duration: 250,
          timingFunction: 'ease',
        }}
        styles={{
          content: {
            padding: '2rem',
            maxWidth: '720px',
            margin: '0 auto',
            borderRadius: '1.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
          },
          body: {
            maxHeight: '400px',
            overflowY: 'auto',
          },
        }}
      >
        <Text size="md" className={classes.modalContent}>
          {selectedPoint?.description}
        </Text>
      </Modal>
    </Box>
  );
}
