import { Text } from '@mantine/core';
import classes from './Disclaimer.module.css';

export function Disclaimer() {
  return (
    <div className={classes.wrapper}>
      <Text className={classes.text}>
        The information provided on this site is for educational and informational
        purposes only and does not constitute medical advice, diagnosis, or treatment.
        It is not a substitute for professional medical advice. Always seek the advice
        of your physician or other qualified health provider with any questions you may
        have regarding a medical condition. Never disregard professional medical advice
        or delay seeking it because of information provided here.
      </Text>
    </div>
  );
}
