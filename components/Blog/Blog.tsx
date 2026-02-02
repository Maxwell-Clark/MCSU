'use client';

import { useState } from 'react';
import {
  AspectRatio,
  Badge,
  Card,
  Container,
  Image,
  Modal,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { BlogPostProps } from '@/interfaces/General_Interfaces';
import BlogPost from './BlogPost';
import classes from './Blog.module.css';

function getCategoryColor(category: string): string {
  switch (category.toLowerCase()) {
    case 'meditation':
      return 'sage';
    case 'wellness':
      return 'purple';
    case 'tips':
      return 'violet';
    default:
      return 'gray';
  }
}

interface BlogProps {
  posts: BlogPostProps[];
}

export function Blog({ posts }: BlogProps) {
  const defaultPost: BlogPostProps = {
    id: '',
    title: '',
    slug: '',
    date: '',
    image: '',
    content: '',
  };

  const [activePost, setActivePost] = useState<BlogPostProps>(defaultPost);
  const [postOpened, setPostOpen] = useState(false);

  function openPost(article: BlogPostProps) {
    setActivePost(article);
    setPostOpen(true);
  }

  function closePost() {
    setPostOpen(false);
    setActivePost(defaultPost);
  }

  if (posts.length === 0) {
    return (
      <Container py="xl" size="lg">
        <div className={classes.header}>
          <Title className={classes.headerTitle}>Insights & Reflections</Title>
          <Text className={classes.headerSubtitle}>
            Thoughts on mindfulness, meditation, and well-being
          </Text>
        </div>
        <Text ta="center" c="dimmed" py="xl">
          No blog posts yet. Check back soon!
        </Text>
      </Container>
    );
  }

  const [featuredPost, ...gridPosts] = posts;

  const featuredCard = (
    <Card
      key={featuredPost.id}
      p="lg"
      radius="lg"
      component="a"
      href="#"
      className={classes.featuredCard}
      onClick={() => openPost(featuredPost)}
    >
      <div className={classes.featuredContent}>
        <div className={classes.featuredImageWrapper}>
          <AspectRatio ratio={16 / 9} className={classes.featuredAspect}>
            <Image src={featuredPost.image} className={classes.featuredImage} />
          </AspectRatio>
          <div className={classes.featuredOverlay} />
        </div>
        <div className={classes.featuredText}>
          {featuredPost.category && (
            <Badge
              className={classes.categoryBadge}
              color={getCategoryColor(featuredPost.category)}
              variant="filled"
              size="lg"
            >
              {featuredPost.category}
            </Badge>
          )}
          <Text c="dimmed" size="sm" tt="uppercase" fw={700} mt="xs">
            {featuredPost.date}
          </Text>
          <Text className={classes.featuredTitle} mt="sm">
            {featuredPost.title}
          </Text>
          <Text className={classes.featuredExcerpt} mt="md" lineClamp={3}>
            {featuredPost.content.replace(/<[^>]*>/g, '').trim()}
          </Text>
        </div>
      </div>
    </Card>
  );

  const gridCards = gridPosts.map((article) => (
    <Card
      key={article.id}
      p="md"
      radius="md"
      component="a"
      href="#"
      className={classes.card}
      onClick={() => openPost(article)}
    >
      <div className={classes.cardImageWrapper}>
        <AspectRatio ratio={16 / 9}>
          <Image src={article.image} className={classes.cardImage} />
        </AspectRatio>
        <div className={classes.cardOverlay} />
      </div>
      {article.category && (
        <Badge
          className={classes.categoryBadge}
          color={getCategoryColor(article.category)}
          variant="filled"
          size="sm"
          mt="md"
        >
          {article.category}
        </Badge>
      )}
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="xs">
        {article.date}
      </Text>
      <Text className={classes.title} mt={5}>
        {article.title}
      </Text>
    </Card>
  ));

  return (
    <Container py="xl" size="lg">
      <Modal opened={postOpened} onClose={closePost} fullScreen>
        <BlogPost post={activePost} />
      </Modal>

      <div className={classes.header}>
        <Title className={classes.headerTitle}>Insights & Reflections</Title>
        <Text className={classes.headerSubtitle}>
          Thoughts on mindfulness, meditation, and well-being
        </Text>
      </div>

      <div className={classes.featuredSection}>{featuredCard}</div>

      {gridPosts.length > 0 && (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mt="xl" className={classes.grid}>
          {gridCards}
        </SimpleGrid>
      )}
    </Container>
  );
}
