import { render, screen } from '@/test-utils';
import { Tiered } from './Tiered';

describe('Tiered', () => {
  it('renders the membership title', () => {
    render(<Tiered />);
    expect(screen.getByText('Mindful Membership')).toBeInTheDocument();
  });

  it('renders a join link for each tier', () => {
    render(<Tiered />);
    expect(screen.getByRole('link', { name: /join as curious/i })).toHaveAttribute(
      'href',
      '/membership/signup?tier=curious'
    );
    expect(screen.getByRole('link', { name: /join as kindness/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /join as gratitude/i })).toBeInTheDocument();
  });
});
