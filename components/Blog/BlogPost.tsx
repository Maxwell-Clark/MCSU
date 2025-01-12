'use client'; // If you're using Next.js App Router, otherwise you can remove this

import React from 'react';
import { Container, Title, Text, Image, Divider } from '@mantine/core';
import classes from './BlogPost.module.css';

const BlogPost = (post: any) => {
  // Sample post data
  const post1 = {
    title: 'Cultivating Mindfulness: A Beginner’s Guide',
    date: 'August 18, 2023',
    image:
      'https://images.unsplash.com/photo-1615757617886-067a0de98658?ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
    content: `
      Mindfulness is the practice of being fully present and aware of your
      surroundings, thoughts, and feelings without judgment. It's a powerful tool 
      that can reduce stress, enhance well-being, and deepen our sense of connection
      with ourselves and the world around us. 

      In this post, we'll explore simple mindfulness techniques you can start doing 
      today—like mindful breathing, body scan meditation, and gratitude journaling. 
      Whether you’re a complete beginner or have dabbled in mindfulness before, 
      these insights will help you build a more peaceful, attentive lifestyle.
    `,
  };

  return (
    <Container size="md" className={classes.pageContainer}>
      {/* Header */}
      <div className={classes.header}>
        <Title className={classes.title} order={2}>
          {post.title}
        </Title>
        <Text className={classes.date}>{post.date}</Text>
      </div>
      
      <Divider my="sm" />

      {/* Image */}
      <Image
        src={post.image}
        alt={post.title}
        className={classes.postImage}
      />

      {/* Content */}
      <Text className={classes.content}>
        {post.content}
      </Text>
    </Container>
  );
};

export default BlogPost;
