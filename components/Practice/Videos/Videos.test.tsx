import { render, screen, userEvent, waitFor } from '@/test-utils';
import { getDefaultContent } from '@/lib/content-defaults';
import Videos from './Videos';

const items = getDefaultContent('practice_video');

describe('Videos', () => {
  it('shows a placeholder when there are no videos', () => {
    render(<Videos items={[]} />);
    expect(screen.getByText('Videos are coming soon.')).toBeInTheDocument();
  });

  it('builds category tabs from the items it is given', () => {
    render(
      <Videos
        items={[{ ...items[0], id: 'new', category: 'Sleep', title: 'Sleep Meditation', youtubeId: 'abcdefghijk' }]}
      />
    );
    expect(screen.getByRole('tab', { name: /sleep/i })).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: /body scan/i })).not.toBeInTheDocument();
  });

  describe('Rendering', () => {
    it('renders the title', () => {
      render(<Videos items={items} />);
      expect(screen.getByText('Guided Meditations')).toBeInTheDocument();
    });

    it('renders all category tabs', () => {
      render(<Videos items={items} />);
      expect(screen.getByRole('tab', { name: /all/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /body scan/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /focused awareness/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /moving meditation/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /loving-kindness/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /open awareness/i })).toBeInTheDocument();
    });

    it('renders search input', () => {
      render(<Videos items={items} />);
      expect(screen.getByPlaceholderText('Search videos...')).toBeInTheDocument();
    });

    it('renders videos from all categories by default', () => {
      render(<Videos items={items} />);
      expect(screen.getByText('Body Scan Meditation')).toBeInTheDocument();
      expect(screen.getByText('Focused Awareness Meditation')).toBeInTheDocument();
      expect(screen.getByText('Walking Meditation')).toBeInTheDocument();
    });
  });

  describe('Tab Filtering', () => {
    it('has all category tabs', () => {
      render(<Videos items={items} />);

      expect(screen.getByRole('tab', { name: /all/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /body scan/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /focused awareness/i })).toBeInTheDocument();
    });

    it('All tab is initially selected', () => {
      render(<Videos items={items} />);
      const allTab = screen.getByRole('tab', { name: /all/i });
      expect(allTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Search Filtering', () => {
    it('has search input', () => {
      render(<Videos items={items} />);
      const searchInput = screen.getByPlaceholderText('Search videos...');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).not.toBeDisabled();
    });
  });

  describe('Combined Filtering', () => {
    it('has both tabs and search capabilities', () => {
      render(<Videos items={items} />);

      // Tabs exist
      expect(screen.getByRole('tab', { name: /all/i })).toBeInTheDocument();

      // Search exists
      expect(screen.getByPlaceholderText('Search videos...')).toBeInTheDocument();
    });
  });

  describe('Video Display', () => {
    it('shows instructor when available', () => {
      render(<Videos items={items} />);
      expect(screen.getByText('Guided by Jon Kabat-Zinn')).toBeInTheDocument();
    });

    it('shows duration badge when available', () => {
      render(<Videos items={items} />);
      expect(screen.getByText('29 minutes')).toBeInTheDocument();
      expect(screen.getByText('14 minutes')).toBeInTheDocument();
    });
  });
});
