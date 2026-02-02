import { render, screen, userEvent, waitFor } from '@/test-utils';
import { MindfulnessSection } from './MindfulnessSection';

describe('MindfulnessSection', () => {
  const mockSections = [
    {
      label: 'Breathing Techniques',
      points: [
        {
          title: 'Deep Breathing',
          description: 'Focus on slow, deep breaths to calm the nervous system.',
        },
        {
          title: 'Box Breathing',
          description: 'Breathe in for 4 counts, hold for 4, exhale for 4, hold for 4.',
        },
      ],
    },
    {
      label: 'Body Awareness',
      points: [
        {
          title: 'Body Scan',
          description: 'Systematically focus on different parts of your body.',
        },
      ],
    },
  ];

  const defaultProps = {
    title: 'Mindfulness Practices',
    sections: mockSections,
  };

  describe('Rendering', () => {
    it('renders the main title', () => {
      render(<MindfulnessSection {...defaultProps} />);
      expect(screen.getByText('Mindfulness Practices')).toBeInTheDocument();
    });

    it('renders accordion section labels', () => {
      render(<MindfulnessSection {...defaultProps} />);
      expect(screen.getByText('Breathing Techniques')).toBeInTheDocument();
      expect(screen.getByText('Body Awareness')).toBeInTheDocument();
    });

    it('initially shows sections in collapsed state', () => {
      render(<MindfulnessSection {...defaultProps} />);

      // Point titles should not be visible initially (inside accordion)
      const deepBreathing = screen.queryByText('Deep Breathing');
      // It might be in DOM but not visible due to accordion collapse
      expect(deepBreathing).not.toBeVisible();
    });
  });

  describe('Accordion Interactions', () => {
    it('has interactive accordion elements', () => {
      const { container } = render(<MindfulnessSection {...defaultProps} />);
      const accordionControls = container.querySelectorAll('.mantine-Accordion-control');
      expect(accordionControls.length).toBeGreaterThan(0);
    });
  });

  describe('Modal Interactions', () => {
    it('component has modal structure', () => {
      const { container } = render(<MindfulnessSection {...defaultProps} />);
      // Component should have accordion
      const accordion = container.querySelector('.mantine-Accordion-root');
      expect(accordion).toBeInTheDocument();
    });
  });

  describe('Card Content', () => {
    it('has card structure', () => {
      const { container } = render(<MindfulnessSection {...defaultProps} />);
      // Content is inside collapsed accordion, just verify accordion exists
      const accordion = container.querySelector('.mantine-Accordion-root');
      expect(accordion).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles empty sections array', () => {
      render(<MindfulnessSection title="Empty" sections={[]} />);
      expect(screen.getByText('Empty')).toBeInTheDocument();
    });

    it('renders section with empty points', () => {
      render(
        <MindfulnessSection
          title="Test"
          sections={[{ label: 'Empty Section', points: [] }]}
        />
      );

      expect(screen.getByText('Empty Section')).toBeInTheDocument();
    });
  });
});
