'use client';
import { Title, Text, Container, Paper, Stack, useMantineTheme, Image } from '@mantine/core';
import classes from './Community.module.css';

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

          <Paper 
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
            <Stack gap="md">
              <Image
                src="https://southernutahcares.com/wp-content/uploads/2014/07/SwitchPointLogo.png"
                alt="SwitchPoint"
                fit="contain"
                h={100}
                style={{ objectFit: 'contain' }}
              />
              <Title order={3} className={classes.title} c={theme.colors.dark[7]}>
                SwitchPoint
              </Title>
              <Text size="lg" c="dimmed"> 
              Beyond food and shelter Switchpoint Community Resource Center is a stepping stone to independence for individuals experiencing homelessness. A switch point is a mechanism on a train track that with a little bit of a turn sends the train in a completely different direction. Switchpoint offers tools to get life back on track for those who need it most. 
              <br/> <br />
              MCSU has developed a curriculum specifically designed to share mindfulness with the unhoused.  Through Switchpoint's partnership with MCSU, we are sharing mindfulness to its clients.
              </Text>
              <Text size="sm" c="dimmed">
              Changing the Face of Poverty
              </Text>
            </Stack>
          </Paper>
        </Stack>
      </Paper>
    </Container>
  );
}