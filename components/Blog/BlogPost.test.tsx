import { render, screen } from '@/test-utils';
import BlogPost from './BlogPost';
import { BlogPostProps } from '@/interfaces/General_Interfaces';

describe('BlogPost', () => {
  const mockPost: BlogPostProps = {
    id: '1',
    title: 'Test Blog Post Title',
    slug: 'test-blog-post-title',
    date: 'January 1, 2024',
    image: 'https://example.com/test-image.jpg',
    content: 'This is the test content of the blog post.',
  };

  describe('Rendering', () => {
    it('renders the post title', () => {
      render(<BlogPost post={mockPost} />);
      expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument();
    });

    it('renders the post date', () => {
      render(<BlogPost post={mockPost} />);
      expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
    });

    it('renders the post content', () => {
      render(<BlogPost post={mockPost} />);
      expect(screen.getByText('This is the test content of the blog post.')).toBeInTheDocument();
    });

    it('renders the post image', () => {
      render(<BlogPost post={mockPost} />);
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/test-image.jpg');
      expect(image).toHaveAttribute('alt', 'Test Blog Post Title');
    });
  });

  describe('Props Handling', () => {
    it('handles different title values', () => {
      render(<BlogPost post={{ ...mockPost, title: 'A Different Title' }} />);
      expect(screen.getByText('A Different Title')).toBeInTheDocument();
    });

    it('handles different date values', () => {
      render(<BlogPost post={{ ...mockPost, date: 'December 25, 2023' }} />);
      expect(screen.getByText('December 25, 2023')).toBeInTheDocument();
    });

    it('handles long content', () => {
      const longContent = 'Lorem ipsum '.repeat(100);
      render(<BlogPost post={{ ...mockPost, content: longContent }} />);
      expect(screen.getByText(longContent.trim())).toBeInTheDocument();
    });

    it('handles multiline content', () => {
      const multilineContent = `First paragraph.

      Second paragraph.

      Third paragraph.`;
      render(<BlogPost post={{ ...mockPost, content: multilineContent }} />);
      expect(screen.getByText(/First paragraph/)).toBeInTheDocument();
    });

    it('renders HTML content correctly', () => {
      const htmlContent = '<p>This is <strong>HTML</strong> content.</p>';
      render(<BlogPost post={{ ...mockPost, content: htmlContent }} />);
      expect(screen.getByText(/HTML/)).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders within a container', () => {
      const { container } = render(<BlogPost post={mockPost} />);
      const mantineContainer = container.querySelector('.mantine-Container-root');
      expect(mantineContainer).toBeInTheDocument();
    });

    it('renders divider between header and content', () => {
      const { container } = render(<BlogPost post={mockPost} />);
      const divider = container.querySelector('.mantine-Divider-root');
      expect(divider).toBeInTheDocument();
    });
  });

  describe('Title Hierarchy', () => {
    it('renders title as h2', () => {
      render(<BlogPost post={mockPost} />);
      const title = screen.getByRole('heading', { level: 2 });
      expect(title).toHaveTextContent('Test Blog Post Title');
    });
  });
});
