'use client';

import { Carousel } from '@mantine/carousel';
import { Paper, Text, Title, rem } from '@mantine/core';
import type { ContentItemView } from '@/lib/content-kinds';
import classes from './Papers.module.css';

interface CardProps {
  image: string;
  url: string;
  title: string;
  category: string;
}

function Card({ image, url, title, category }: CardProps) {
  return (
    <Paper
      shadow="md"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div className={classes.cardContent}>
        <div>
          <Text className={classes.category} size="xs">
            {category}
          </Text>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
        </div>
        <button className={classes.button} onClick={() => window.open(url, '_blank')}>
          Read article
        </button>
      </div>
    </Paper>
  );
}

interface PapersProps {
  /** Active papers, in display order (managed in Admin > Media & Resources) */
  items: ContentItemView[];
}

export function Papers({ items }: PapersProps) {
  const slides = items
    .filter((item) => item.url)
    .map((item) => (
      <Carousel.Slide key={item.id}>
        <Card
          image={item.image ?? ''}
          url={item.url!}
          title={item.title}
          category={item.category ?? ''}
        />
      </Carousel.Slide>
    ));

  return (
    <div className={classes.wrapper}>
      {/* Gradient orbs */}
      <div className={classes.gradientOrbs}>
        <div className={classes.orb1} />
        <div className={classes.orb2} />
      </div>

      <div className={classes.content}>
        <Title className={classes.sectionTitle}>Papers</Title>
        <Carousel
          slideSize={{ base: '100%', sm: '50%' }}
          slideGap={{ base: rem(2), sm: 'xl' }}
          className={classes.carousel}
        >
          {slides}
        </Carousel>
      </div>
    </div>
  );
}
