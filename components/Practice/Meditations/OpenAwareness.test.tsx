import { render, screen, userEvent, waitFor } from '@/test-utils';
import { OpenAwareness } from './OpenAwareness';

describe('OpenAwareness', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<OpenAwareness />);
      expect(screen.getByText('Open Awareness Meditation')).toBeInTheDocument();
    });

    it('renders accordion sections', () => {
      render(<OpenAwareness />);
      expect(screen.getByText('Settling In')).toBeInTheDocument();
      expect(screen.getByText('Transitioning into Open Awareness')).toBeInTheDocument();
      expect(screen.getByText('Support & Self-Kindness')).toBeInTheDocument();
    });
  });

  describe('Accordion Structure', () => {
    it('has accordion elements', () => {
      const { container } = render(<OpenAwareness />);
      const accordion = container.querySelector('.mantine-Accordion-root');
      expect(accordion).toBeInTheDocument();
    });
  });
});
