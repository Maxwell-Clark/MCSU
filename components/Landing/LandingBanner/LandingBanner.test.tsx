import { render, screen, userEvent } from '@/test-utils';
import { LandingBanner } from './LandingBanner';

describe('LandingBanner', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<LandingBanner />);
      expect(screen.getByText('Sit With Us...')).toBeInTheDocument();
    });

    it('renders newsletter text', () => {
      render(<LandingBanner />);
      expect(screen.getByText('Subscribe to our newsletter!')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<LandingBanner />);
      expect(
        screen.getByText(/Stay connected with moments of mindfulness and clarity/)
      ).toBeInTheDocument();
    });

    it('renders email input', () => {
      render(<LandingBanner />);
      expect(screen.getByPlaceholderText('Your email')).toBeInTheDocument();
    });

    it('renders subscribe button', () => {
      render(<LandingBanner />);
      expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('email input is interactive', () => {
      render(<LandingBanner />);
      const input = screen.getByPlaceholderText('Your email');
      expect(input).not.toBeDisabled();
    });
  });
});
