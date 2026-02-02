'use client';

import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { Paper, Text, Title, useMantineTheme, rem } from '@mantine/core';
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

const data = [
  {
    image:'https://www.apa.org/images/tile-stress-mindfulness-meditation_tcm7-264379.jpg',
    url: 'https://www.apa.org/topics/mindfulness/meditation',
    title: 'Mindfulness meditation: A research-proven way to reduce stress',
    category: 'Mindfulness',
  },
  {
    image:'https://newsinhealth.nih.gov/sites/newsinhealth/files/2021/June/jun-2021-cover-illustration-woman-focusing-butterfly-worries-float-away.jpg',
    title: 'Mindfulness for Your Health ',
    url: 'https://newsinhealth.nih.gov/2021/06/mindfulness-your-health',
    category: 'Health',
  },
  {
    image:
      'https://freenaturestock.com/wp-content/uploads/freenaturestock-2287-768x1050.jpg',
    title: 'Meditation: A simple, fast way to reduce stress',
    url: 'https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858',
    category: 'Meditation',
  },
  {
    image:
      'https://freenaturestock.com/wp-content/uploads/freenaturestock-2285-768x1152.jpg',
    title: 'When science meets mindfulness',
    url: 'https://news.harvard.edu/gazette/story/2018/04/harvard-researchers-study-how-mindfulness-may-change-the-brain-in-depressed-patients/',
    category: 'Mindfulness',
  }
];

export function Papers() {
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <Card {...item} />
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
          align="start"
          slidesToScroll={1}
          className={classes.carousel}
        >
          {slides}
        </Carousel>
      </div>
    </div>
  );
}
