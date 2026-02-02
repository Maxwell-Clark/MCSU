import { render, screen } from '@/test-utils';
import { WWABoard } from './WWABoard';

// Mock the image imports
jest.mock('../../assets/img/nina_headshot.jpg', () => ({ src: 'nina.jpg' }));
jest.mock('../../assets/img/gael_headshot.jpg', () => ({ src: 'gael.jpg' }));
jest.mock('../../assets/img/kirk_headshot.jpg', () => ({ src: 'kirk.jpg' }));
jest.mock('../../assets/img/generic.png', () => ({ src: 'generic.png' }));

describe('WWABoard', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<WWABoard />);
      expect(screen.getByText('Meet Our Board of Directors')).toBeInTheDocument();
    });

    it('renders board member names', () => {
      render(<WWABoard />);
      expect(screen.getByText('Nina Barnes')).toBeInTheDocument();
      expect(screen.getByText('Kirk A. Benson')).toBeInTheDocument();
      expect(screen.getByText('Alieta Gael Benson')).toBeInTheDocument();
      expect(screen.getByText('David Tate')).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders in a grid layout', () => {
      const { container } = render(<WWABoard />);
      const grid = container.querySelector('.mantine-Grid-root');
      expect(grid).toBeInTheDocument();
    });

    it('renders simple grid for user cards', () => {
      const { container } = render(<WWABoard />);
      const simpleGrid = container.querySelector('.mantine-SimpleGrid-root');
      expect(simpleGrid).toBeInTheDocument();
    });
  });
});
