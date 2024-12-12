import { Overlay, Container, Title, Button, Text } from '@mantine/core';
import classes from './LandingHero.module.css';

export function LandingHero() {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'blue', to: 'white' }}>
          Mindfulness Center of Southern Utah
        </Text>
            </Title>
        <Text className={classes.description} size="xl" mt="xl">
        "Training the Mind - Opening the Heart"
        </Text>

        <Button  size="xl" radius="xl" className={classes.control}>
          Get started
        </Button>
      </Container>
    </div>
  );
}