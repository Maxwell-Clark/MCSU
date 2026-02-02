import { render, screen, userEvent, waitFor } from '@/test-utils';
import { MindfulnessOfBreathing } from './Breathing';

describe('MindfulnessOfBreathing', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<MindfulnessOfBreathing />);
      expect(screen.getByText('Mindfulness of Breathing')).toBeInTheDocument();
    });

    it('renders accordion sections', () => {
      render(<MindfulnessOfBreathing />);
      expect(screen.getByText('Posture & Relaxation')).toBeInTheDocument();
      expect(screen.getByText('Anchor Points')).toBeInTheDocument();
      expect(screen.getByText('Wandering Mind & Core Practice')).toBeInTheDocument();
    });
  });

  describe('Accordion Structure', () => {
    it('has accordion elements', () => {
      const { container } = render(<MindfulnessOfBreathing />);
      const accordion = container.querySelector('.mantine-Accordion-root');
      expect(accordion).toBeInTheDocument();
    });
  });
});
