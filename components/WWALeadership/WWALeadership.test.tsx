import { render, screen } from '@/test-utils';
import { WWALeadership } from './WWALeadership';

// Mock the image imports
jest.mock('@/assets/img/nina_headshot.jpg', () => ({ src: 'nina.jpg' }));
jest.mock('@/assets/img/gael_headshot.jpg', () => ({ src: 'gael.jpg' }));
jest.mock('@/assets/img/kirk_headshot.jpg', () => ({ src: 'kirk.jpg' }));
jest.mock('@/assets/img/generic.png', () => ({ src: 'generic.png' }));

describe('WWALeadership', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<WWALeadership />);
      expect(screen.getByText('MCSU Leadership Team')).toBeInTheDocument();
    });

    it('renders leadership member names', () => {
      render(<WWALeadership />);
      expect(screen.getByText('Kirk A. Benson')).toBeInTheDocument();
      expect(screen.getByText('David Tate')).toBeInTheDocument();
      expect(screen.getByText('Alieta Gael Benson')).toBeInTheDocument();
      expect(screen.getByText('Harlan M. Hatfield')).toBeInTheDocument();
    });

    it('renders roles', () => {
      render(<WWALeadership />);
      expect(screen.getByText('President & Chairman')).toBeInTheDocument();
      expect(screen.getByText('Vice Chair')).toBeInTheDocument();
      expect(screen.getByText('Treasurer')).toBeInTheDocument();
      expect(screen.getByText('Secretary')).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders in a grid layout', () => {
      const { container } = render(<WWALeadership />);
      const grid = container.querySelector('.mantine-Grid-root');
      expect(grid).toBeInTheDocument();
    });

    it('renders simple grid for user cards', () => {
      const { container } = render(<WWALeadership />);
      const simpleGrid = container.querySelector('.mantine-SimpleGrid-root');
      expect(simpleGrid).toBeInTheDocument();
    });
  });
});
