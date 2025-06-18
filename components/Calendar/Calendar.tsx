import { Calendar } from '@mantine/dates';
import { Indicator, Tooltip, Grid, Box, Text, Paper, Stack, Title, Group } from '@mantine/core';
import { IconCalendar, IconClock } from '@tabler/icons-react';

// dayOfWeek values: Sunday = 0, Monday = 1, Tuesday = 2, Wednesday = 3,
// Thursday = 4, Friday = 5, Saturday = 6
const classSchedule = {
  // Monday
  1: [
    { label: 'Monday Mindfulness', time: '9:00 AM - 10:00 AM', color: 'blue' },
    { label: 'Breathwork', time: '11:00 AM - 11:15 AM', color: 'cyan' },
  ],
  // Wednesday
  3: [
    { label: 'Intro to Meditation', time: '9:00 AM - 10:00 AM', color: 'indigo' },
  ],
  // Friday
  5: [
    { label: 'MBSR', time: '9:00 AM - 10:00 AM', color: 'violet' },
    { label: 'Yoga', time: '11:00 AM - 12:00 PM', color: 'grape' },
  ],
};

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function ClassCalendar() {
  return (
    <Grid
      justify="center"
      align="stretch"
      style={{ margin: '0 auto', maxWidth: 1200 }}
      gutter="xl"
    >
      {/* LEFT COLUMN: CALENDAR */}
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Paper shadow="sm" p="md" radius="md" withBorder>
          <Group mb="md">
            <IconCalendar size={24} />
            <Title order={3}>Class Schedule</Title>
          </Group>
          <Calendar
            size="lg"
            styles={{
              calendarHeader: {
                marginBottom: '1rem'
              },
              calendarHeaderControl: {
                fontSize: '1.1rem'
              },
              calendarHeaderLevel: {
                fontSize: '1.1rem'
              },
              monthCell: {
                fontSize: '1.1rem'
              },
              day: {
                fontSize: '1rem',
                height: '2.5rem'
              }
            }}
            renderDay={(date) => {
              const dayOfWeek = date.getDay();
              const classes = classSchedule[dayOfWeek] || [];

              if (classes.length === 0) {
                return <div>{date.getDate()}</div>;
              }

              const tooltipContent = (
                <Stack gap="xs">
                  {classes.map((c, i) => (
                    <Group key={i} gap="xs">
                      <Indicator color={c.color} size={8} />
                      <Text size="sm" fw={500}>{c.label}</Text>
                      <Text size="xs" c="dimmed">{c.time}</Text>
                    </Group>
                  ))}
                </Stack>
              );

              return (
                <Tooltip withArrow withinPortal label={tooltipContent}>
                  <Indicator color={classes[0].color} offset={-2} size={8}>
                    <div>{date.getDate()}</div>
                  </Indicator>
                </Tooltip>
              );
            }}
          />
        </Paper>
      </Grid.Col>

      {/* RIGHT COLUMN: LIST OF CLASSES BY WEEKDAY */}
      <Grid.Col span={{ base: 12, md: 6 }}>
        <Paper shadow="sm" p="md" radius="md" withBorder>
          <Group mb="md">
            <IconClock size={24} />
            <Title order={3}>Weekly Schedule</Title>
          </Group>
          <Stack gap="md">
            {Object.entries(classSchedule).map(([dayOfWeek, classes]) => {
              const dayOfWeekNum = Number(dayOfWeek);
              const firstClassColor = classes[0].color;

              return (
                <Box key={dayOfWeek} p="md" style={{ 
                  borderLeft: `4px solid var(--mantine-color-${firstClassColor}-6)`,
                  backgroundColor: `var(--mantine-color-${firstClassColor}-0)`
                }}>
                  <Text fw={700} size="lg" mb="xs" c={`${firstClassColor}.9`}>
                    {dayNames[dayOfWeekNum]}
                  </Text>
                  <Stack gap="xs">
                    {classes.map((c, index) => (
                      <Group key={index} gap="xs">
                        <Indicator color={c.color} size={8} />
                        <Box>
                          <Text fw={600} c="dark.7">{c.label}</Text>
                          <Text size="sm" c="dimmed">{c.time}</Text>
                        </Box>
                      </Group>
                    ))}
                  </Stack>
                </Box>
              );
            })}
          </Stack>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}
