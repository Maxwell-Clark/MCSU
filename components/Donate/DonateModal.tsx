'use client';

import { createContext, useContext, useEffect } from 'react';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './DonateModal.module.css';

const GIVEBUTTER_URL = 'https://givebutter.com/mcsu-donate-v7kc8r';

type DonateModalContextType = {
  open: () => void;
};

const DonateModalContext = createContext<DonateModalContextType>({ open: () => {} });

export function useDonateModal() {
  return useContext(DonateModalContext);
}

export function DonateModalProvider({ children }: { children: React.ReactNode }) {
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (opened) {
      window.Givebutter?.init();
    }
  }, [opened]);

  return (
    <DonateModalContext.Provider value={{ open }}>
      {children}
      <Modal
        opened={opened}
        onClose={close}
        title="Support Our Mission"
        size="lg"
        centered
        zIndex={1000}
        classNames={{
          title: classes.modalTitle,
          body: classes.modalBody,
          header: classes.modalHeader,
          content: classes.modalContent,
        }}
      >
        <div className={classes.widgetWrapper}>
          <givebutter-widget id="gKwwRg"></givebutter-widget>
        </div>
        <a
          href={GIVEBUTTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.externalLink}
        >
          Open full donation page &rarr;
        </a>
      </Modal>
    </DonateModalContext.Provider>
  );
}
