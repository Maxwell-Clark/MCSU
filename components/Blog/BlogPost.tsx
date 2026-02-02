'use client';

import React from 'react';
import { Container, Title, Text, Image, Divider, TypographyStylesProvider } from '@mantine/core';
import classes from './BlogPost.module.css';
import { BlogPostInterface } from '@/interfaces/General_Interfaces';

const BlogPost = ({ post }: BlogPostInterface) => {
  const isHtmlContent = post.content.includes('<');

  return (
    <Container size="md" className={classes.pageContainer}>
      <div className={classes.header}>
        <Title className={classes.title} order={2}>
          {post.title}
        </Title>
        <Text className={classes.date}>{post.date}</Text>
      </div>

      <Divider my="sm" />

      <Image src={post.image} alt={post.title} className={classes.postImage} />

      {isHtmlContent ? (
        <TypographyStylesProvider className={classes.content}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </TypographyStylesProvider>
      ) : (
        <Text className={classes.content}>{post.content}</Text>
      )}
    </Container>
  );
};

export default BlogPost;
