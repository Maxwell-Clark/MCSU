'use client';
import { Container, Text, Button, Group } from '@mantine/core';
import classes from './WWAOverview.module.css';

export function WWAOverview() {
  return (
    <div className={classes.wrapper}>
      <Container size={950} className={classes.inner}>
        <h1 className={classes.title}>
          {' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'white' }} inherit>
          Learn More about MCSU 
          </Text>{' '}
          
        </h1>

        <Text className={classes.description} color="dimmed">
          Here is a base text for the overview about mcsu
        </Text>

        <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'blue' }}
          >
            Join Us
          </Button>

          {/* <Button
            component="a"
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            className={classes.control}
            leftSection={<GithubIcon size={20} />}
          >
            GitHub
          </Button> */}
        </Group>
      </Container>
    </div>
  );
}