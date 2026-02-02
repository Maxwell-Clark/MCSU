import { render, screen } from '@/test-utils';
import { ContactIconsList } from './ContactIcons';

describe('ContactIconsList', () => {
  describe('Rendering', () => {
    it('renders email contact', () => {
      render(<ContactIconsList />);
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('renders email address', () => {
      render(<ContactIconsList />);
      expect(screen.getByText('MCSU@gmail.com')).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders in a stack', () => {
      const { container } = render(<ContactIconsList />);
      const stack = container.querySelector('.mantine-Stack-root');
      expect(stack).toBeInTheDocument();
    });
  });
});
