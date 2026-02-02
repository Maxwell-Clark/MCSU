import { render, screen, userEvent, waitFor } from '@/test-utils';
import { WWAOverview } from './WWAOverview';

describe('WWAOverview', () => {
  describe('Rendering', () => {
    it('renders the title', () => {
      render(<WWAOverview />);
      expect(screen.getByText('Overview')).toBeInTheDocument();
    });

    it('renders the main description', () => {
      render(<WWAOverview />);
      expect(
        screen.getByText(/The Mindfulness Center of Southern Utah exists to share/)
      ).toBeInTheDocument();
    });

    it('renders Learn More button', () => {
      render(<WWAOverview />);
      expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
    });

    it('renders Join Us button', () => {
      render(<WWAOverview />);
      expect(screen.getByRole('button', { name: /join us/i })).toBeInTheDocument();
    });
  });

  describe('Expand/Collapse', () => {
    it('expands content when Learn More is clicked', async () => {
      const user = userEvent.setup();
      render(<WWAOverview />);

      await user.click(screen.getByRole('button', { name: /learn more/i }));

      await waitFor(() => {
        expect(
          screen.getByText(/To realize our vision, we are engaged in offering practical skills/)
        ).toBeVisible();
      });
    });

    it('changes button text to Show Less when expanded', async () => {
      const user = userEvent.setup();
      render(<WWAOverview />);

      await user.click(screen.getByRole('button', { name: /learn more/i }));

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /show less/i })).toBeInTheDocument();
      });
    });

    it('collapses content when Show Less is clicked', async () => {
      const user = userEvent.setup();
      render(<WWAOverview />);

      // Expand
      await user.click(screen.getByRole('button', { name: /learn more/i }));
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /show less/i })).toBeInTheDocument();
      });

      // Collapse
      await user.click(screen.getByRole('button', { name: /show less/i }));
      await waitFor(() => {
        expect(screen.getByRole('button', { name: /learn more/i })).toBeInTheDocument();
      });
    });
  });
});
