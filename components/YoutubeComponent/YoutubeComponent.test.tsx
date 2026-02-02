import { render, screen } from '@/test-utils';
import YouTubePlayer from './YoutubeComponent';

// Mock the react-youtube library
jest.mock('react-youtube', () => {
  return function MockYouTube({ videoId, opts }: { videoId: string; opts: object }) {
    return (
      <div data-testid="youtube-player" data-video-id={videoId} data-opts={JSON.stringify(opts)}>
        Mock YouTube Player
      </div>
    );
  };
});

describe('YouTubePlayer', () => {
  const defaultProps = {
    videoId: 'abc123',
    title: 'Test Video',
  };

  describe('Rendering', () => {
    it('renders YouTube player component', () => {
      render(<YouTubePlayer {...defaultProps} />);
      expect(screen.getByTestId('youtube-player')).toBeInTheDocument();
    });

    it('passes correct videoId to YouTube component', () => {
      render(<YouTubePlayer {...defaultProps} />);
      const player = screen.getByTestId('youtube-player');
      expect(player).toHaveAttribute('data-video-id', 'abc123');
    });

    it('passes autoplay: 0 in options', () => {
      render(<YouTubePlayer {...defaultProps} />);
      const player = screen.getByTestId('youtube-player');
      const opts = JSON.parse(player.getAttribute('data-opts') || '{}');
      expect(opts.playerVars.autoplay).toBe(0);
    });
  });

  describe('Different Video IDs', () => {
    it('handles different video IDs', () => {
      render(<YouTubePlayer videoId="xyz789" title="Another Video" />);
      const player = screen.getByTestId('youtube-player');
      expect(player).toHaveAttribute('data-video-id', 'xyz789');
    });

    it('handles video ID with special characters', () => {
      render(<YouTubePlayer videoId="a-b_c123" title="Special Video" />);
      const player = screen.getByTestId('youtube-player');
      expect(player).toHaveAttribute('data-video-id', 'a-b_c123');
    });
  });

  describe('Container', () => {
    it('renders player container', () => {
      const { container } = render(<YouTubePlayer {...defaultProps} />);
      expect(container.querySelector('div')).toBeInTheDocument();
    });
  });
});
