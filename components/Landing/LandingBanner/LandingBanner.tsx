import { Text, Title, TextInput, Button, Image } from '@mantine/core';
import image from './image.svg';
import classes from './LandingBanner.module.css';

export function LandingBanner() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Sit With Us...</Title>
        <Text fw={500} fz="lg" mb={5}>
          Subscribe to our newsletter!
        </Text>
        <Text fz="sm" c="dimmed">
        Stay connected with moments of mindfulness and clarity. Receive gentle reminders, inspiring insights, and regular mindful community reflections to support your journey. One email, once a week.
        </Text>

        <div className={classes.controls}>
          <TextInput
            placeholder="Your email"
            classNames={{ input: classes.input, root: classes.inputWrapper }}
          />
          <Button className={classes.control}>Subscribe</Button>
        </div>
      </div>
      {/* <Image src={image.src} className={classes.image} /> */}
    </div>
  );
}