import { render, screen } from '@/test-utils';
import InfiniteHorizontalScroll from './InfiniteScroll';

describe('InfiniteHorizontalScroll', () => {
  const mockScrollItems = [
    { src: 'https://example.com/image1.jpg', alt: 'Image 1', description: 'First image' },
    { src: 'https://example.com/image2.jpg', alt: 'Image 2', description: 'Second image' },
    { src: 'https://example.com/image3.jpg', alt: 'Image 3', description: 'Third image' },
  ];

  describe('Rendering', () => {
    it('renders images', () => {
      render(<InfiniteHorizontalScroll scroll_items={mockScrollItems} />);
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });

    it('duplicates images for seamless scrolling', () => {
      render(<InfiniteHorizontalScroll scroll_items={mockScrollItems} />);
      const images = screen.getAllByRole('img');
      // Should be tripled: 3 items * 3 = 9
      expect(images).toHaveLength(9);
    });

    it('renders correct alt text on images', () => {
      render(<InfiniteHorizontalScroll scroll_items={mockScrollItems} />);
      const image1 = screen.getAllByAltText('Image 1');
      const image2 = screen.getAllByAltText('Image 2');
      const image3 = screen.getAllByAltText('Image 3');

      // Each alt text should appear 3 times (tripled)
      expect(image1).toHaveLength(3);
      expect(image2).toHaveLength(3);
      expect(image3).toHaveLength(3);
    });
  });

  describe('Image Sources', () => {
    it('uses correct src for images', () => {
      render(<InfiniteHorizontalScroll scroll_items={mockScrollItems} />);
      const images = screen.getAllByAltText('Image 1');
      expect(images[0]).toHaveAttribute('src', 'https://example.com/image1.jpg');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty scroll items', () => {
      render(<InfiniteHorizontalScroll scroll_items={[]} />);
      const images = screen.queryAllByRole('img');
      expect(images).toHaveLength(0);
    });

    it('handles single item', () => {
      render(
        <InfiniteHorizontalScroll
          scroll_items={[{ src: 'https://example.com/single.jpg', alt: 'Single' }]}
        />
      );
      const images = screen.getAllByAltText('Single');
      // Single item tripled = 3
      expect(images).toHaveLength(3);
    });
  });

  describe('Layout', () => {
    it('renders marquee wrapper', () => {
      const { container } = render(<InfiniteHorizontalScroll scroll_items={mockScrollItems} />);
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});
