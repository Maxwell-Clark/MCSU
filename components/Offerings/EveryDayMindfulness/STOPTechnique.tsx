'use client';

import { useState } from 'react';
import { Stepper, Button, Group, Text, Container, Title } from '@mantine/core';
import classes from './STOPTechnique.module.css';

export function STOPTechnique() {
  const [active, setActive] = useState(0);
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Container className={classes.wrapper}>
      <Title className={classes.title}>STOP Technique</Title>
      <Text size="lg" className={classes.description} mb="xl">
        A simple mindfulness practice to help you pause and respond mindfully in any situation
      </Text>

      <Stepper active={active} onStepClick={setActive} orientation="vertical" size="lg">
        <Stepper.Step 
          label="Stop" 
          description="Stop whatever you are doing, and pause momentarily"
        >
          <Text size="lg" mt="md">
            Take a moment to pause and interrupt your automatic reactions. This brief pause creates space for mindful awareness.
          </Text>
        </Stepper.Step>

        <Stepper.Step 
          label="Take a Breath" 
          description="Notice your breathing and breathe mindfully"
        >
          <Text size="lg" mt="md">
            Breathe in slowly through the nose, expanding the belly, and exhale slowly and deeply through pursed lips. 
            Focus on the sensation of your breath to ground yourself in the present moment.
          </Text>
        </Stepper.Step>

        <Stepper.Step 
          label="Observe" 
          description="Become aware of your thoughts, emotions, and physical sensations"
        >
          <Text size="lg" mt="md">
            Become the observer of your thoughts, emotions, and physical reactions. What thoughts do you notice? 
            What emotions are present? How does your body feel? Tune in and sit with whatever arises for a few moments.
          </Text>
        </Stepper.Step>

        <Stepper.Step 
          label="Proceed" 
          description="Choose your response mindfully"
        >
          <Text size="lg" mt="md">
            Mindfully consider how you would like to respond. What's one thing you can focus on right now? 
            What's your most important and urgent priority? Narrow down your focus and take it one small step at a time.
          </Text>
        </Stepper.Step>
      </Stepper>

      <Group justify="center" mt="xl">
        <Button variant="default" onClick={prevStep} disabled={active === 0}>
          Previous Step
        </Button>
        <Button onClick={nextStep} disabled={active === 3}>
          Next Step
        </Button>
      </Group>
    </Container>
  );
} 