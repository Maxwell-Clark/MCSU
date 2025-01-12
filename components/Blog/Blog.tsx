'use client';

import { AspectRatio, Card, Container, Image, Modal, SimpleGrid, Text } from '@mantine/core';
import classes from './Blog.module.css';
import { SetStateAction, useState } from 'react';
import BlogPost from './BlogPost';
import { BlogPostProps } from '@/interfaces/General_Interfaces';

const mockdata = [
    {
      title: '5 Simple Ways to Practice Mindfulness at Home',
      image:
        'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
      date: 'August 18, 2023',
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
    },
    {
      title: 'Mindful Eating: A Journey to Better Health',
      image:
        'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
      date: 'September 1, 2023',
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
    },
    {
      title: 'Cultivating Gratitude with Daily Meditation',
      image:
        'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
      date: 'October 5, 2023',
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
    },
    {
      title: 'Exploring the Science Behind Mindfulness',
      image:
        'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
      date: 'October 10, 2023',
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
    }
  ];



export function Blog() {
      // 1) Define a suitable default post in case user hasn't opened one yet
    const defaultPost: BlogPostProps = {
      title: '',
      date: '',
      image: '',
      content: '',
    };

    // 2) Use that as your initial state
    const [activePost, setActivePost] = useState<BlogPostProps>(defaultPost);

    // 3) Boolean for modal open/close
    const [postOpened, setPostOpen] = useState(false);

    let postToOpen: BlogPostProps = {
        title: 'Post Failed To Load, Try Again Later',
        date: 'N/A',
        image: 'None',
        content: 'this Post Failed To Load, Try Again Later'
    };

    function openPost(article: BlogPostProps) {
      console.log('Opening post:', article);
      setActivePost(article);
      setPostOpen(true);
    }
    
    function  closePost() {
        setPostOpen(false)
        setActivePost(defaultPost)
    }
      
  
  const cards = mockdata.map((article) => (
    <Card key={article.title} p="md" radius="md" component="a" href="#" className={classes.card} onClick={() => openPost(article)}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={article.image} />
      </AspectRatio>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ));

  return (
    <Container py="xl">
     <Modal opened={postOpened} onClose={closePost} fullScreen>
        <BlogPost post={activePost} />
      </Modal>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}
