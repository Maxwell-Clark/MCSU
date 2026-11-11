import { parseYouTubeId } from '../youtube';

describe('parseYouTubeId', () => {
  it.each([
    ['dQw4w9WgXcQ'],
    ['https://www.youtube.com/watch?v=dQw4w9WgXcQ'],
    ['https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s&list=PL123'],
    ['https://m.youtube.com/watch?v=dQw4w9WgXcQ'],
    ['https://music.youtube.com/watch?v=dQw4w9WgXcQ'],
    ['youtube.com/watch?v=dQw4w9WgXcQ'],
    ['https://youtu.be/dQw4w9WgXcQ'],
    ['https://youtu.be/dQw4w9WgXcQ?si=abc123'],
    ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
    ['https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ'],
    ['https://www.youtube.com/shorts/dQw4w9WgXcQ'],
    ['https://www.youtube.com/live/dQw4w9WgXcQ'],
    ['  https://youtu.be/dQw4w9WgXcQ  '],
  ])('reads the ID from %s', (input) => {
    expect(parseYouTubeId(input)).toBe('dQw4w9WgXcQ');
  });

  it.each([
    [''],
    [null],
    [undefined],
    ['not a link'],
    ['https://vimeo.com/123456789'],
    ['https://www.youtube.com/watch?v=short'],
    ['https://www.youtube.com/@someChannel'],
    ['https://evil.example/watch?v=dQw4w9WgXcQ'],
    ['https://youtube.com.evil.example/watch?v=dQw4w9WgXcQ'],
  ])('rejects %s', (input) => {
    expect(parseYouTubeId(input)).toBeNull();
  });
});
