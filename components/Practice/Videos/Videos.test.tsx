import { render, screen, userEvent, waitFor } from '@/test-utils';
import Videos from './Videos';

describe('Videos', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<Videos />);
      expect(screen.getByText('Guided Meditations')).toBeInTheDocument();
    });

    it('renders all category tabs', () => {
      render(<Videos />);
      expect(screen.getByRole('tab', { name: /all/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /body scan/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /focused awareness/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /moving meditation/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /loving-kindness/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /open awareness/i })).toBeInTheDocument();
    });

    it('renders search input', () => {
      render(<Videos />);
      expect(screen.getByPlaceholderText('Search videos...')).toBeInTheDocument();
    });

    it('renders videos from all categories by default', () => {
      render(<Videos />);
      expect(screen.getByText('Body Scan Meditation')).toBeInTheDocument();
      expect(screen.getByText('Focused Awareness Meditation')).toBeInTheDocument();
      expect(screen.getByText('Walking Meditation')).toBeInTheDocument();
    });
  });

  describe('Tab Filtering', () => {
    it('has all category tabs', () => {
      render(<Videos />);

      expect(screen.getByRole('tab', { name: /all/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /body scan/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /focused awareness/i })).toBeInTheDocument();
    });

    it('All tab is initially selected', () => {
      render(<Videos />);
      const allTab = screen.getByRole('tab', { name: /all/i });
      expect(allTab).toHaveAttribute('aria-selected', 'true');
    });
  });

  describe('Search Filtering', () => {
    it('has search input', () => {
      render(<Videos />);
      const searchInput = screen.getByPlaceholderText('Search videos...');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).not.toBeDisabled();
    });
  });

  describe('Combined Filtering', () => {
    it('has both tabs and search capabilities', () => {
      render(<Videos />);

      // Tabs exist
      expect(screen.getByRole('tab', { name: /all/i })).toBeInTheDocument();

      // Search exists
      expect(screen.getByPlaceholderText('Search videos...')).toBeInTheDocument();
    });
  });

  describe('Video Display', () => {
    it('shows instructor when available', () => {
      render(<Videos />);
      expect(screen.getByText('Guided by Jon Kabat-Zinn')).toBeInTheDocument();
    });

    it('shows duration badge when available', () => {
      render(<Videos />);
      expect(screen.getByText('29 minutes')).toBeInTheDocument();
      expect(screen.getByText('14 minutes')).toBeInTheDocument();
    });
  });
});
