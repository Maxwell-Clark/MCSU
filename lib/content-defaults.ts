import type { ContentItemView, ContentKind } from '@/lib/content-kinds';

/**
 * The content that was hardcoded before it moved into the admin console.
 * `scripts/seed-content.ts` copies it into the database once; tests use it as fixtures.
 */
export interface DefaultContentItem {
  kind: ContentKind;
  title: string;
  creator?: string;
  category?: string;
  duration?: string;
  youtubeId?: string;
  url?: string;
  image?: string;
  body?: string;
}

const practiceVideos: DefaultContentItem[] = [
  {
    title: 'Body Scan Meditation',
    creator: 'Jon Kabat-Zinn',
    duration: '29 minutes',
    youtubeId: '15q-N-_kkrU',
    category: 'Body Scan',
  },
  {
    title: 'Body Scan Practice',
    creator: 'Mark Williams',
    duration: '14 minutes',
    youtubeId: 'CyKhfUdOEgs',
    category: 'Body Scan',
  },
  {
    title: 'Focused Awareness Meditation',
    creator: 'Mark Williams',
    duration: '8 minutes',
    youtubeId: 'fUeEnkjKyDs',
    category: 'Focused Awareness',
  },
  {
    title: 'Breath Awareness with Jon Kabat-Zinn',
    duration: '10 minutes',
    youtubeId: '2GjZanuXWWk',
    category: 'Focused Awareness',
  },
  { title: 'Guided Breath Meditation', youtubeId: 'MUxwA1TDMnY', category: 'Focused Awareness' },
  { title: 'Walking Meditation', youtubeId: '4RPShl45ixc', category: 'Moving Meditation' },
  { title: 'Seated Yoga for Mindfulness', youtubeId: 'G8BsLlPE1m4', category: 'Moving Meditation' },
  {
    title: 'Loving-Kindness Guided Practice',
    youtubeId: 'sz7cpV7ERsM',
    category: 'Loving-Kindness',
  },
  {
    title: '10-Minute Loving-Kindness – Sharon Salzberg',
    youtubeId: 'e-TeW9CI0bc',
    category: 'Loving-Kindness',
  },
  { title: 'Open Awareness Practice', youtubeId: 'ZKhzGwGb5Es', category: 'Open Awareness' },
  {
    title: 'Guided Open Monitoring Meditation',
    youtubeId: 'VPZO58oWkkw',
    category: 'Open Awareness',
  },
].map((item) => ({ ...item, kind: 'practice_video' as const }));

const music: DefaultContentItem[] = [
  {
    title: 'Your Smiling Face',
    creator: 'James Taylor',
    duration: '3:34',
    youtubeId: 'ZSsfNlS42Cc',
    category: 'Melodic',
  },
  {
    title: 'Orinoco Flow',
    creator: 'Enya',
    duration: '3:34',
    youtubeId: 'LTrk4X9ACtw',
    category: 'Melodic',
  },
  {
    title: 'Why Worry?',
    creator: 'Clannad',
    duration: '4:28',
    youtubeId: '4Wns465rgGo',
    category: 'Melodic',
  },
  {
    title: 'Life is Love',
    creator: 'Deuter',
    duration: '7:12',
    youtubeId: 'hc5q94wu1E8',
    category: 'Meditation',
  },
  {
    title: 'Grass Grows By Itself',
    creator: 'Deuter',
    duration: '7:14',
    youtubeId: 'gKLEmy4d2h0',
    category: 'Meditation',
  },
  {
    title: 'The Man Who Danced Too Slowly',
    creator: 'Baka Beyond',
    duration: '6:07',
    youtubeId: 'JSBRb7MFy30',
    category: 'Meditation',
  },
  {
    title: 'Ngombi',
    creator: 'Baka Beyond',
    duration: '4:53',
    youtubeId: '89PBXCp-MSI',
    category: 'Nature',
  },
  {
    title: 'Wilderness',
    creator: 'Clannad',
    duration: '2:06',
    youtubeId: 'qg0ZkKEZLcs',
    category: 'Nature',
  },
  {
    title: 'Highway In the Sun',
    creator: 'Kohala',
    duration: '3:33',
    youtubeId: 'xuuqviYcZcU',
    category: 'Nature',
  },
].map((item) => ({ ...item, kind: 'music' as const }));

