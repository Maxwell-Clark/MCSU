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
          A mindfulness center is under construction at 370 East Tabernacle. Traveling
          east from the center of St. George, the mindfulness center will be just before
          Flood Street. The mindfulness center is being constructed to house the
          Mindfulness Center of Southern Utah.
        </Text>
        <Text className={classes.paragraph}>
          The building will be divided into two parts. One part will provide office space
          for professionals, such as psychologists and therapists, interested in using
          mindfulness in their professional practices. There will be about 10 of these
          offices.
        </Text>
        <Text className={classes.paragraph}>
          The other part of the building will be an open space (a meditation hall) where
          MCSU can teach classes, host guest speakers and programs, and where our
          community can meet and practice mindfulness meditation. There should be enough
          space for 50–75 participants to gather.
        </Text>
      </Container>
    </div>
  );
}
