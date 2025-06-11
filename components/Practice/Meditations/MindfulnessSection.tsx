import {
  Box,
  Accordion,
  Card,
  ScrollArea,
  Text,
  Title,
  Flex,
  Modal,
} from '@mantine/core';
import { useState } from 'react';

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
          <Card
            key={idx}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            style={{ width: '40%', cursor: 'pointer' }}
            onClick={() => openModal(point)}
          >
            <Title order={4} mb={4}>{point.title}</Title>
            <Text size="sm" c="dimmed" lineClamp={4}>
              {point.description}
            </Text>
          </Card>
        ))}
      </Flex>
    </ScrollArea>
  );

  return (
    <Box mx="auto" w="80%">
      <Title order={2} mb="md" ta="center">
        {title}
      </Title>

      <Accordion variant="separated" radius="md" transitionDuration={200}>
        {sections.map((section, idx) => (
          <Accordion.Item key={idx} value={section.label}>
            <Accordion.Control>
              <Title order={4}>{section.label}</Title>
            </Accordion.Control>
            <Accordion.Panel>{renderCardList(section.points)}</Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

   <Modal
    opened={modalOpened}
    onClose={() => setModalOpened(false)}
    title={
      <Title order={3} style={{ lineHeight: 1.2 }}>
        {selectedPoint?.title}
      </Title>
    }
      size="lg"
      centered
      radius="md"
      overlayProps={{
        blur: 5,
        opacity: 0.4,
      }}
      transitionProps={{
        transition: 'fade',
        duration: 200,
        timingFunction: 'ease',
      }}
      styles={{
        content: {
          padding: '2rem',
          maxWidth: '720px',
          margin: '0 auto',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        },
        body: {
          maxHeight: '400px',
          overflowY: 'auto',
        },
      }}
    >
      <Text size="md" style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>
        {selectedPoint?.description}
      </Text>
    </Modal>

    </Box>
  );
}

