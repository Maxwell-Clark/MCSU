import { render, screen, userEvent } from '@/test-utils';
import { Papers } from './Papers';

describe('Papers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the title', () => {
      render(<Papers />);
      expect(screen.getByRole('heading', { name: 'Papers' })).toBeInTheDocument();
    });

    it('renders all paper cards', () => {
      render(<Papers />);

      expect(screen.getByText('Mindfulness meditation: A research-proven way to reduce stress')).toBeInTheDocument();
      expect(screen.getByText('Mindfulness for Your Health')).toBeInTheDocument();
      expect(screen.getByText('Meditation: A simple, fast way to reduce stress')).toBeInTheDocument();
      expect(screen.getByText('When science meets mindfulness')).toBeInTheDocument();
    });

    it('renders category labels', () => {
      render(<Papers />);

      expect(screen.getAllByText('Mindfulness').length).toBeGreaterThan(0);
      expect(screen.getByText('Health')).toBeInTheDocument();
      expect(screen.getByText('Meditation')).toBeInTheDocument();
    });

    it('renders read article buttons', () => {
      render(<Papers />);

      const readButtons = screen.getAllByRole('button', { name: /read article/i });
      expect(readButtons.length).toBe(4);
    });
  });

  describe('User Interactions', () => {
    it('opens paper link when Read article button is clicked', async () => {
      const user = userEvent.setup();
      render(<Papers />);

      const readButtons = screen.getAllByRole('button', { name: /read article/i });
      await user.click(readButtons[0]);

      expect(window.open).toHaveBeenCalledWith(
        'https://www.apa.org/topics/mindfulness/meditation',
        '_blank'
      );
    });

    it('opens correct URLs for each paper', async () => {
      const user = userEvent.setup();
      render(<Papers />);

      const readButtons = screen.getAllByRole('button', { name: /read article/i });

      await user.click(readButtons[1]);
      expect(window.open).toHaveBeenCalledWith(
        'https://newsinhealth.nih.gov/2021/06/mindfulness-your-health',
        '_blank'
      );

      await user.click(readButtons[2]);
      expect(window.open).toHaveBeenCalledWith(
        'https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858',
        '_blank'
      );

      await user.click(readButtons[3]);
      expect(window.open).toHaveBeenCalledWith(
        'https://news.harvard.edu/gazette/story/2018/04/harvard-researchers-study-how-mindfulness-may-change-the-brain-in-depressed-patients/',
        '_blank'
      );
    });
  });

  describe('Carousel', () => {
    it('renders carousel slides', () => {
      render(<Papers />);

      // Carousel should contain the paper cards
      const papers = screen.getAllByRole('button', { name: /read article/i });
      expect(papers.length).toBe(4);
    });
  });

  describe('Card Content', () => {
    it('displays paper title on each card', () => {
      render(<Papers />);

      expect(screen.getByText('Mindfulness meditation: A research-proven way to reduce stress')).toBeInTheDocument();
    });

    it('displays category on each card', () => {
      render(<Papers />);

      expect(screen.getByText('Health')).toBeInTheDocument();
    });
  });
});
