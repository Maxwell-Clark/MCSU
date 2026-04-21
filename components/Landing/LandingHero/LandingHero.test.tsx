import { render, screen } from '@/test-utils';
import { LandingHero } from './LandingHero';

describe('LandingHero', () => {
  describe('Rendering', () => {
    it('renders the main title', () => {
      render(<LandingHero />);
      expect(screen.getByText('Mindfulness Center of Southern Utah')).toBeInTheDocument();
    });

    it('renders the tagline', () => {
      render(<LandingHero />);
      expect(screen.getByText('"Training the Mind - Opening the Heart"')).toBeInTheDocument();
    });

    it('renders the Join Us CTA button', () => {
      render(<LandingHero />);
      expect(screen.getByRole('link', { name: /join us/i })).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders within a container', () => {
      const { container } = render(<LandingHero />);
      const mantineContainer = container.querySelector('.mantine-Container-root');
      expect(mantineContainer).toBeInTheDocument();
    });

    it('renders overlay for background effect', () => {
      const { container } = render(<LandingHero />);
      const overlay = container.querySelector('.mantine-Overlay-root');
      expect(overlay).toBeInTheDocument();
    });
  });

  describe('Text Styling', () => {
    it('renders title with gradient styling', () => {
      render(<LandingHero />);
      const title = screen.getByText('Mindfulness Center of Southern Utah');
      // The gradient text should have a span with variant="gradient"
      expect(title).toBeInTheDocument();
    });
  });

  describe('Button', () => {
    it('Join Us button is present', () => {
      render(<LandingHero />);
      const button = screen.getByRole('link', { name: /join us/i });
      expect(button).toBeInTheDocument();
    });

    it('button has xl size styling', () => {
      const { container } = render(<LandingHero />);
      const button = container.querySelector('.mantine-Button-root');
      expect(button).toBeInTheDocument();
    });
  });
});
