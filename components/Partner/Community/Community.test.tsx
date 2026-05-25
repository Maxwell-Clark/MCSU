import { render, screen } from '@/test-utils';
import { Community } from './Community';

describe('Community', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<Community />);
      expect(screen.getByText('Community Partnerships')).toBeInTheDocument();
    });

    it('renders the description', () => {
      render(<Community />);
      expect(
        screen.getByText(/We are proud to partner with a variety of organizations/)
      ).toBeInTheDocument();
    });

  });

  describe('Images', () => {
    it('renders the SwitchPoint logo', () => {
      render(<Community />);
      const image = screen.getByAltText('SwitchPoint');
      expect(image).toBeInTheDocument();
    });

    it('renders the Southern Utah Veterans Home logo', () => {
      render(<Community />);
      const image = screen.getByAltText('Southern Utah Veterans Home');
      expect(image).toBeInTheDocument();
    });
  });

  describe('Partner links', () => {
    it('links the SwitchPoint logo to switchpoint.org', () => {
      render(<Community />);
      const link = screen.getByAltText('SwitchPoint').closest('a');
      expect(link).toHaveAttribute('href', 'https://switchpoint.org/');
    });

    it('links the Southern Utah Veterans Home logo to avalonhealthcare.com/ivins', () => {
      render(<Community />);
      const link = screen.getByAltText('Southern Utah Veterans Home').closest('a');
      expect(link).toHaveAttribute('href', 'https://avalonhealthcare.com/ivins/');
    });
  });

  describe('Layout', () => {
    it('renders within a container', () => {
      const { container } = render(<Community />);
      const mantineContainer = container.querySelector('.mantine-Container-root');
      expect(mantineContainer).toBeInTheDocument();
    });

    it('renders paper components', () => {
      const { container } = render(<Community />);
      const papers = container.querySelectorAll('.mantine-Paper-root');
      expect(papers.length).toBeGreaterThan(0);
    });
  });
});
