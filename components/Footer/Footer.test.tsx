import { render, screen } from '@/test-utils';
import { Footer } from './Footer';

describe('Footer', () => {
  describe('Rendering', () => {
    it('renders the brand text', () => {
      render(<Footer />);
      expect(screen.getByText('Mindfulness Center of Southern Utah')).toBeInTheDocument();
    });

    it('renders social media icons', () => {
      const { container } = render(<Footer />);

      // Check for Tabler icons by their SVG class
      const icons = container.querySelectorAll('.tabler-icon');
      expect(icons.length).toBe(3);
    });

    it('renders Twitter icon', () => {
      const { container } = render(<Footer />);
      const twitterIcon = container.querySelector('.tabler-icon-brand-twitter');
      expect(twitterIcon).toBeInTheDocument();
    });

    it('renders YouTube icon', () => {
      const { container } = render(<Footer />);
      const youtubeIcon = container.querySelector('.tabler-icon-brand-youtube');
      expect(youtubeIcon).toBeInTheDocument();
    });

    it('renders Instagram icon', () => {
      const { container } = render(<Footer />);
      const instagramIcon = container.querySelector('.tabler-icon-brand-instagram');
      expect(instagramIcon).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders action icons as buttons', () => {
      render(<Footer />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(3);
    });

    it('renders within a container', () => {
      const { container } = render(<Footer />);
      const footerContainer = container.querySelector('.mantine-Container-root');
      expect(footerContainer).toBeInTheDocument();
    });
  });
});