const resourceVideos: DefaultContentItem[] = [
  {
    title: 'How mindfulness changes the emotional life of our brains',
    creator: 'Richard J. Davidson',
    youtubeId: '7CBfCW67xT8',
  },
  {
    title: 'The Power of Mindfulness: What You Practice Grows Stronger',
    creator: 'Shauna Shapiro',
    youtubeId: 'IeblJdB2-Vo',
  },
  {
    title: 'The Three Components of Self-Compassion',
    creator: 'Kristin Neff',
    youtubeId: '11U0h0DPu7k',
  },
  { title: 'The True Meaning of METTA', creator: 'Sharon Salzberg', youtubeId: 'p117V-RQ_MA' },
].map((item) => ({ ...item, kind: 'resource_video' as const }));

const books: DefaultContentItem[] = [
  {
    title: 'The Miracle of Mindfulness',
    image: '/images/books/miracle-of-mindfulness.jpg',
    url: 'https://www.amazon.com/Miracle-Mindfulness-Introduction-Practice-Meditation/dp/0807012394',
  },
  {
    title: 'Wherever You Go, There You Are',
    image: '/images/books/wherever-you-go.jpg',
    url: 'https://www.amazon.com/Wherever-You-There-Are-ROUGH/dp/B002E8JGCY',
  },
  {
    title: 'Radical Acceptance',
    image: '/images/books/radical-acceptance.jpg',
    url: 'https://www.amazon.com/Radical-Acceptance-Awakening-Heals-Shame/dp/0712601457',
  },
  {
    title: '10% Happier',
    image: '/images/books/10-percent-happier.jpg',
    url: 'https://www.amazon.com/10-Happier-10th-Anniversary-Works/dp/0063356473',
  },
  {
    title: 'Mindfulness in Plain English',
    image: '/images/books/mindfulness-plain-english.jpg',
    url: 'https://www.amazon.com/Mindfulness-English-Bhante-Henepola-Gunaratana/dp/0861719069',
  },
].map((item) => ({ ...item, kind: 'book' as const }));

const papers: DefaultContentItem[] = [
  {
    title: 'Mindfulness meditation: A research-proven way to reduce stress',
    image: 'https://www.apa.org/images/tile-stress-mindfulness-meditation_tcm7-264379.jpg',
    url: 'https://www.apa.org/topics/mindfulness/meditation',
    category: 'Mindfulness',
  },
  {
    title: 'Mindfulness for Your Health',
    image:
      'https://newsinhealth.nih.gov/sites/newsinhealth/files/2021/June/jun-2021-cover-illustration-woman-focusing-butterfly-worries-float-away.jpg',
    url: 'https://newsinhealth.nih.gov/2021/06/mindfulness-your-health',
    category: 'Health',
  },
  {
    title: 'Meditation: A simple, fast way to reduce stress',
    image: 'https://freenaturestock.com/wp-content/uploads/freenaturestock-2287-768x1050.jpg',
    url: 'https://www.mayoclinic.org/tests-procedures/meditation/in-depth/meditation/art-20045858',
    category: 'Meditation',
  },
  {
    title: 'When science meets mindfulness',
    image: 'https://freenaturestock.com/wp-content/uploads/freenaturestock-2285-768x1152.jpg',
    url: 'https://news.harvard.edu/gazette/story/2018/04/harvard-researchers-study-how-mindfulness-may-change-the-brain-in-depressed-patients/',
    category: 'Mindfulness',
  },
].map((item) => ({ ...item, kind: 'paper' as const }));

const links: DefaultContentItem[] = [
  { title: 'Center for Healthy Minds', url: 'https://centerhealthyminds.org/' },
  { title: 'Palouse Mindfulness', url: 'https://palousemindfulness.com/index.html' },
  { title: 'Mindfulness Utah', url: 'https://www.mindfulnessutah.com' },
  { title: 'Mindfulness and Health Institute', url: 'https://mindfulnessandhealthinstitute.org' },
  { title: 'Tara Brach', url: 'https://www.tarabrach.com' },
  { title: 'Insight Timer', url: 'https://insighttimer.com/' },
].map((item) => ({ ...item, kind: 'link' as const }));

