import Image from 'next/image';
import { Container, Text, Title } from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import classes from './WWAFacilities.module.css';

export function WWAFacilities() {
  return (
    <div className={classes.wrapper}>
      <Container size={800}>
        <Text className={classes.label}>Our Facilities</Text>
        <Title order={2} className={classes.title}>
          Our Building
        </Title>
        <div className={classes.divider} />

        <Text className={classes.address}>
          <IconMapPin size={16} />
          370 East Tabernacle, St. George, Utah
        </Text>

        <Image
          src="/images/building/exterior-entrance.webp"
          alt="Architectural rendering of the exterior entrance of the Mindfulness Center of Southern Utah"
          width={2560}
          height={1440}
          sizes="(max-width: 900px) 100vw, 800px"
          className={classes.image}
        />

        <Text className={classes.paragraph}>
          A mindfulness center is under construction at 370 East Tabernacle.
        </Text>
      </Container>
    </div>
  );
}
