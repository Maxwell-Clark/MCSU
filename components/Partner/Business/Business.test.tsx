import { render, screen } from '@/test-utils';
import { Business } from './Business';

describe('Business', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<Business />);
      expect(screen.getByText('Business Partnerships')).toBeInTheDocument();
    });

    it('renders the description', () => {
      render(<Business />);
      expect(
        screen.getByText(/We are proud to partner with a variety of organizations/)
      ).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders within a container', () => {
      const { container } = render(<Business />);
      const mantineContainer = container.querySelector('.mantine-Container-root');
      expect(mantineContainer).toBeInTheDocument();
    });

    it('renders paper component', () => {
      const { container } = render(<Business />);
      const paper = container.querySelector('.mantine-Paper-root');
      expect(paper).toBeInTheDocument();
    });
  });
});
