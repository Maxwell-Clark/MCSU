'use client';

import React from 'react';
import {
  Paper,
  Text,
  Title,
  Button,
  Image,
  Stack,
} from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from './Books.module.css';

interface BookProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

function BookCard({ image, title, description, link }: BookProps) {
  return (
    <Paper shadow="md" p="md" radius="md" className={classes.card}>
      <Stack>
        <Title order={4} className={classes.book_title}>
          {title}
        </Title>
        <Image src={image} alt={title} height={300} fit="contain" radius="md" />
        <div className={classes.btn_wrapper}>
          <Button
            variant="outline"
            className={classes.order_button}
            onClick={() => window.open(link, '_blank')}
          >
            Order on Amazon
          </Button>
        </div>
      </Stack>
    </Paper>
  );
}

const data = [
  {
    image: 'https://m.media-amazon.com/images/I/51AACr+UbYL.jpg',
    title: 'The Miracle of Mindfulness',
    description:
      'A classic introduction to mindfulness practice by Thich Nhat Hanh, emphasizing the importance of being fully present in each moment.',
    link: 'https://www.amazon.com/Miracle-Mindfulness-Introduction-Practice-Meditation/dp/0807012394',
  },
  {
    image: 'https://m.media-amazon.com/images/I/81YGcWlDmUL.jpg',
    title: 'Wherever You Go, There You Are',
    description:
      'Jon Kabat-Zinn’s guide to mindfulness, encouraging readers to find peace and presence in their everyday lives.',
    link: 'https://www.amazon.com/Wherever-You-There-Are-ROUGH/dp/B002E8JGCY',
  },
  {
    image: 'https://m.media-amazon.com/images/I/91tPhKZAZIL._UF1000,1000_QL80_.jpg',
    title: 'Radical Acceptance',
    description:
      'Tara Brach explores how mindfulness and self-compassion can lead to true inner freedom and peace.',
    link: 'https://www.amazon.com/Radical-Acceptance-Awakening-Heals-Shame/dp/0712601457',
  },
  {
    image: 'https://m.media-amazon.com/images/I/41RsOoojQXL._AC_UF1000,1000_QL80_.jpg',
    title: '10% Happier',
    description:
      'Dan Harris shares his journey to mindfulness and meditation, showing how they helped him reduce stress and find happiness.',
    link: 'https://www.amazon.com/10-Happier-10th-Anniversary-Works/dp/0063356473',
  },
  {
    image: 'https://m.media-amazon.com/images/I/71JXXfZWFqL._AC_UF1000,1000_QL80_.jpg',
    title: 'Mindfulness in Plain English',
    description:
      'Bhante Henepola Gunaratana’s practical guide to mindfulness, offering clear instructions for beginners.',
    link: 'https://www.amazon.com/Mindfulness-English-Bhante-Henepola-Gunaratana/dp/0861719069',
  },
];

export function Books() {
  return (
    <div className={classes.wrapper}>
      <Title ta="center" className={classes.title}>
        Books
      </Title>
      <Carousel
        slideSize="25%"
        slideGap="md"
        align="start"
        slidesToScroll={1}
        withControls
        withIndicators
        loop
        styles={{ control: { backgroundColor: 'white' } }}
      >
        {data.map((item, index) => (
          <Carousel.Slide key={index}>
            <BookCard {...item} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </div>
  );
}

