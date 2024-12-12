"use client";
import { Container, Title, Accordion } from '@mantine/core';
import classes from './LandingFAQ.module.css';

const placeholder =
  'Mindfulness is the practice of staying fully present and aware of the current moment, while meditation is a focused practice that often involves mindfulness techniques to train the mind. Mindfulness can be practiced anytime, whereas meditation usually involves setting aside specific time for focused awareness.';

export function LandingFAQ() {
  return (
    <Container size="sm" className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">
      <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>What is the difference between mindfulness and meditation?</Accordion.Control>
          <Accordion.Panel>{placeholder}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control>How do I handle distractions or a wandering mind during meditation?</Accordion.Control>
          <Accordion.Panel>{placeholder}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control>How long should I meditate to see benefits?</Accordion.Control>
          <Accordion.Panel>{placeholder}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control>Can mindfulness help reduce stress and anxiety?</Accordion.Control>
          <Accordion.Panel>{placeholder}</Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control>Do I need any special tools or equipment to practice mindfulness?</Accordion.Control>
          <Accordion.Panel>{placeholder}</Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}