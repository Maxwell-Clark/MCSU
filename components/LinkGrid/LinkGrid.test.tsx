import { render, screen, userEvent } from '@/test-utils';
import { LinkGrid } from './LinkGrid';

describe('LinkGrid', () => {
  const mockLinks = [
    { label: 'Link 1', url: 'https://example1.com' },
    { label: 'Link 2', url: 'https://example2.com' },
    { label: 'Link 3', url: 'https://example3.com' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders all link cards', () => {
      render(<LinkGrid links={mockLinks} />);

      expect(screen.getByText('Link 1')).toBeInTheDocument();
      expect(screen.getByText('Link 2')).toBeInTheDocument();
      expect(screen.getByText('Link 3')).toBeInTheDocument();
    });

    it('renders correct number of cards', () => {
      render(<LinkGrid links={mockLinks} />);

      const cards = screen.getAllByText(/Link \d/);
      expect(cards).toHaveLength(3);
    });

    it('renders empty grid when no links provided', () => {
      render(<LinkGrid links={[]} />);

      expect(screen.queryByText(/Link/)).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('opens link in new tab when card is clicked', async () => {
      const user = userEvent.setup();
      render(<LinkGrid links={mockLinks} />);

      const firstLink = screen.getByText('Link 1');
      await user.click(firstLink);

      expect(window.open).toHaveBeenCalledWith('https://example1.com', '_blank');
    });

    it('opens correct URL for each card', async () => {
      const user = userEvent.setup();
      render(<LinkGrid links={mockLinks} />);

      await user.click(screen.getByText('Link 2'));
      expect(window.open).toHaveBeenCalledWith('https://example2.com', '_blank');

      await user.click(screen.getByText('Link 3'));
      expect(window.open).toHaveBeenCalledWith('https://example3.com', '_blank');
    });
  });

  describe('Grid Layout', () => {
    it('renders cards in a SimpleGrid', () => {
      const { container } = render(<LinkGrid links={mockLinks} />);

      // Mantine SimpleGrid has specific class names
      const grid = container.querySelector('.mantine-SimpleGrid-root');
      expect(grid).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles single link', () => {
      render(<LinkGrid links={[{ label: 'Single Link', url: 'https://single.com' }]} />);

      expect(screen.getByText('Single Link')).toBeInTheDocument();
    });

    it('handles many links', () => {
      const manyLinks = Array.from({ length: 10 }, (_, i) => ({
        label: `Link ${i + 1}`,
        url: `https://example${i + 1}.com`,
      }));

      render(<LinkGrid links={manyLinks} />);

      expect(screen.getByText('Link 1')).toBeInTheDocument();
      expect(screen.getByText('Link 10')).toBeInTheDocument();
    });

    it('handles special characters in labels', () => {
      render(
        <LinkGrid
          links={[{ label: 'Link with "quotes" & symbols', url: 'https://example.com' }]}
        />
      );

      expect(screen.getByText('Link with "quotes" & symbols')).toBeInTheDocument();
    });
  });
});
