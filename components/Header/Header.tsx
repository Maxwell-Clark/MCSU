import {
    HoverCard,
    Group,
    Button,
    UnstyledButton,
    Text,
    SimpleGrid,
    ThemeIcon,
    Anchor,
    Divider,
    Center,
    Box,
    Burger,
    Drawer,
    Collapse,
    ScrollArea,
    rem,
    useMantineTheme,
    useMantineColorScheme,
    ActionIcon,
    Title
  } from '@mantine/core';
  import { useDisclosure } from '@mantine/hooks';
  import Link from 'next/link';

  import { HeaderCard } from './HeaderCard';
  import {
    IconNotification,
    IconSunset2,
    IconMoonStars,
    IconBook,
    IconHeartHandshake,
    IconHeadphones,
    IconSchool,
    IconChevronDown,
    IconCalendarFilled,
    IconInfoCircle, IconUsers, IconBuilding, IconFileText, IconVideo, IconMessageCircle, IconMusic, IconLink, IconBriefcase, IconChartPie, IconCalendar 
  } from '@tabler/icons-react';
  import classes from './Header.module.css';
import { useState } from 'react';
  
  const whoWeAreData = [
    {
      icon: IconInfoCircle,
      title: 'Overview',
      id: 'overview',
      description: 'Learn about our mission, values, and the work we do to foster mindfulness in communities.',
    },
    {
      icon: IconUsers,
      title: 'Leadership',
      id: 'leadership',
      description: 'Meet our leadership team and see how they guide our vision and initiatives.',
    },
    {
      icon: IconBuilding,
      title: 'Board and Team',
      id: 'board',
      description: 'Explore our dedicated board members and team, committed to promoting mindfulness.',
    }
  ];
  
  const mindfulnessEduData = [
    {
      icon: IconFileText,
      title: 'Papers',
      id: 'papers',
      description: 'Access research papers and articles on the science and benefits of mindfulness.',
    },
    {
      icon: IconBook,
      title: 'Books',
      id: 'books',
      description: 'Browse recommended books for a more comprehensive study of mindfulness.',
    },
    {
      icon: IconLink,
      title: 'Links',
      id: 'links',
      description: 'Explore helpful resources and links to useful mindfulness resources.',
    },
    {
      icon: IconFileText,
      title: 'Poems',
      id: 'poems',
      description: 'Explore poems on mindfulness, love, and wisdom.',
    },

    {
      icon: IconVideo,
      title: 'Videos',
      id: 'videos',
      description: 'Watch educational videos to deepen your understanding of mindfulness practices.',
    },
  ];
  
  const resourcesData = [
    {
      icon: IconHeadphones,
      title: 'Guided Meditation',
      id: 'meditations',
      description: 'Listen to guided meditations to help you focus, relax, and cultivate mindfulness.',
    },
    {
      icon: IconMusic,
      title: 'Music',
      id: 'music',
      description: 'Discover calming music to accompany your mindfulness and meditation sessions.',
    },
    {
      icon: IconVideo,
      title: 'Videos',
      id: 'videos',
      description: 'Watch videos on various aspects of mindfulness, including techniques and benefits.',
    },
    {
      icon: IconLink,
      title: 'Links',
      id: 'links',
      description: 'Explore helpful resources and links to deepen your mindfulness practice.',
    }
    // {
    //   icon: IconBook,
    //   title: 'Blog',
    //   description: 'Read blog posts and articles on mindfulness practices and personal stories.',
    // },
  ];
  
  const partnerWithUsData = [
    {
      icon: IconHeartHandshake,
      title: 'Community Partners',
      id: 'partners',
      description: 'Join us as a community partner and make a difference by promoting mindfulness.',
    },
    {
      icon: IconUsers,
      title: 'Individuals',
      id: 'individuals',
      description: 'Partner with us as an individual to support mindfulness initiatives.',
    },
    {
      icon: IconBuilding,
      title: 'Civic',
      id: 'civic',
      description: 'Collaborate with us in civic programs to integrate mindfulness into the community.',
    },
    {
      icon: IconBriefcase,
      title: 'Business',
      id: 'business',
      description: 'Discover ways your business can support mindfulness and well-being in the workplace.',
    },
  ];
  
  const offeringsData = [
    {
      icon: IconSchool,
      title: 'Intro to Mindfulness',
      id: 'intro',
      description: 'Join our introductory course to learn the fundamentals of mindfulness practice.',
    },
    {
      icon: IconChartPie,
      title: 'MBSR',
      id: 'mbsr',
      description: 'Participate in our Mindfulness-Based Stress Reduction (MBSR) program for stress relief.',
    },

    {
      icon: IconSunset2,
      title: 'Everyday Mindfulness',
      id: 'everyday',
      description: 'Learn practical tips to integrate mindfulness into your daily life.',
    },
    {
      icon: IconCalendar,
      title: 'Drop-in Mindfulness',
      id: 'drop_in',
      description: 'Join us for optional drop-in mindfulness classes',
    },
  ];
  
  export function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, setLinksOpened] = useState({});    
    const theme = useMantineTheme();
    const { toggleColorScheme } = useMantineColorScheme();

    const toggleLinks = (key) => {
        setLinksOpened((prevState) => ({
          ...prevState,
          [key]: !prevState[key],
        }));
      };
  
    const links = whoWeAreData.map((item) => (
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group align="justify-center">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ));

    const fetchLinks = (data, endpoint) => {
        return data.map((item) => (
          <Link className={classes.subLink} href={`${endpoint}#${item.id}`} onClick={closeDrawer}>
            <UnstyledButton className={classes.subLink} key={item.title}>
              <Group wrap="nowrap" align="justify-center">
                <ThemeIcon size={34} variant="default" radius="md">
                  <item.icon style={{ width: rem(22), height: rem(22) }} color={theme.colors.blue[6]} />
                </ThemeIcon>
                <div>
                  <Text size="sm" fw={500}>
                    {item.title}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {item.description}
                  </Text>
                </div>
              </Group>
            </UnstyledButton>
          </Link>
          ));
    }
  
    return (
      <Box>
        <header className={classes.header}>
          <Group className={classes.header_group} >  
            <a href='/' className={classes.link}>
              <Title>
                <Text inherit variant="gradient" component="span" gradient={{ from: 'blue', to: 'blue' }}>
                    MCSU
                </Text>
              </Title>
            </a>
            <Group h="100%" gap={0} visibleFrom="md">
              {/* <a href="#" className={classes.link}>
                Who We Are
              </a> */}
              <HeaderCard links={whoWeAreData}  title={"Who We Are"} endpoint={"/whoWeAre"} />
              <HeaderCard links={offeringsData}  title={"Offerings & Events"} endpoint={"/offerings"}/>
              <HeaderCard links={mindfulnessEduData}  title={"Resources"} endpoint={"/resources"}/>
              <HeaderCard links={partnerWithUsData}  title={"Partner With Us"} endpoint={"/partnerWithUs"}/>
              <HeaderCard links={resourcesData}  title={"Practice"} endpoint={"/practice"}/>
              <a href="/blog" className={classes.link}>
                Blog
              </a>
            </Group>
  
            <Group>
              <ActionIcon onClick={toggleColorScheme}>
                <IconMoonStars  style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </Group>
  
            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom='md' />
          </Group>
        </header>
  
        <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <UnstyledButton className={classes.link} onClick={() => toggleLinks('whoWeAre')}>
            <Center inline>
              <Box component="span" mr={5}>
                Who We Are
              </Box>
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened['whoWeAre']}>{fetchLinks(whoWeAreData, "/whoWeAre")}</Collapse>

          <UnstyledButton className={classes.link} onClick={() => toggleLinks('offerings')}>
            <Center inline>
              <Box component="span" mr={5}>
                Offerings & Events
              </Box>
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened['offerings']}>{fetchLinks(offeringsData, "/offerings")}</Collapse>

          <UnstyledButton className={classes.link} onClick={() => toggleLinks('education')}>
            <Center inline>
              <Box component="span" mr={5}>
                Mindfulness Education
              </Box>
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened['education']}>{fetchLinks(mindfulnessEduData, '/resources')}</Collapse>

          <UnstyledButton className={classes.link} onClick={() => toggleLinks('partners')}>
            <Center inline>
              <Box component="span" mr={5}>
                Partner With Us
              </Box>
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened['partners']}>{fetchLinks(partnerWithUsData, '/partnerWithUs')}</Collapse>

          <UnstyledButton className={classes.link} onClick={() => toggleLinks('resources')}>
            <Center inline>
              <Box component="span" mr={5}>
                Personal Resources
              </Box>
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={theme.colors.blue[6]} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened['resources']}>{fetchLinks(resourcesData, '/practice')}</Collapse>

          <a href="/blog" className={classes.link}>
            Blog
          </a>

          <Divider my="sm" />
        </ScrollArea>
      </Drawer>
      </Box>
    );
  }
