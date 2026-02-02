import { render, screen, userEvent, waitFor } from '@/test-utils';
import { Walking } from './Walking';

describe('Walking', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<Walking />);
      expect(screen.getByText('Mindful Walking')).toBeInTheDocument();
    });

    it('renders accordion sections', () => {
      render(<Walking />);
      expect(screen.getByText('Postures and Directions')).toBeInTheDocument();
      expect(screen.getByText('Attention & Awareness')).toBeInTheDocument();
      expect(screen.getByText('Wandering Mind, Distance, & Speed')).toBeInTheDocument();
    });
  });

  describe('Accordion Structure', () => {
    it('has accordion elements', () => {
      const { container } = render(<Walking />);
      const accordion = container.querySelector('.mantine-Accordion-root');
      expect(accordion).toBeInTheDocument();
    });
  });
});
