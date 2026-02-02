import { render, screen } from '@/test-utils';
import Meditations from './Meditations';

describe('Meditations', () => {
  describe('Rendering', () => {
    it('renders the main title', () => {
      render(<Meditations />);
      expect(screen.getByText('Meditation Instruction')).toBeInTheDocument();
    });

    it('renders BodyScan section', () => {
      render(<Meditations />);
      expect(screen.getByText('A Journey Through the Body – A Body Scan')).toBeInTheDocument();
    });

    it('renders Breathing section', () => {
      render(<Meditations />);
      expect(screen.getByText('Mindfulness of Breathing')).toBeInTheDocument();
    });

    it('renders Walking section', () => {
      render(<Meditations />);
      expect(screen.getByText('Mindful Walking')).toBeInTheDocument();
    });

    it('renders LovingKindness section', () => {
      render(<Meditations />);
      expect(screen.getByText('Loving-Kindness Meditation')).toBeInTheDocument();
    });

    it('renders OpenAwareness section', () => {
      render(<Meditations />);
      expect(screen.getByText('Open Awareness')).toBeInTheDocument();
    });
  });
});
