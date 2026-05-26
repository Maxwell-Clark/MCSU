import { Container, Text } from '@mantine/core';
import classes from './Footer.module.css';

export function Footer() {
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Text className={classes.brand}>Mindfulness Center of Southern Utah</Text>
      </Container>
    </div>
  );
}
