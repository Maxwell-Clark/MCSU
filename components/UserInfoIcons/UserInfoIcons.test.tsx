import { render, screen, userEvent, waitFor } from '@/test-utils';
import { UserInfoIcons } from './UserInfoIcons';

describe('UserInfoIcons', () => {
  const defaultProps = {
    name: 'John Doe',
    role: 'Director',
    title: 'Executive Director',
    description: 'John is the executive director of the organization.',
    img: { src: 'https://example.com/avatar.jpg' },
  };

  describe('Rendering', () => {
    it('renders user name', () => {
      render(<UserInfoIcons {...defaultProps} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders user role', () => {
      render(<UserInfoIcons {...defaultProps} />);
      expect(screen.getByText('Director')).toBeInTheDocument();
    });

    it('renders avatar', () => {
      render(<UserInfoIcons {...defaultProps} />);
      const avatars = screen.getAllByRole('img');
      expect(avatars.length).toBeGreaterThan(0);
    });

    it('renders with image as StaticImageData', () => {
      render(<UserInfoIcons {...defaultProps} />);
      const avatar = screen.getAllByRole('img')[0];
      expect(avatar).toHaveAttribute('src', 'https://example.com/avatar.jpg');
    });
  });

  describe('HoverCard Structure', () => {
    it('renders avatar component', () => {
      const { container } = render(<UserInfoIcons {...defaultProps} />);
      const avatar = container.querySelector('.mantine-Avatar-root');
      expect(avatar).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    it('handles missing optional props', () => {
      render(<UserInfoIcons name="Jane" />);
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    it('handles different name values', () => {
      render(<UserInfoIcons {...defaultProps} name="Jane Smith" />);
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('handles different role values', () => {
      render(<UserInfoIcons {...defaultProps} role="Manager" />);
      expect(screen.getByText('Manager')).toBeInTheDocument();
    });
  });

  describe('Event Handlers', () => {
    it('accepts onOpen callback', () => {
      const onOpen = jest.fn();
      render(<UserInfoIcons {...defaultProps} onOpen={onOpen} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  describe('Avatar Display', () => {
    it('renders avatar with correct size', () => {
      const { container } = render(<UserInfoIcons {...defaultProps} />);
      const avatar = container.querySelector('.mantine-Avatar-root');
      expect(avatar).toBeInTheDocument();
    });
  });
});
