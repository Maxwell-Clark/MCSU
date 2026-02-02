import { render, screen, userEvent, waitFor } from '@/test-utils';
import { LovingKindness } from './LovingKindness';

describe('LovingKindness', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<LovingKindness />);
      expect(screen.getByText('Loving-Kindness Meditation')).toBeInTheDocument();
    });

    it('renders accordion sections', () => {
      render(<LovingKindness />);
      expect(screen.getByText('Beginning the Practice')).toBeInTheDocument();
      expect(screen.getByText('Loving-Kindness Phrases')).toBeInTheDocument();
      expect(screen.getByText('Turning Inward')).toBeInTheDocument();
      expect(screen.getByText('Expanding the Circle')).toBeInTheDocument();
      expect(screen.getByText('Flexibility in Practice')).toBeInTheDocument();
    });
  });

  describe('Accordion Structure', () => {
    it('has accordion elements', () => {
      const { container } = render(<LovingKindness />);
      const accordion = container.querySelector('.mantine-Accordion-root');
      expect(accordion).toBeInTheDocument();
    });
  });
});