const poems: DefaultContentItem[] = [
  {
    title: 'Allow',
    creator: 'Dana Faulds',
    category: 'Mindfulness',
    body: [
      'There is no controlling life.',
      'Try corralling a lightning bolt, containing a tornado.',
      'Dam a stream and it will create a new channel.',
      'Resist, and the tide will sweep you off your feet.',
      'Allow, and grace will carry you to higher ground.',
      'The only safety lies in letting it all in –',
      'the wild and the weak –',
      'fear, fantasies, failures, and success.',
      'When loss rips off the doors of the heart',
      'or sadness veils your vision with despair,',
      'practice becomes simply bearing the truth.',
      'In the choice to let go of your known way of being,',
      'the whole world is revealed to your new eyes.',
    ].join('\n'),
  },
  {
    title: 'With That Moon Language',
    creator: 'Hafiz',
    category: 'Love',
    body: [
      'Admit something:',
      'Everyone you see, you say to them, "Love me."',
      'Of course you do not do this out loud, otherwise',
      'Someone would call the cops.',
      'Still, though, think about this, this great pull in us to connect.',
      'Why not become the one who lives with a',
      'Full moon in each eye that is always saying,',
      'With that sweet moon language, what every other eye in',
      'This world is dying to hear?',
    ].join('\n'),
  },
  {
    title: 'St. Teresa of Avila',
    creator: 'St. Teresa',
    category: 'Wisdom',
    body: [
      'Remember,',
      'if you want to make progress',
      '',
      'on the path',
      'and ascend to the places',
      'you have longed for,',
      'the important thing',
      'is not to think much',
      'but to love much,',
      'and so to do',
      'whatever',
      'best awakens you to love.',
    ].join('\n'),
  },
  {
    title: 'The Guest House',
    creator: 'Rumi',
    category: 'Mindfulness',
    body: [
      'This being human is a guest house.',
      'Every morning a new arrival.',
      'A joy, a depression, a meanness,',
      'some momentary awareness comes',
      'as an unexpected visitor.',
      'Welcome and entertain them all!',
      "Even if they're a crowd of sorrows,",
      'who violently sweep your house',
      'empty of its furniture,',
      'still, treat each guest honorably.',
      'He may be clearing you out',
      'for some new delight.',
      'The dark thought, the shame, the malice,',
      'meet them at the door laughing,',
      'and invite them in.',
      'Be grateful for whoever comes,',
      'because each has been sent',
      'as a guide from beyond.',
    ].join('\n'),
  },
  {
    title: 'Wild Geese',
    creator: 'Mary Oliver',
    category: 'Mindfulness',
    body: [
      'You do not have to be good.',
      'You do not have to walk on your knees',
      'for a hundred miles through the desert repenting.',
      'You only have to let the soft animal of your body',
      'love what it loves.',
      'Tell me about despair, yours, and I will tell you mine.',
      'Meanwhile the world goes on.',
      'Meanwhile the sun and the clear pebbles of the rain',
      'are moving across the landscapes,',
      'over the prairies and the deep trees,',
      'the mountains and the rivers.',
      'Meanwhile the wild geese, high in the clean blue air,',
      'are heading home again.',
      'Whoever you are, no matter how lonely,',
      'the world offers itself to your imagination,',
      'calls to you like the wild geese, harsh and exciting -',
      'over and over announcing your place',
      'in the family of things.',
    ].join('\n'),
  },
  {
    title: 'Your History is Here Inside Your Body',
    creator: 'Martha Elliot',
    category: 'Mindfulness',
    body: [
      'Your history is here inside your body.',
      'Your body is your storehouse',
      'Of learnings, feelings,',
      'Thoughts, and experiences.',
      'Only waiting to be invited to',
      'Reveal your treasures to yourself.',
      'Help yourself.',
      'As you let the learning emerge',
      'And take shape, you can',
      'Appreciate the wisdom of the body.',
      'Each cell alive with',
      'Spirit, emotion, and intelligence.',
      'Ready to help you at any moment,',
      'Always with you and for you.',
    ].join('\n'),
  },
].map((item) => ({ ...item, kind: 'poem' as const }));

export const DEFAULT_CONTENT: DefaultContentItem[] = [
  ...practiceVideos,
  ...music,
  ...resourceVideos,
  ...books,
  ...papers,
  ...links,
  ...poems,
];

/** Default items of one kind in the shape the public pages render. */
export function getDefaultContent(kind: ContentKind): ContentItemView[] {
  return DEFAULT_CONTENT.filter((item) => item.kind === kind).map((item, index) => ({
    id: `${kind}-${index}`,
    kind,
    title: item.title,
    creator: item.creator ?? null,
    category: item.category ?? null,
    duration: item.duration ?? null,
    youtubeId: item.youtubeId ?? null,
    url: item.url ?? null,
    image: item.image ?? null,
    body: item.body ?? null,
  }));
}
