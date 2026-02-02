import { render, screen } from '@/test-utils';
import { LandingOfferings } from './LandingOfferings';

describe('LandingOfferings', () => {
  describe('Rendering', () => {
    it('renders the badge', () => {
      render(<LandingOfferings />);
      expect(screen.getByText('Be Here Now')).toBeInTheDocument();
    });

    it('renders the title', () => {
      render(<LandingOfferings />);
      expect(screen.getByText('Join us During Our Offerings')).toBeInTheDocument();
    });

    it('renders the description', () => {
      render(<LandingOfferings />);
      expect(
        screen.getByText(/We meet regularly to discuss meditation and mindfulness topics/)
      ).toBeInTheDocument();
    });

    it('renders feature cards', () => {
      render(<LandingOfferings />);
      expect(screen.getByText('Enhanced Focus')).toBeInTheDocument();
      expect(screen.getByText('Inner Peace')).toBeInTheDocument();
      expect(screen.getByText('Judgment-Free Awareness')).toBeInTheDocument();
    });

    it('renders feature descriptions', () => {
      render(<LandingOfferings />);
      expect(
        screen.getByText(/Mindfulness trains your brain to stay present/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Practicing mindfulness allows you to connect deeply/)
      ).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders cards in a grid', () => {
      const { container } = render(<LandingOfferings />);
      const grid = container.querySelector('.mantine-SimpleGrid-root');
      expect(grid).toBeInTheDocument();
    });
  });
});
