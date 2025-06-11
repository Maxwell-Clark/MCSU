'use client';
import { Title, SimpleGrid, Text, Button, ThemeIcon, Grid, rem } from '@mantine/core';
import { IconReceiptOff, IconFlame, IconCircleDotted, IconFileCode } from '@tabler/icons-react';
import classes from './WWALeadership.module.css';
import { UserInfoIcons } from '../UserInfoIcons/UserInfoIcons';
import { useDisclosure } from '@mantine/hooks';
import NinaHeadshot from '@/assets/img/nina_headshot.jpg';
import KirkHeadshot from '@/assets/img/kirk_headshot.jpg';
import GaelHeadshot from '@/assets/img/gael_headshot.jpg';
import Generic from '@/assets/img/generic.png';

const features = [
  {
    icon: IconReceiptOff,
    title: 'Free and open source',
    description: 'All packages are published under MIT license, you can use Mantine in any project',
  },
  {
    icon: IconFileCode,
    title: 'TypeScript based',
    description: 'Build type safe applications, all components and hooks export types',
  },
  {
    icon: IconCircleDotted,
    title: 'No annoying focus ring',
    description:
      'With new :focus-visible selector focus ring will appear only when user navigates with keyboard',
  },
  {
    icon: IconFlame,
    title: 'Flexible',
    description:
      'Customize colors, spacing, shadows, fonts and many other settings with global theme object',
  },
];


const data = [
    {
      image: KirkHeadshot.src,
      title: 'Kirk A. Benson',
      name: 'Kirk A. Benson',
      category: 'President & Chairman',
      description: 'With Gael’s support and direction, I’ve developed a keen interest in providing mindfulness programs in the community where we live.  I’ve received training to teach mindfulness based stress reduction through Brown University and have completed the Mindfulness Meditation Teacher Certification Program with Tara Barach and Jack Kornfield.  But most importantly, I’ve developed a consistent personal practice.'
    },


    {
      image:Generic,
      title: 'Vice Chair',
      name: 'David Tate',
      description: `Dr. David Tate is a psychologist in St. George, Utah, where he has been in
private practice for over 25 years. He serves on the Board of Directors for
the Mindfulness Center of Southern Utah.
From 1990-1995 Dr. Tate helped establish, taught Mindfulness-based
Stress Reduction (MBSR) classes, and conducted research for the Stress
Reduction Clinic at IHC Hospitals in Salt Lake City, Utah.  The program
was one of the first of now several hundred programs worldwide patterned
after the University of Massachusetts Medical Center Stress Reduction
Program developed by his mentor, Dr. Jon Kabat-Zinn, who said at the time
that it was “the oldest, largest and best replication of our program.” HIs
doctoral dissertation at IHC was an early contribution to the now large body
of thousands of research studies supporting the significant and substantial
mental, emotional and physical health benefits usually realized by MBSR
group participants.  

Dr. David Tate has taught mindfulness principles and practices to
thousands of people over the past 35 years in a wide variety of settings,
locally and nationally. He helped establish the first “mindfulness-based”
health and wellness resort, Miraval, Life in Balance, in 1995 as the Lead
Mindfulness Teacher and later as the Program Director. He has provided
consultations and mindfulness trainings for many businesses and
organizations including Nike, Ernst and Young, New Line Cinema, Abbott
Laboratories, AT&amp;T, the National Make-A-Wish Foundation, Zion National
Park, and the NCAA.`,
      category: 'Vice Chair',
    },
      {
      image: GaelHeadshot.src,
      title: 'Alieta Gael Benson',
      name: 'Alieta Gael Benson',
      description: 'I have been a practicing mother for 50 years.  I’ve discovered the importance of paying attention to what I experience – my friends, family, and community. A few years ago, I had the opportunity to visit with the Dalai Lama at his home and temple compound in Dharamsala, India.  Western scientists specializing in K-12 education presented to the Dalai Lama their research on the impact of mindfulness in education.  The Dalai Lama provided feedback in dialogue with the scientists. I was very impressed with the benefits mindfulness can provide our children and have since been a firm supporter of making mindfulness widely accessible.  Our efforts at the Mindfulnes\'As the Chief Executive Officer, Sarah Johnson is the guiding force behind the company’s mission and vision. With years of leadership experience, she has a proven track record of navigating complex business landscapes, fostering innovation, and inspiring teams to reach new heights. Sarah’s passion for growth, combined with her forward-thinking strategy, helps steer the company toward sustainable success and ensures that every decision aligns with our core values and purpose.s Center of Southern Utah is to that end.',
      category: 'Treasurer',
    },
    {
      image: Generic,
      title: 'Harlan M. Hatfield',
      name: 'Harlan M. Hatfield',
      description: `Harlan was elected to the board of directors of the Mindfulness Center of Southern Utah in 2025
and also serves as Secretary to the organization.
Professionally, Harlan M. Hatfield served as legal counsel and as an officer of a publicly traded
corporation between 1996 and 2017. His activities included project development, intellectual
property, licensing, acquisitions, divestitures, and financing. He oversaw the legal staff and
outside legal counsel, litigation, regulatory issues, contracts and he advised the officers and
board of directors of the business. Prior to his corporate law career, Harlan was in private
practice at a Seattle law firm where he was a partner. 
In recent years, Harlan has served in various community and non-profit organizations. He and
his wife served a full-time mission in Saint Louis, Missouri for the Church of Jesus Christ of
Latter-day Saints. He was a founding director of the My Hometown Community Resource
Center in Provo, Utah, where life skill classes are provided for underserved members of the
community. He continues to be active in the legal profession, such as helping a private
community secure an agreement to dedicate its infrastructure to the local municipality.
Harlan obtained a B.A. from Brigham Young University and a Juris Doctorate from the
University of Minnesota. He resides in Provo, Utah with his wife RaDene.`,
      category: 'Secretary',
    }
  ];

export function WWALeadership() {
  const [opened, { close, open }] = useDisclosure(false);
  console.log(NinaHeadshot)

  const items = features.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon
        size={44}
        radius="md"
        variant="gradient"
        gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
      >
        <feature.icon style={{ width: rem(26), height: rem(26) }} stroke={1.5} />
      </ThemeIcon>
      <Text fz="lg" mt="sm" fw={500}>
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm">
        {feature.description}
      </Text>
    </div>
  ));

  return (
    <div className={classes.wrapper}>
<Grid mb={150} gutter={80}>
  <Grid.Col span={{ base: 12, md: 5 }}>
    <Title className={classes.title} order={2}>
      MCSU Leadership Team
    </Title>

  </Grid.Col>

  <Grid.Col span={{ base: 12, md: 7 }}>
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing={30}>
      {data.map((user, index) => (
        <UserInfoIcons onOpen={open} key={index} name={user.name} title={user.category} description={user.description} role={user.category} img={user.image}  opened={opened} onClose={close} />
      ))}
    </SimpleGrid>
  </Grid.Col>
</Grid>

    </div>
  );
}
