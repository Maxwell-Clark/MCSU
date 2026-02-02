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

    it('renders partner section', () => {
      render(<Community />);
      expect(screen.getByText('SwitchPoint')).toBeInTheDocument();
    });

    it('renders partner description', () => {
      render(<Community />);
      expect(
        screen.getByText(/Beyond food and shelter Switchpoint Community Resource Center/)
      ).toBeInTheDocument();
    });

    it('renders partner tagline', () => {
      render(<Community />);
      expect(screen.getByText('Changing the Face of Poverty')).toBeInTheDocument();
    });
  });

  describe('Images', () => {
    it('renders partner logo', () => {
      render(<Community />);
      const image = screen.getByAltText('SwitchPoint');
      expect(image).toBeInTheDocument();
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
