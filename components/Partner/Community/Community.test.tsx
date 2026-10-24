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

    it('does not render the Southern Utah Veterans Home', () => {
      render(<Community />);
      expect(screen.queryByText(/Southern Utah Veterans Home/)).not.toBeInTheDocument();
      expect(screen.queryByAltText('Southern Utah Veterans Home')).not.toBeInTheDocument();
    });
  });

  describe('Partner links', () => {
    it('links the SwitchPoint logo to switchpoint.org', () => {
      render(<Community />);
      const link = screen.getByAltText('SwitchPoint').closest('a');
      expect(link).toHaveAttribute('href', 'https://switchpoint.org/');
    });

    it('links St George Active Life Center to its Council on Aging page', () => {
      render(<Community />);
      const link = screen.getByText('St George Active Life Center').closest('a');
      expect(link).toHaveAttribute('href', 'https://coa.washco.utah.gov/st-george/');
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
