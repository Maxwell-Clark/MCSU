'use client';

import { AspectRatio, Card, Container, Image, Modal, SimpleGrid, Text } from '@mantine/core';
import classes from './Blog.module.css';
import { SetStateAction, useState } from 'react';
import BlogPost from './BlogPost';

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
    },
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
      },
      {
        title: 'Finding Calm in a Busy Day: 3-Minute Breathing',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
          date: 'November 14, 2023',
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
        title: 'Mindfulness for Better Sleep: Evening Routines',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'November 14, 2023',
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
        title: 'Self-Compassion: The Path to Emotional Resilience',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'November 29, 2023',
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
        title: 'Overcoming Anxiety with Body Scan Meditation',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'December 3, 2023',
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
        title: 'Breathwork Techniques for Stress Relief',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'December 15, 2023',
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
        title: 'Mindful Walking: A Step-by-Step Guide',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'January 5, 2024',
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
        title: 'The Healing Power of Nature and Mindfulness',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'January 20, 2024',
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
        title: 'Mindful Journaling: Boost Self-Awareness',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
          date: 'February 17, 2024',
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
        title: 'Reconnecting with Yourself: A Digital Detox',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'February 17, 2024',
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
        title: 'Mindfulness in the Workplace: Maintaining Balance',
        image:
          'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80',
        date: 'March 1, 2024',
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
  ];



export function Blog() {
  // 

    const [postOpened, setPostOpen] = useState(false);    
    const [activePost, setPost] = useState({});

    function openPost(article: SetStateAction<{}>) {
        console.log(article);
        setPostOpen(true)
        setPost(article)
    }
    
    function  closePost() {
        setPostOpen(false)
        setPost({})
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
     <Modal opened={postOpened} onClose={closePost}>
        <BlogPost post={activePost}  />
      </Modal>
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}
