'use client';

import React from 'react';
import { Container, Title, Text, Image, Divider, TypographyStylesProvider, Button, Group } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import classes from './BlogPost.module.css';
import { BlogPostInterface } from '@/interfaces/General_Interfaces';

interface BlogPostComponentProps extends BlogPostInterface {
  author?: string;
  standalone?: boolean;
}

const BlogPost = ({ post, author, standalone = false }: BlogPostComponentProps) => {
  const isHtmlContent = post.content.includes('<');

  return (
    <Container size="md" className={classes.pageContainer}>
      {standalone && (
        <Button
          component={Link}
          href="/blog"
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          mb="md"
        >
          Back to Blog
        </Button>
      )}

      <div className={classes.header}>
        <Title className={classes.title} order={2}>
          {post.title}
        </Title>
        <Group gap="xs" justify="center">
          <Text className={classes.date}>{post.date}</Text>
          {author && (
            <Text className={classes.date}> &middot; {author}</Text>
          )}
        </Group>
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
