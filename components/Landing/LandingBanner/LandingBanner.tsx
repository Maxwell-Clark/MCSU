import { Text, Title, TextInput, Button, Image } from '@mantine/core';
import image from './image.svg';
import classes from './LandingBanner.module.css';

export function LandingBanner() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Subscribe to our newsletter!</Title>
        <Text fz="sm" c="dimmed">
        Stay connected with moments of mindfulness and clarity. Receive gentle reminders, inspiring insights, and regular mindful community reflections to support your journey. One email, once a week. Includes an invitation to our virtual gathering each Monday evening. See Offerings and Events for more opportunities to train the mind and open the heart.
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