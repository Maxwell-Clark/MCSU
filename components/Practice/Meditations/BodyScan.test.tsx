import { render, screen, userEvent, waitFor } from '@/test-utils';
import { BodyScan } from './BodyScan';

describe('BodyScan', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<BodyScan />);
      expect(screen.getByText('A Journey Through the Body – A Body Scan')).toBeInTheDocument();
    });

    it('renders accordion sections', () => {
      render(<BodyScan />);
      expect(screen.getByText('What & Why')).toBeInTheDocument();
      // "Focusing our attention" appears both as accordion label and card title
      expect(screen.getAllByText('Focusing our attention').length).toBeGreaterThan(0);
      expect(screen.getByText('How to Practice a Body Scan')).toBeInTheDocument();
    });
  });

  describe('Accordion Structure', () => {
    it('has accordion elements', () => {
      const { container } = render(<BodyScan />);
      const accordion = container.querySelector('.mantine-Accordion-root');
      expect(accordion).toBeInTheDocument();
    });
  });
});
