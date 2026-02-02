import { render, screen, userEvent, waitFor } from '@/test-utils';
import { HeaderCard } from './HeaderCard';
import { IconInfoCircle, IconUsers, IconBuilding } from '@tabler/icons-react';

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe('HeaderCard', () => {
  const mockLinks = [
    {
      icon: IconInfoCircle,
      title: 'Overview',
      id: 'overview',
      description: 'Learn about our mission, values, and the work we do.',
    },
    {
      icon: IconUsers,
      title: 'Leadership',
      id: 'leadership',
      description: 'Meet our leadership team.',
    },
    {
      icon: IconBuilding,
      title: 'Board and Team',
      id: 'board',
      description: 'Explore our dedicated board members.',
    },
  ];

  const defaultProps = {
    links: mockLinks,
    title: 'Who We Are',
    endpoint: '/whoWeAre',
  };

  describe('Rendering', () => {
    it('renders the header card title', () => {
      render(<HeaderCard {...defaultProps} />);
      expect(screen.getByText('Who We Are')).toBeInTheDocument();
    });

    it('renders chevron down icon', () => {
      const { container } = render(<HeaderCard {...defaultProps} />);
      const chevron = container.querySelector('.tabler-icon-chevron-down');
      expect(chevron).toBeInTheDocument();
    });

    it('has correct link to endpoint', () => {
      render(<HeaderCard {...defaultProps} />);
      const link = screen.getByRole('link', { name: /who we are/i });
      expect(link).toHaveAttribute('href', '/whoWeAre');
    });
  });

  describe('HoverCard Structure', () => {
    it('renders with correct structure', () => {
      render(<HeaderCard {...defaultProps} />);

      // The main link should be present
      const mainLink = screen.getByRole('link', { name: /who we are/i });
      expect(mainLink).toHaveAttribute('href', '/whoWeAre');
    });

    it('contains chevron icon', () => {
      const { container } = render(<HeaderCard {...defaultProps} />);
      const chevron = container.querySelector('.tabler-icon-chevron-down');
      expect(chevron).toBeInTheDocument();
    });
  });

  describe('Different Props', () => {
    it('renders with different title', () => {
      render(
        <HeaderCard
          links={mockLinks}
          title="Offerings & Events"
          endpoint="/offerings"
        />
      );

      expect(screen.getByText('Offerings & Events')).toBeInTheDocument();
    });

    it('links to different endpoints', () => {
      render(
        <HeaderCard
          links={mockLinks}
          title="Resources"
          endpoint="/resources"
        />
      );

      const link = screen.getByRole('link', { name: /resources/i });
      expect(link).toHaveAttribute('href', '/resources');
    });
  });

  describe('Props', () => {
    it('accepts links array prop', () => {
      render(<HeaderCard {...defaultProps} />);
      expect(screen.getByText('Who We Are')).toBeInTheDocument();
    });
  });
});
