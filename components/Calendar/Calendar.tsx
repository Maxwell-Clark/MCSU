import { Calendar } from '@mantine/dates';
import { Indicator, Tooltip, Grid, Box, Text } from '@mantine/core';

// dayOfWeek values: Sunday = 0, Monday = 1, Tuesday = 2, Wednesday = 3,
// Thursday = 4, Friday = 5, Saturday = 6
const classSchedule = {
  // Monday
  1: [
    { label: 'Monday Mindfulness: 9AM-10AM', color: 'red' },
    { label: 'Breathwork: 11AM-11:15AM', color: 'orange' },
  ],
  // Wednesday
  3: [
    { label: 'Intro to Meditation: 9AM-10AM', color: 'indigo' },
  ],
  // Friday
  5: [
    { label: 'MBSR: 9AM-10AM', color: 'green' },
    { label: 'Yoga: 11AM-12AM', color: 'teal' },
  ],
};

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function ClassCalendar() {
  return (
    <Grid
      justify="center"         // Centers columns horizontally
      align="center"           // Centers columns vertically (in row)
      style={{ margin: '0 auto', maxWidth: 1200 }}
      gutter="xl"
    >
      {/* LEFT COLUMN: CALENDAR */}
      <Grid.Col style={{ textAlign: 'center' }} span={{ base: 12, md: 6 }}>
        <Calendar
          renderDay={(date) => {
            const dayOfWeek = date.getDay(); // 0–6
            const classes = classSchedule[dayOfWeek] || [];

            if (classes.length === 0) {
              return <div>{date.getDate()}</div>;
            }

            const tooltipContent = (
              <div>
                {classes.map((c, i) => (
                  <div key={i}>{c.label}</div>
                ))}
              </div>
            );

            const indicatorColor = classes[0].color;

            return (
              <Tooltip withArrow withinPortal label={tooltipContent}>
                <Indicator color={indicatorColor} offset={-2} size={6}>
                  <div>{date.getDate()}</div>
                </Indicator>
              </Tooltip>
            );
          }}
        />
      </Grid.Col>

      {/* RIGHT COLUMN: LIST OF CLASSES BY WEEKDAY */}
      <Grid.Col style={{ textAlign: 'center' }} span={{ base: 12, md: 6 }}>
        {Object.entries(classSchedule).map(([dayOfWeek, classes]) => {
          const dayOfWeekNum = Number(dayOfWeek);
          // Use the first class's color for the day name text:
          const firstClassColor = classes[0].color;

          return (
            <Box key={dayOfWeek} mb="md" p="md" style={{ textAlign: 'left' }}>
              {/* Day name in the same color as the first class’s indicator */}

              <Text fw="bold" mb="xs" style={{ width: '40%', justifyContent: 'center' }}>
                {dayNames[dayOfWeekNum]}
              </Text>


              {/* Then list each class with its own indicator color */}
              {classes.map((c, index) => (
                <Box
                  key={index}
                  mb={4}
                >              <Indicator color={firstClassColor} size={6} />

                <Box>             
                {c.label}</Box>
                  
                </Box>
              ))}
            </Box>
          );
        })}
      </Grid.Col>
    </Grid>
  );
}
