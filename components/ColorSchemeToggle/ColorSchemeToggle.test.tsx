import { render, screen, userEvent } from '@/test-utils';
import { ColorSchemeToggle } from './ColorSchemeToggle';

// Mock useMantineColorScheme
const mockSetColorScheme = jest.fn();

jest.mock('@mantine/core', () => {
  const actual = jest.requireActual('@mantine/core');
  return {
    ...actual,
    useMantineColorScheme: () => ({
      setColorScheme: mockSetColorScheme,
      colorScheme: 'light',
    }),
  };
});

describe('ColorSchemeToggle', () => {
  beforeEach(() => {
    mockSetColorScheme.mockClear();
  });

  describe('Rendering', () => {
    it('renders Light button', () => {
      render(<ColorSchemeToggle />);
      expect(screen.getByRole('button', { name: /light/i })).toBeInTheDocument();
    });

    it('renders Dark button', () => {
      render(<ColorSchemeToggle />);
      expect(screen.getByRole('button', { name: /dark/i })).toBeInTheDocument();
    });

    it('renders Auto button', () => {
      render(<ColorSchemeToggle />);
      expect(screen.getByRole('button', { name: /auto/i })).toBeInTheDocument();
    });

    it('renders all three buttons', () => {
      render(<ColorSchemeToggle />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(3);
    });
  });

  describe('User Interactions', () => {
    it('calls setColorScheme with "light" when Light button is clicked', async () => {
      const user = userEvent.setup();
      render(<ColorSchemeToggle />);

      await user.click(screen.getByRole('button', { name: /light/i }));

      expect(mockSetColorScheme).toHaveBeenCalledWith('light');
    });

    it('calls setColorScheme with "dark" when Dark button is clicked', async () => {
      const user = userEvent.setup();
      render(<ColorSchemeToggle />);

      await user.click(screen.getByRole('button', { name: /dark/i }));

      expect(mockSetColorScheme).toHaveBeenCalledWith('dark');
    });

    it('calls setColorScheme with "auto" when Auto button is clicked', async () => {
      const user = userEvent.setup();
      render(<ColorSchemeToggle />);

      await user.click(screen.getByRole('button', { name: /auto/i }));

      expect(mockSetColorScheme).toHaveBeenCalledWith('auto');
    });
  });

  describe('Layout', () => {
    it('renders buttons in a group', () => {
      const { container } = render(<ColorSchemeToggle />);
      const group = container.querySelector('.mantine-Group-root');
      expect(group).toBeInTheDocument();
    });
  });
});
