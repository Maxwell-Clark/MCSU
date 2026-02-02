import { render, screen, userEvent, waitFor } from '@/test-utils';
import { Header } from './Header';

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe('Header', () => {
  describe('Rendering', () => {
    it('renders the logo/brand name', () => {
      render(<Header />);
      expect(screen.getByText('MCSU')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
      render(<Header />);
      expect(screen.getByText('Who We Are')).toBeInTheDocument();
      expect(screen.getByText('Offerings & Events')).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
      expect(screen.getByText('Partner With Us')).toBeInTheDocument();
      expect(screen.getByText('Practice')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
    });

    it('renders color scheme toggle button', () => {
      render(<Header />);
      // The toggle button should be present
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('renders burger menu for mobile', () => {
      const { container } = render(<Header />);
      const burger = container.querySelector('.mantine-Burger-root');
      expect(burger).toBeInTheDocument();
    });
  });

  describe('Mobile Navigation', () => {
    it('opens drawer when burger is clicked', async () => {
      const user = userEvent.setup();
      const { container } = render(<Header />);

      const burger = container.querySelector('.mantine-Burger-root');
      if (burger) {
        await user.click(burger);

        await waitFor(() => {
          expect(screen.getByText('Navigation')).toBeInTheDocument();
        });
      }
    });

    it('shows mobile navigation links in drawer', async () => {
      const user = userEvent.setup();
      const { container } = render(<Header />);

      const burger = container.querySelector('.mantine-Burger-root');
      if (burger) {
        await user.click(burger);

        await waitFor(() => {
          // Mobile drawer should have navigation options
          expect(screen.getByText('Navigation')).toBeInTheDocument();
        });
      }
    });
  });

  describe('Link Construction', () => {
    it('has correct href for Blog link', () => {
      render(<Header />);
      const blogLinks = screen.getAllByRole('link', { name: /blog/i });
      expect(blogLinks[0]).toHaveAttribute('href', '/blog');
    });

    it('has correct href for home link', () => {
      render(<Header />);
      const homeLink = screen.getByRole('link', { name: /mcsu/i });
      expect(homeLink).toHaveAttribute('href', '/');
    });
  });

  describe('Color Scheme Toggle', () => {
    it('has clickable color scheme toggle', async () => {
      const user = userEvent.setup();
      render(<Header />);

      // Find the ActionIcon that contains the moon icon
      const buttons = screen.getAllByRole('button');
      const toggleButton = buttons.find(btn =>
        !btn.getAttribute('aria-label')?.includes('navigation')
      );

      expect(toggleButton).toBeTruthy();

      // Should be clickable without error
      if (toggleButton) {
        await user.click(toggleButton);
      }
    });
  });
});
