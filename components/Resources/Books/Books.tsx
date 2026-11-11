'use client';

import React from 'react';
import { Title } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import type { ContentItemView } from '@/lib/content-kinds';
import classes from './Books.module.css';

interface BooksProps {
  /** Active books, in display order (managed in Admin > Media & Resources) */
  items: ContentItemView[];
}

function linkLabel(url: string): string {
  try {
    return /(^|\.)amazon\./.test(new URL(url).hostname) ? 'Order on Amazon' : 'View book';
  } catch {
    return 'View book';
  }
}

export function Books({ items }: BooksProps) {
  const books = items.filter((item) => item.url);
  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Title className={classes.title}>Books</Title>
        <Carousel
          slideSize={{ base: '100%', sm: '50%', md: '25%' }}
          slideGap="md"
          withControls
          withIndicators
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
          {books.map((book) => (
            <Carousel.Slide key={book.id}>
              <div className={classes.card}>
                <h3 className={classes.bookTitle}>{book.title}</h3>
                <div className={classes.imageContainer}>
                  {book.image && (
                    <img
                      src={book.image}
                      alt={book.title}
                      className={classes.bookImage}
                    />
                  )}
                </div>
                <a
                  href={book.url!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.orderButton}
                >
                  {linkLabel(book.url!)}
                </a>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
