import { render, screen } from '@/test-utils';
import { MembershipPage } from './MembershipPage';

describe('MembershipPage', () => {
  it('renders the hero title', () => {
    render(<MembershipPage />);
    expect(screen.getByText('Mindful Membership')).toBeInTheDocument();
  });

  it('renders all three tier cards', () => {
    render(<MembershipPage />);
    expect(screen.getByText('Curious')).toBeInTheDocument();
    expect(screen.getByText('Kindness')).toBeInTheDocument();
    expect(screen.getByText('Gratitude')).toBeInTheDocument();
  });

  it('renders tier prices', () => {
    render(<MembershipPage />);
    expect(screen.getByText('$10/mo')).toBeInTheDocument();
    expect(screen.getByText('$50/mo')).toBeInTheDocument();
    expect(screen.getByText('$100/mo')).toBeInTheDocument();
  });

  it('renders join buttons for each tier', () => {
    render(<MembershipPage />);
    expect(screen.getByRole('link', { name: /join as curious/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /join as kindness/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /join as gratitude/i })).toBeInTheDocument();
  });

  it('marks the featured tier with Most Popular badge', () => {
    render(<MembershipPage />);
    expect(screen.getByText('Most Popular')).toBeInTheDocument();
  });

  it('renders tier cards with aria region labels', () => {
    render(<MembershipPage />);
    expect(screen.getByRole('region', { name: /curious membership tier/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /kindness membership tier/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /gratitude membership tier/i })).toBeInTheDocument();
  });

  it('renders the donate link', () => {
    render(<MembershipPage />);
    expect(screen.getByRole('link', { name: /donate here/i })).toBeInTheDocument();
  });
});
