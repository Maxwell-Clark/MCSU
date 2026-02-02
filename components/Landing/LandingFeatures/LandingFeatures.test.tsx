import { render, screen } from '@/test-utils';
import { LandingFeatures, Feature } from './LandingFeatures';
import { IconGauge } from '@tabler/icons-react';

describe('LandingFeatures', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<LandingFeatures />);
      expect(screen.getByText('Sit. Be Still. Breathe.')).toBeInTheDocument();
    });

    it('renders the description', () => {
      render(<LandingFeatures />);
      expect(
        screen.getByText(/In the midst of daily life, there are countless opportunities/)
      ).toBeInTheDocument();
    });

    it('renders all feature items', () => {
      render(<LandingFeatures />);
      expect(screen.getByText('Find Balance')).toBeInTheDocument();
      expect(screen.getByText('Embrace Awareness')).toBeInTheDocument();
      expect(screen.getByText('Nourish Yourself')).toBeInTheDocument();
      expect(screen.getByText('Practice Gratitude')).toBeInTheDocument();
      expect(screen.getByText('Connect with Others')).toBeInTheDocument();
    });

    it('renders feature descriptions', () => {
      render(<LandingFeatures />);
      expect(
        screen.getByText(/Create a space for inner calm and strength/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/In every moment, there/)
      ).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders features in a grid', () => {
      const { container } = render(<LandingFeatures />);
      const grid = container.querySelector('.mantine-SimpleGrid-root');
      expect(grid).toBeInTheDocument();
    });
  });
});

describe('Feature', () => {
  it('renders feature with props', () => {
    render(
      <Feature
        icon={IconGauge}
        title="Test Title"
        description="Test Description"
      />
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });
});
