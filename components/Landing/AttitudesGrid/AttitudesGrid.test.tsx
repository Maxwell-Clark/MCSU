import { render, screen } from '@/test-utils';
import { AttitudesGrid } from './AttitudesGrid';

describe('AttitudesGrid', () => {
  describe('Rendering', () => {
    it('renders the tagline', () => {
      render(<AttitudesGrid />);
      expect(
        screen.getByText(/In the midst of daily life, there are countless opportunities to pause/)
      ).toBeInTheDocument();
    });

    it('renders center tile with title', () => {
      render(<AttitudesGrid />);
      expect(screen.getByText('Attitudes of Mindfulness')).toBeInTheDocument();
    });

    it('renders all attitude tiles', () => {
      render(<AttitudesGrid />);
      expect(screen.getByText('Patience')).toBeInTheDocument();
      expect(screen.getByText("Beginner's Mind")).toBeInTheDocument();
      expect(screen.getByText('Acceptance')).toBeInTheDocument();
      expect(screen.getByText('Non-Striving')).toBeInTheDocument();
      expect(screen.getByText('Letting-Go')).toBeInTheDocument();
      expect(screen.getByText('Non-Judgement')).toBeInTheDocument();
      expect(screen.getByText('Gratitude')).toBeInTheDocument();
      expect(screen.getByText('Trust')).toBeInTheDocument();
    });

    it('renders attitude descriptions', () => {
      render(<AttitudesGrid />);
      expect(
        screen.getByText(/Certain things can't be hurried but they do unfold in their time/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/See things as if for the first time, with openness/)
      ).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    it('renders grid container', () => {
      const { container } = render(<AttitudesGrid />);
      const wrapper = container.querySelector('.mantine-Container-root');
      expect(wrapper).toBeInTheDocument();
    });
  });
});
