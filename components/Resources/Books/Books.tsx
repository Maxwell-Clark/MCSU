'use client';

import React from 'react';
import { Paper, Text, Title, Button, Image, Stack, Box } from '@mantine/core';
import classes from './Books.module.css';

interface BookProps {
  image: string;
  title: string;
  description: string;
  link: string;
}

function BookCard({ image, title, description, link }: BookProps) {
  return (
    <Paper shadow="md" p="md" radius="md" className={classes.card}>
      <Stack>
        <Image src={image} alt={title} height={460} fit="contain" radius="md" />
        <Text className={classes.category} size="xs" color="dimmed">
          {description}
        </Text>
        <Title order={4} className={classes.title}>
          {title}
        </Title>
        <div className={classes.btn_wrapper}>
          <Button variant="outline" className={classes.order_button} onClick={() => window.open(link, '_blank')}>
            Order on Amazon
          </Button>
        </div>
      </Stack>
    </Paper>
  );
}

  const data = [
    {
      image:'https://m.media-amazon.com/images/I/51AACr+UbYL.jpg',
      title: 'The Miracle of Mindfulness',
      description: 'A classic introduction to mindfulness practice by Thich Nhat Hanh, emphasizing the importance of being fully present in each moment.',
      link: 'https://www.amazon.com/Miracle-Mindfulness-Introduction-Practice-Meditation/dp/0807012394/ref=sr_1_1?crid=2V8NKY4RJCZ51&dib=eyJ2IjoiMSJ9.HCfISDM2eRqsCxrcCDZPe208istlNjhHxZo8bh9F1Fjy1fxRDMAuLFalx49crdRxn4-8_xuTVsrfM6iXDHXTCURbGzaZuHJMxgomC0BKAIYrYzD_sdGxAc_PIqOwu5pU9K6ls9Y6AglXRoF_UiM1FKJlZdjnm2ADc4Xo-j4M8F7VCCSA2fFoEd5-feWRZdD7i9TGPKgh5XqVG-FdK7OerWUcp3I105DnK1YpK-ipyA8.aCh0DPW1Wvh_8FkeUl1w_gdplgGiTqvGKoO2qQtD-N0&dib_tag=se&keywords=the+miracle+of+mindfulness+thich+nhat+hanh&qid=1731589473&s=books&sprefix=the+miracle+of+mind%2Cstripbooks%2C126&sr=1-1'
    },
    {
      image: 'https://m.media-amazon.com/images/I/81YGcWlDmUL.jpg',
      title: 'Wherever You Go, There You Are',
      description: 'Jon Kabat-Zinn’s guide to mindfulness, encouraging readers to find peace and presence in their everyday lives.',
      link: 'https://www.amazon.com/Wherever-You-There-Are-ROUGH/dp/B002E8JGCY/ref=sr_1_4?crid=1V5M1X3LUC3E8&dib=eyJ2IjoiMSJ9.BKDG8_aTXsoyfSH7HTWwjbtEZlnm5UAvy_zV_XEykSzUTMQ_-azeSMboQYhfZS8wFyLtB1RjzfeBGq9PbpqpBbWQa6BNU_SbJNx-zubcGVM09gTi6hrfyOWkuCBKTFOUGuLiY7wsVOHZYcYVgdutEh9z-JtwUgr6cTsEsR9cMagVyDTC-aghXkl18Rm__j4to14ZWUEjpkl4l1wkuX5unD1wLLW_xA-sZ-uaeOWqfek.eg_Uk-Z18c7l-zhVPND4bbPOEgCA-K_0apyllDieKds&dib_tag=se&keywords=wherever+you+go+there+you+are&qid=1731589447&s=books&sprefix=wherever+you+go+%2Cstripbooks%2C119&sr=1-4'

    },
    {
      image: 'https://m.media-amazon.com/images/I/91tPhKZAZIL._UF1000,1000_QL80_.jpg',
      title: 'Radical Acceptance',
      description: 'Tara Brach explores how mindfulness and self-compassion can lead to true inner freedom and peace.',
      link: 'https://www.amazon.com/Radical-Acceptance-Awakening-Heals-Shame/dp/0712601457/ref=sr_1_4?crid=20VZ7LWQ1NDPE&dib=eyJ2IjoiMSJ9.Sq0Bhq9FyGSYTMPIeu1JEzeKCcsR3GVYvi70DKq1RJNDBdwIQd7IMU08NNJjW2GAxPPSo20bL0GQR9VbfX3uPslqL3f_zVUT9MbozSsckWhUNPnpSQbUgmz8-6MSCCd9qFH4RXVXUaS4QJ1bH1u4gCk1qpqiGygLaRo6N--1z4PaxUkBjqL161pP7hYqXGAHehONvjr4--NryS_QDi6Ysg-HYwsjyb1KEPZIT9hgGzk.GFjHr_40J6_FH7QZNFk9PPKBi-IJbLxG8QRCJDDrkuw&dib_tag=se&keywords=radical+acceptance&qid=1731589419&s=books&sprefix=radical+acc%2Cstripbooks%2C123&sr=1-4'
    },
    {
      image: 'https://m.media-amazon.com/images/I/41RsOoojQXL._AC_UF1000,1000_QL80_.jpg',
      title: '10% Happier',
      description: 'Dan Harris shares his journey to mindfulness and meditation, showing how they helped him reduce stress and find happiness.',
      link: 'https://www.amazon.com/10-Happier-10th-Anniversary-Works/dp/0063356473/ref=sr_1_1?crid=3T9F13UGEIP7I&dib=eyJ2IjoiMSJ9.BeBYQ4MjyNm9fgIAAoVpxNZDSA0LIkJ7242JYtSnN75a47-Wku1MUkEgsik9ex4HqyvBiKAkRV70y7sxfGzINubUpDtCHA1cKa4UmLisBzfAmF3XbzKgMlC_qomWze7eLX2p1DHNNDujoocqZ3RLsAfF4KzHpUSajcTgB1Ltv9rQehFQPAAZiK-VfXf1RowHezTrcLn0t5hCO50MphlRAxa5Dl7xgO61YoPjIX8V1q4.v3m0VGWKYCrpOzJ2TCv21dBIxjMciKAb5--bvD7jWvE&dib_tag=se&keywords=10%25+happier&qid=1731589395&s=books&sprefix=10%25+happier%2Cstripbooks%2C117&sr=1-1'

    },
    {
      image: 'https://m.media-amazon.com/images/I/71JXXfZWFqL._AC_UF1000,1000_QL80_.jpg',
      title: 'Mindfulness in Plain English',
      description: 'Bhante Henepola Gunaratana’s practical guide to mindfulness, offering clear instructions for beginners.',
      link: 'https://www.amazon.com/Mindfulness-English-Bhante-Henepola-Gunaratana/dp/0861719069/ref=asc_df_0861719069?mcid=1a53b7e5d9d532d1b98dd4fdefd76d1e&tag=hyprod-20&linkCode=df0&hvadid=693684531569&hvpos=&hvnetw=g&hvrand=7417516015723011421&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9025810&hvtargid=pla-434733098343&psc=1'
    },
  ];
  

export function Books() {
  return (
    <div className={classes.wrapper}>
      <Title ta="center" className={classes.title} >Books</Title>
      <Stack>
        {data.map((item, index) => (
          <BookCard key={index} {...item} />
        ))}
      </Stack>
    </div>
  );
}
