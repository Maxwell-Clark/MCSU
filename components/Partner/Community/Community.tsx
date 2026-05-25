'use client';
import { Title, Text, Container, Paper, Stack, useMantineTheme, Image } from '@mantine/core';
import SuviLogo from '@/assets/img/suvi_logo.png';
import classes from './Community.module.css';

const partners = [
  {
    name: 'SwitchPoint',
    logo: 'https://southernutahcares.com/wp-content/uploads/2014/07/SwitchPointLogo.png',
    href: 'https://switchpoint.org/',
  },
  {
    name: 'Southern Utah Veterans Home',
    logo: SuviLogo.src,
    href: 'https://avalonhealthcare.com/ivins/',
  },
];

export function Community() {
  const theme = useMantineTheme();

  return (
    <Container size="xl" py="xl">
      <Paper 
        shadow="sm" 
        radius="md" 
        p="xl" 
        withBorder
        style={{ 
          backgroundColor: theme.colors.blue[0],
          borderLeft: `4px solid ${theme.colors.blue[6]}`
        }}
      >
        <Stack gap="xl">
          <div>
            <Title className={classes.title} order={2} ta="center">
              Community Partnerships
            </Title>
            <Text c="dimmed" className={classes.description} ta="center" mt="md">
              We are proud to partner with a variety of organizations and individuals to bring our programs to the community.
              Our partners include local businesses, schools, and civic organizations. Together, we are working to create a more mindful and compassionate community.
            </Text>
          </div>

          {partners.map((partner) => (
            <Paper
              key={partner.name}
              shadow="sm"
              radius="md"
              p="xl"
              withBorder
              style={{
                backgroundColor: theme.white,
                maxWidth: 800,
                margin: '0 auto'
              }}
            >
              <a
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block' }}
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fit="contain"
                  w={280}
                  style={{ margin: '0 auto' }}
                />
              </a>
            </Paper>
          ))}
        </Stack>
      </Paper>
    </Container>
  );
}