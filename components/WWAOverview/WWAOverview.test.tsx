import { render, screen } from '@/test-utils';
import { WWAOverview } from './WWAOverview';

describe('WWAOverview', () => {
  it('renders the title', () => {
    render(<WWAOverview />);
    expect(screen.getByText('Who We Are')).toBeInTheDocument();
  });

  it('renders the mission text', () => {
    render(<WWAOverview />);
    expect(
      screen.getByText(/The Mindfulness Center of Southern Utah exists to share/)
    ).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<WWAOverview />);
    expect(
      screen.getByText('Training the mind, opening the heart')
    ).toBeInTheDocument();
  });
});
