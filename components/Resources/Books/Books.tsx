'use client';

import React from 'react';
import { Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import classes from './Books.module.css';

interface BookData {
  image: string;
  title: string;
  link: string;
}

const books: BookData[] = [
  {
    image: '/images/books/miracle-of-mindfulness.jpg',
    title: 'The Miracle of Mindfulness',
    link: 'https://www.amazon.com/Miracle-Mindfulness-Introduction-Practice-Meditation/dp/0807012394',
  },
  {
    image: '/images/books/wherever-you-go.jpg',
    title: 'Wherever You Go, There You Are',
    link: 'https://www.amazon.com/Wherever-You-There-Are-ROUGH/dp/B002E8JGCY',
  },
  {
    image: '/images/books/radical-acceptance.jpg',
    title: 'Radical Acceptance',
    link: 'https://www.amazon.com/Radical-Acceptance-Awakening-Heals-Shame/dp/0712601457',
  },
  {
    image: '/images/books/10-percent-happier.jpg',
    title: '10% Happier',
    link: 'https://www.amazon.com/10-Happier-10th-Anniversary-Works/dp/0063356473',
  },
  {
    image: '/images/books/mindfulness-plain-english.jpg',
    title: 'Mindfulness in Plain English',
    link: 'https://www.amazon.com/Mindfulness-English-Bhante-Henepola-Gunaratana/dp/0861719069',
  },
];

export function Books() {
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Title className={classes.title}>Books</Title>
        <Carousel
          slideSize={{ base: '100%', sm: '50%', md: '25%' }}
          slideGap="md"
          align="start"
          slidesToScroll={1}
          withControls
          withIndicators
          loop
          styles={{
            control: {
              backgroundColor: 'white',
              border: '1px solid #e0e0e0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            },
            indicator: {
              backgroundColor: '#674c8f',
            },
          }}
        >
          {books.map((book, index) => (
            <Carousel.Slide key={index}>
              <div className={classes.card}>
                <h3 className={classes.bookTitle}>{book.title}</h3>
                <div className={classes.imageContainer}>
                  <img
                    src={book.image}
                    alt={book.title}
                    className={classes.bookImage}
                  />
                </div>
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.orderButton}
                >
                  Order on Amazon
                </a>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
