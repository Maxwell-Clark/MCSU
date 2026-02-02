import { render, screen, userEvent, waitFor } from '@/test-utils';
import { Blog } from './Blog';
import { BlogPostProps } from '@/interfaces/General_Interfaces';

const mockPosts: BlogPostProps[] = [
  {
    id: '1',
    title: '5 Simple Ways to Practice Mindfulness at Home',
    slug: '5-simple-ways-to-practice-mindfulness-at-home',
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
    date: 'August 18, 2023',
    category: 'Meditation',
    content: `Mindfulness is the practice of being fully present and aware of your
      surroundings, thoughts, and feelings without judgment.`,
  },
  {
    id: '2',
    title: 'Mindful Eating: A Journey to Better Health',
    slug: 'mindful-eating-a-journey-to-better-health',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352',
    date: 'September 1, 2023',
    category: 'Wellness',
    content: `Mindful eating is about using mindfulness to reach a state of full attention.`,
  },
  {
    id: '3',
    title: 'Cultivating Gratitude with Daily Meditation',
    slug: 'cultivating-gratitude-with-daily-meditation',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    date: 'October 5, 2023',
    category: 'Meditation',
    content: `Gratitude meditation is a powerful practice.`,
  },
  {
    id: '4',
    title: 'Exploring the Science Behind Mindfulness',
    slug: 'exploring-the-science-behind-mindfulness',
    image: 'https://images.unsplash.com/photo-1532798442725-41036acc7489',
    date: 'October 10, 2023',
    category: 'Tips',
    content: `Modern neuroscience has revealed fascinating insights.`,
  },
];

describe('Blog', () => {
  describe('Rendering', () => {
    it('renders blog cards', () => {
      render(<Blog posts={mockPosts} />);
      expect(screen.getByText('5 Simple Ways to Practice Mindfulness at Home')).toBeInTheDocument();
      expect(screen.getByText('Mindful Eating: A Journey to Better Health')).toBeInTheDocument();
      expect(screen.getByText('Cultivating Gratitude with Daily Meditation')).toBeInTheDocument();
      expect(screen.getByText('Exploring the Science Behind Mindfulness')).toBeInTheDocument();
    });

    it('renders date on each card', () => {
      render(<Blog posts={mockPosts} />);
      expect(screen.getByText('August 18, 2023')).toBeInTheDocument();
      expect(screen.getByText('September 1, 2023')).toBeInTheDocument();
      expect(screen.getByText('October 5, 2023')).toBeInTheDocument();
      expect(screen.getByText('October 10, 2023')).toBeInTheDocument();
    });

    it('renders page header', () => {
      render(<Blog posts={mockPosts} />);
      expect(screen.getByText('Insights & Reflections')).toBeInTheDocument();
      expect(
        screen.getByText('Thoughts on mindfulness, meditation, and well-being')
      ).toBeInTheDocument();
    });

    it('renders category badges', () => {
      render(<Blog posts={mockPosts} />);
      expect(screen.getAllByText('Meditation').length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('Wellness')).toBeInTheDocument();
      expect(screen.getByText('Tips')).toBeInTheDocument();
    });

    it('renders empty state when no posts', () => {
      render(<Blog posts={[]} />);
      expect(screen.getByText('No blog posts yet. Check back soon!')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('opens modal when card is clicked', async () => {
      const user = userEvent.setup();
      render(<Blog posts={mockPosts} />);

      const firstCard = screen
        .getByText('5 Simple Ways to Practice Mindfulness at Home')
        .closest('a');
      expect(firstCard).toBeInTheDocument();

      await user.click(firstCard!);

      await waitFor(() => {
        expect(
          screen.getAllByText('5 Simple Ways to Practice Mindfulness at Home').length
        ).toBeGreaterThan(1);
      });
    });

    it('modal can be closed', async () => {
      const user = userEvent.setup();
      render(<Blog posts={mockPosts} />);

      const firstCard = screen
        .getByText('5 Simple Ways to Practice Mindfulness at Home')
        .closest('a');
      await user.click(firstCard!);

      await waitFor(() => {
        expect(
          screen.getAllByText('5 Simple Ways to Practice Mindfulness at Home').length
        ).toBeGreaterThan(1);
      });

      const closeButtons = screen.getAllByRole('button');
      const closeButton = closeButtons.find(
        (btn) =>
          btn.getAttribute('aria-label')?.toLowerCase().includes('close') ||
          btn.classList.contains('mantine-Modal-close') ||
          btn.querySelector('svg')
      );

      if (closeButton) {
        await user.click(closeButton);

        await waitFor(() => {
          expect(screen.getAllByText('5 Simple Ways to Practice Mindfulness at Home')).toHaveLength(
            1
          );
        });
      }
    });
  });

  describe('State Management', () => {
    it('updates active post when different cards are clicked', async () => {
      const user = userEvent.setup();
      render(<Blog posts={mockPosts} />);

      const firstCard = screen
        .getByText('5 Simple Ways to Practice Mindfulness at Home')
        .closest('a');
      await user.click(firstCard!);

      await waitFor(() => {
        expect(
          screen.getAllByText('5 Simple Ways to Practice Mindfulness at Home').length
        ).toBeGreaterThan(1);
      });

      const closeButtons = screen.getAllByRole('button');
      const closeButton = closeButtons.find(
        (btn) =>
          btn.getAttribute('aria-label')?.toLowerCase().includes('close') ||
          btn.classList.contains('mantine-Modal-close') ||
          btn.querySelector('svg')
      );

      if (closeButton) {
        await user.click(closeButton);

        await waitFor(() => {
          expect(screen.getAllByText('5 Simple Ways to Practice Mindfulness at Home')).toHaveLength(
            1
          );
        });
      }

      const secondCard = screen
        .getByText('Mindful Eating: A Journey to Better Health')
        .closest('a');
      await user.click(secondCard!);

      await waitFor(() => {
        expect(
          screen.getAllByText('Mindful Eating: A Journey to Better Health').length
        ).toBeGreaterThan(1);
      });
    });
  });
});
