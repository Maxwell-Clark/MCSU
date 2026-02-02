import { render, screen, userEvent, waitFor } from '@/test-utils';
import { LandingFAQ } from './LandingFAQ';

describe('LandingFAQ', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<LandingFAQ />);
      expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    });

    it('renders all FAQ questions', () => {
      render(<LandingFAQ />);
      expect(screen.getByText('What is the difference between mindfulness and meditation?')).toBeInTheDocument();
      expect(screen.getByText('How do I handle distractions or a wandering mind during meditation?')).toBeInTheDocument();
      expect(screen.getByText('How long should I meditate to see benefits?')).toBeInTheDocument();
      expect(screen.getByText('Can mindfulness help reduce stress and anxiety?')).toBeInTheDocument();
      expect(screen.getByText('Do I need any special tools or equipment to practice mindfulness?')).toBeInTheDocument();
    });

    it('renders accordion items in collapsed state initially', () => {
      render(<LandingFAQ />);

      // The panel content should not be visible initially
      // Looking for a specific piece of content that appears in the first answer
      const mindfulnessDefinition = screen.queryByText(/A mental state of being fully present/);
      expect(mindfulnessDefinition).not.toBeVisible();
    });
  });

  describe('Accordion Interactions', () => {
    it('expands accordion item when clicked', async () => {
      const user = userEvent.setup();
      render(<LandingFAQ />);

      const firstQuestion = screen.getByText('What is the difference between mindfulness and meditation?');
      await user.click(firstQuestion);

      await waitFor(() => {
        expect(screen.getByText(/A mental state of being fully present/)).toBeVisible();
      });
    });

    it('collapses accordion item when clicked again', async () => {
      const user = userEvent.setup();
      render(<LandingFAQ />);

      const firstQuestion = screen.getByText('What is the difference between mindfulness and meditation?');

      // Expand
      await user.click(firstQuestion);
      await waitFor(() => {
        expect(screen.getByText(/A mental state of being fully present/)).toBeVisible();
      });

      // Collapse
      await user.click(firstQuestion);
      await waitFor(() => {
        expect(screen.queryByText(/A mental state of being fully present/)).not.toBeVisible();
      });
    });

    it('shows different content for different accordion items', async () => {
      const user = userEvent.setup();
      render(<LandingFAQ />);

      // Click on distractions question
      const distractionsQuestion = screen.getByText('How do I handle distractions or a wandering mind during meditation?');
      await user.click(distractionsQuestion);

      await waitFor(() => {
        expect(screen.getByText(/Acknowledge Without Judgment/)).toBeVisible();
        expect(screen.getByText(/Return to Your Anchor/)).toBeVisible();
      });
    });

    it('expands duration question and shows content', async () => {
      const user = userEvent.setup();
      render(<LandingFAQ />);

      const durationQuestion = screen.getByText('How long should I meditate to see benefits?');
      await user.click(durationQuestion);

      await waitFor(() => {
        expect(screen.getByText(/Minimum Effective Duration/)).toBeVisible();
        expect(screen.getByText(/Beginner Recommendations/)).toBeVisible();
      });
    });
  });

  describe('Nested Content', () => {
    it('renders nested lists in duration section', async () => {
      const user = userEvent.setup();
      render(<LandingFAQ />);

      const durationQuestion = screen.getByText('How long should I meditate to see benefits?');
      await user.click(durationQuestion);

      await waitFor(() => {
        // Multiple instances may exist, use getAllByText
        expect(screen.getAllByText(/Stress Reduction:/).length).toBeGreaterThan(0);
      });
    });

    it('renders nested lists in stress section', async () => {
      const user = userEvent.setup();
      render(<LandingFAQ />);

      const stressQuestion = screen.getByText('Can mindfulness help reduce stress and anxiety?');
      await user.click(stressQuestion);

      await waitFor(() => {
        expect(screen.getByText(/How It Works:/)).toBeVisible();
      });
    });

    it('renders tools content correctly', async () => {
      const user = userEvent.setup();
      render(<LandingFAQ />);

      const toolsQuestion = screen.getByText('Do I need any special tools or equipment to practice mindfulness?');
      await user.click(toolsQuestion);

      await waitFor(() => {
        expect(screen.getByText(/Essentials:/)).toBeVisible();
      });
    });
  });
});
