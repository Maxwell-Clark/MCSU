'use client';
import { Title, Text, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import classes from './WWALeadership.module.css';
import Generic from '@/assets/img/generic.png';
import GaelHeadshot from '@/assets/img/gael_headshot.jpg';
import type { StaticImageData } from 'next/image';

interface TeamMember {
  image: string | StaticImageData;
  name: string;
  category: string;
  description: string;
}

const data: TeamMember[] = [
  {
    image: Generic,
    name: 'Kirk A. Benson',
    category: 'President & Chairman',
    description: 'With Gael\'s support and direction, I\'ve developed a keen interest in providing mindfulness programs in the community where we live. I\'ve received training to teach mindfulness based stress reduction through Brown University and have completed the Mindfulness Meditation Teacher Certification Program with Tara Barach and Jack Kornfield. But most importantly, I\'ve developed a consistent personal practice.'
  },
  {
    image: Generic,
    name: 'David Tate',
    description: `Dr. David Tate is a psychologist in St. George, Utah, where he has been in private practice for over 25 years. He serves on the Board of Directors for the Mindfulness Center of Southern Utah.

From 1990-1995 Dr. Tate helped establish, taught Mindfulness-based Stress Reduction (MBSR) classes, and conducted research for the Stress Reduction Clinic at IHC Hospitals in Salt Lake City, Utah. The program was one of the first of now several hundred programs worldwide patterned after the University of Massachusetts Medical Center Stress Reduction Program developed by his mentor, Dr. Jon Kabat-Zinn, who said at the time that it was "the oldest, largest and best replication of our program." His doctoral dissertation at IHC was an early contribution to the now large body of thousands of research studies supporting the significant and substantial mental, emotional and physical health benefits usually realized by MBSR group participants.

Dr. David Tate has taught mindfulness principles and practices to thousands of people over the past 35 years in a wide variety of settings, locally and nationally. He helped establish the first "mindfulness-based" health and wellness resort, Miraval, Life in Balance, in 1995 as the Lead Mindfulness Teacher and later as the Program Director. He has provided consultations and mindfulness trainings for many businesses and organizations including Nike, Ernst and Young, New Line Cinema, Abbott Laboratories, AT&T, the National Make-A-Wish Foundation, Zion National Park, and the NCAA.`,
    category: 'Vice Chair',
  },
  {
    image: GaelHeadshot.src,
    name: 'Alieta Gael Benson',
    description: 'I have been a practicing mother for 50 years. I\'ve discovered the importance of paying attention to what I experience – my friends, family, and community. A few years ago, I had the opportunity to visit with the Dalai Lama at his home and temple compound in Dharamsala, India. Western scientists specializing in K-12 education presented to the Dalai Lama their research on the impact of mindfulness in education. The Dalai Lama provided feedback in dialogue with the scientists. I was very impressed with the benefits mindfulness can provide our children and have since been a firm supporter of making mindfulness widely accessible. Our efforts at the Mindfulness Center of Southern Utah is to that end.',
    category: 'Treasurer',
  },
  {
    image: Generic,
    name: 'Harlan M. Hatfield',
    description: `Harlan was elected to the board of directors of the Mindfulness Center of Southern Utah in 2025 and also serves as Secretary to the organization.

Professionally, Harlan M. Hatfield served as legal counsel and as an officer of a publicly traded corporation between 1996 and 2017. His activities included project development, intellectual property, licensing, acquisitions, divestitures, and financing. He oversaw the legal staff and outside legal counsel, litigation, regulatory issues, contracts and he advised the officers and board of directors of the business. Prior to his corporate law career, Harlan was in private practice at a Seattle law firm where he was a partner.

In recent years, Harlan has served in various community and non-profit organizations. He and his wife served a full-time mission in Saint Louis, Missouri for the Church of Jesus Christ of Latter-day Saints. He was a founding director of the My Hometown Community Resource Center in Provo, Utah, where life skill classes are provided for underserved members of the community. He continues to be active in the legal profession, such as helping a private community secure an agreement to dedicate its infrastructure to the local municipality.

Harlan obtained a B.A. from Brigham Young University and a Juris Doctorate from the University of Minnesota. He resides in Provo, Utah with his wife RaDene.`,
    category: 'Secretary',
  }
];

export function WWALeadership() {
  const [opened, { close, open }] = useDisclosure(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const handleCardClick = (member: TeamMember) => {
    setSelectedMember(member);
    open();
  };

  const getImageSrc = (image: string | StaticImageData): string => {
    return typeof image === 'string' ? image : image.src;
  };

  return (
    <div className={classes.wrapper}>
      {/* Floating gradient orbs */}
      <div className={classes.orbContainer}>
        <div className={`${classes.orb} ${classes.orb1}`} />
        <div className={`${classes.orb} ${classes.orb2}`} />
        <div className={`${classes.orb} ${classes.orb3}`} />
      </div>

      <div className={classes.content}>
        <Title className={classes.title} order={2}>
          MCSU Leadership Team
        </Title>
        <div className={classes.titleUnderline} />

        <div className={classes.grid}>
          {data.map((member, index) => (
            <div
              key={index}
              className={classes.card}
              onClick={() => handleCardClick(member)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(member)}
            >
              <div className={classes.avatarWrapper}>
                <img
                  src={getImageSrc(member.image)}
                  alt={member.name}
                  className={classes.avatar}
                />
              </div>
              <Text className={classes.name}>{member.name}</Text>
              <Text className={classes.role}>{member.category}</Text>
              <Text className={classes.bio}>{member.description}</Text>
              <Text className={classes.readMore}>Read More</Text>
            </div>
          ))}
        </div>
      </div>

      <Modal
        opened={opened}
        onClose={close}
        size="lg"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        withCloseButton
        title=""
      >
        {selectedMember && (
          <div className={classes.modalContent}>
            <img
              src={getImageSrc(selectedMember.image)}
              alt={selectedMember.name}
              className={classes.modalAvatar}
            />
            <Text className={classes.modalName}>{selectedMember.name}</Text>
            <Text className={classes.modalRole}>{selectedMember.category}</Text>
            <Text className={classes.modalBio}>{selectedMember.description}</Text>
          </div>
        )}
      </Modal>
    </div>
  );
}
