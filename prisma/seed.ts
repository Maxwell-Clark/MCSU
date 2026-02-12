import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  const adminEmail = 'admin@mcsu.edu';
  const adminPassword = 'admin123';

  // Check if user already exists in Supabase Auth
  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  const existingUser = existingUsers?.users?.find(
    (u: { email?: string }) => u.email === adminEmail
  );

  let userId: string;

  if (existingUser) {
    console.log('Admin user already exists in Supabase Auth:', existingUser.email);
    userId = existingUser.id;
  } else {
    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        name: 'Admin User',
        role: 'admin',
      },
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      throw authError;
    }

    console.log('Created admin user in Supabase Auth:', authData.user.email);
    userId = authData.user.id;
  }

  // Upsert user in database (the trigger should handle this, but we ensure consistency)
  const admin = await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: adminEmail,
      name: 'Admin User',
      role: 'admin',
    },
  });

  console.log('Synced admin user to database:', admin.email);

  // Seed some initial blog posts
  const blogPosts = [
    {
      title: '5 Simple Ways to Practice Mindfulness at Home',
      slug: '5-simple-ways-to-practice-mindfulness-at-home',
      image:
        'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      category: 'Meditation',
      content: `<p>Mindfulness is the practice of being fully present and aware of your surroundings, thoughts, and feelings without judgment. It's a powerful tool that can reduce stress, enhance well-being, and deepen our sense of connection with ourselves and the world around us.</p>
<p>In this post, we'll explore simple mindfulness techniques you can start doing today—like mindful breathing, body scan meditation, and gratitude journaling. Whether you're a complete beginner or have dabbled in mindfulness before, these insights will help you build a more peaceful, attentive lifestyle.</p>`,
      published: true,
      authorId: admin.id,
    },
    {
      title: 'Mindful Eating: A Journey to Better Health',
      slug: 'mindful-eating-a-journey-to-better-health',
      image:
        'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      category: 'Wellness',
      content: `<p>Mindful eating is about using mindfulness to reach a state of full attention to your experiences, cravings, and physical cues when eating.</p>
<p>This practice helps you distinguish between emotional and physical hunger, and allows you to eat with intention and attention. Learn how to slow down, savor your food, and develop a healthier relationship with eating.</p>`,
      published: true,
      authorId: admin.id,
    },
    {
      title: 'Cultivating Gratitude with Daily Meditation',
      slug: 'cultivating-gratitude-with-daily-meditation',
      image:
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      category: 'Meditation',
      content: `<p>Gratitude meditation is a powerful practice that can transform your mindset and overall well-being. By taking time each day to focus on what you're thankful for, you can shift your perspective from what's lacking to what's abundant in your life.</p>
<p>Discover techniques for incorporating gratitude into your daily meditation practice and experience the profound effects it can have on your mental and emotional health.</p>`,
      published: true,
      authorId: admin.id,
    },
    {
      title: 'Exploring the Science Behind Mindfulness',
      slug: 'exploring-the-science-behind-mindfulness',
      image:
        'https://images.unsplash.com/photo-1532798442725-41036acc7489?ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80',
      category: 'Tips',
      content: `<p>Modern neuroscience has revealed fascinating insights into how mindfulness affects the brain. Research shows that regular mindfulness practice can lead to measurable changes in brain regions associated with attention, emotion regulation, and self-awareness.</p>
<p>In this post, we explore the scientific evidence supporting mindfulness practices and how these findings can motivate and inform your own practice.</p>`,
      published: true,
      authorId: admin.id,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post,
    });
  }

  console.log('Seeded blog posts');

  // Seed ClassLocations
  const locationVirtual = await prisma.classLocation.upsert({
    where: { id: 'loc-virtual' },
    update: {},
    create: {
      id: 'loc-virtual',
      name: 'Virtual (Online)',
      address: 'Join via Zoom',
      lat: 37.0965,
      lng: -113.5684,
    },
  });

  const locationTate = await prisma.classLocation.upsert({
    where: { id: 'loc-dr-tate' },
    update: {},
    create: {
      id: 'loc-dr-tate',
      name: "Dr. Tate's Office",
      address: '321 N. Mall Dr., Suite I-201, St. George, UT',
      lat: 37.1041,
      lng: -113.5785,
    },
  });

  const locationUtahTech = await prisma.classLocation.upsert({
    where: { id: 'loc-utah-tech' },
    update: {},
    create: {
      id: 'loc-utah-tech',
      name: 'Utah Tech University',
      address: '225 S University Ave, St. George, UT',
      lat: 37.0974,
      lng: -113.5684,
    },
  });

  console.log('Seeded class locations');

  // Seed ClassEvents
  const classEvents = [
    {
      id: 'class-monday-mindfulness',
      title: 'Monday Mindfulness',
      topic: 'Weekly Mindfulness Practice',
      instructor: 'Kirk Benson',
      dayOfWeek: 1,
      startTime: '8:00 PM',
      endTime: '9:00 PM',
      type: 'virtual',
      color: 'blue',
      category: 'drop-in',
      active: true,
      locationId: locationVirtual.id,
    },
    {
      id: 'class-wakeup-wednesday',
      title: 'Wake-up Wednesday',
      topic: 'Meditation with Dr. Tate',
      instructor: 'Dr. David Tate',
      dayOfWeek: 3,
      startTime: '5:15 PM',
      endTime: '6:15 PM',
      type: 'in-person',
      color: 'indigo',
      category: 'drop-in',
      active: true,
      locationId: locationTate.id,
    },
    {
      id: 'class-intro-mindfulness',
      title: 'Intro to Mindfulness',
      topic: '4-Week Introduction Course',
      instructor: 'TBD',
      dayOfWeek: null,
      startTime: 'TBD',
      endTime: 'TBD',
      type: 'hybrid',
      color: 'sage',
      category: 'intro',
      active: true,
      locationId: locationUtahTech.id,
    },
    {
      id: 'class-mbsr-course',
      title: 'MBSR Course',
      topic: '8-Week Mindfulness-Based Stress Reduction',
      instructor: 'Dr. David Tate, Kirk Benson',
      dayOfWeek: null,
      startTime: 'TBD',
      endTime: 'TBD',
      type: 'hybrid',
      color: 'purple',
      category: 'mbsr',
      active: true,
      locationId: locationVirtual.id,
    },
  ];

  for (const classEvent of classEvents) {
    await prisma.classEvent.upsert({
      where: { id: classEvent.id },
      update: {},
      create: classEvent,
    });
  }

  console.log('Seeded class events');

  // Seed Programs with Features
  const programsData = [
    {
      id: 'prog-intro',
      slug: 'intro',
      title: 'Introduction to Mindfulness',
      shortTitle: 'Intro',
      tagline: '6-Week Introduction Course',
      description:
        "This offering consists of one 90 minute class per week for six weeks. It is an introduction to mindfulness and follows the general design of MBSR, but isn't as rigorous in its homework requirements.",
      color: 'sage',
      iconName: 'IconBook',
      ctaText: 'Join Us',
      sortOrder: 0,
      features: [
        {
          title: 'Mindfulness Techniques',
          iconName: 'IconBook',
          listItems: JSON.stringify([
            'Body Scan',
            'Focused Awareness',
            'Mindful Movement (yoga or walking)',
            'Loving Kindness',
            'Open Awareness',
          ]),
          sortOrder: 0,
        },
        {
          title: 'Mindfulness Teachings',
          description:
            'The classes begin with a discussion of the body and its importance in helping us stay in the present moment. The classes also helps one understand the workings of the mind including our relationship to thoughts and emotions.',
          iconName: 'IconBrain',
          sortOrder: 1,
        },
        {
          title: 'Current Classes',
          description:
            'Currently the class is taught through the Institute for Continuing Learning, part of the continuing learning program associated with Utah Tech University. The course is taught twice in the fall and twice in the winter semesters. The class can also be taught virtually.',
          iconName: 'IconCalendar',
          sortOrder: 2,
        },
      ],
    },
    {
      id: 'prog-mbsr',
      slug: 'mbsr',
      title: 'Mindfulness-Based Stress Reduction',
      shortTitle: 'MBSR',
      tagline: '8-Week Evidence-Based Program',
      description:
        'MBSR is an eight-week program developed by Jon Kabat-Zinn that uses mindfulness and group learning to help individuals manage stress, pain, and emotional challenges.',
      color: 'purple',
      iconName: 'IconBrain',
      ctaText: 'Join Us',
      learnMoreContent: `Research demonstrates that MBSR, an eight-week program combining mindfulness meditation, body awareness, and yoga, effectively reduces stress by lowering cortisol levels, as evidenced by studies like those published in Psychoneuroendocrinology (2013), which found decreased stress reactivity in participants. It improves mental health outcomes, with meta-analyses (e.g., JAMA Internal Medicine, 2014) showing moderate to large effect sizes in reducing anxiety, depression, and psychological distress in diverse populations, including those with chronic illnesses. MBSR enhances emotional regulation and cognitive function, with neuroimaging studies (e.g., Frontiers in Human Neuroscience, 2015) indicating increased gray matter density in brain regions like the hippocampus, linked to learning and memory, and reduced amygdala activity, associated with lower emotional reactivity. Physically, MBSR has been shown to alleviate chronic pain, improve sleep quality, and boost immune function, as seen in trials involving cancer patients (Journal of Clinical Oncology, 2010).

MBSR is supported by hundreds of studies. In one study, adding MBSR to cardiac rehab reduced mortality by 41% over two years (Linden, 1996). It also shows strong outcomes for anxiety, depression (Khoury, 2013), and chronic pain (Anheyer et al., 2017).

Both Dr. David Tate and Kirk Benson are trained to teach MBSR. Dr. Tate wrote his Ph.D. dissertation on his research into the effect of MBSR and was taught MBSR principles by Jon Kabat-Zinn. Kirk Benson received his training at Brown University.`,
      sortOrder: 1,
      features: [
        {
          title: 'Body Scan Meditation',
          description:
            'A guided practice where participants focus attention sequentially on different parts of the body, observing sensations without judgment to enhance body awareness and relaxation.',
          iconName: 'IconMan',
          sortOrder: 0,
        },
        {
          title: 'Sitting Meditation',
          description:
            'Focused attention on the breath, bodily sensations, sounds, or thoughts, fostering non-reactive awareness. It often starts with breath awareness and may expand to open monitoring of all experiences.',
          iconName: 'IconBrain',
          sortOrder: 1,
        },
        {
          title: 'Mindful Yoga',
          description:
            'Gentle yoga poses performed with deliberate attention to movement, breath, and bodily sensations, promoting flexibility, strength, and mindfulness in motion.',
          iconName: 'IconFirstAidKit',
          sortOrder: 2,
        },
        {
          title: 'Walking Meditation',
          description:
            'Slow, intentional walking while focusing on the sensations of each step, such as foot placement or weight shifts, to integrate mindfulness into daily movement.',
          iconName: 'IconLicense',
          sortOrder: 3,
        },
        {
          title: 'Mindful Awareness of Thoughts and Emotions',
          description:
            'Observing thoughts and feelings as passing mental events rather than facts, often using techniques like labeling thoughts or noting their impermanence.',
          iconName: 'IconHeart',
          sortOrder: 4,
        },
        {
          title: 'Informal Mindfulness Practices',
          description:
            'Integrating mindfulness into daily activities, such as mindful eating, listening, or routine tasks, to cultivate ongoing awareness outside formal meditation.',
          iconName: 'IconMicroscope',
          sortOrder: 5,
        },
      ],
    },
    {
      id: 'prog-everyday',
      slug: 'everyday',
      title: 'Everyday Mindfulness',
      shortTitle: 'Everyday',
      tagline: 'Daily Practices for Well-being',
      description:
        'Everyday mindfulness practices help reduce stress, enhance well-being, and bring more joy to your daily life.',
      color: 'teal',
      iconName: 'IconSun',
      ctaText: 'Explore Practices',
      sortOrder: 2,
      features: [
        {
          title: 'Mindful Breathing',
          description:
            'Take moments throughout the day to focus on your breath, grounding yourself in the present moment and calming your mind.',
          iconName: 'IconLungs',
          sortOrder: 0,
        },
        {
          title: 'Connection with Nature',
          description:
            'Spend time outdoors and observe the sights, sounds, and smells around you. Nature offers a unique way to reconnect and reduce stress.',
          iconName: 'IconCloudDataConnection',
          sortOrder: 1,
        },
        {
          title: 'Daily Meditation',
          description:
            'Start or end your day with a few minutes of meditation. It can improve your focus, reduce anxiety, and foster inner peace.',
          iconName: 'IconCalendar',
          sortOrder: 2,
        },
        {
          title: 'Gratitude Practice',
          description:
            'Take time to acknowledge the positive aspects of your day. Practicing gratitude can shift your perspective and improve well-being.',
          iconName: 'IconHeart',
          sortOrder: 3,
        },
        {
          title: 'Mindful Awareness',
          description:
            'Observe your thoughts and emotions without judgment. Recognize them as passing experiences, helping you respond more calmly.',
          iconName: 'IconSun',
          sortOrder: 4,
        },
      ],
    },
    {
      id: 'prog-drop-in',
      slug: 'drop-in',
      title: 'Drop-in Mindfulness',
      shortTitle: 'Drop-in',
      tagline: 'Weekly Community Practice',
      description:
        'Monday Mindfulness is led by Kirk Benson and Wake-up Wednesday is led by Dr. David B. Tate.',
      color: 'blue',
      iconName: 'IconUsers',
      ctaText: 'Join a Session',
      sortOrder: 3,
      features: [
        {
          title: 'Weekly Virtual Session',
          description:
            "Monday Mindfulness is a 45 minute offering beginning at 8:00 pm each Monday evening. Join to receive our weekly news letter and an invitation to our virtual platform. Participation in the mindfulness session is completely voluntary, just drop in when you can.",
          iconName: 'IconCalendar',
          sortOrder: 0,
        },
        {
          title: 'Weekly In-person Session',
          description:
            "Wake-up Wednesday is an hour long offering beginning at 5:15 pm in the conference room of Dr. Tate's office. His address is 321 N. Mall Dr., Suite I-201, St. George, Utah. Just drop-in when you can.",
          iconName: 'IconClock',
          sortOrder: 1,
        },
        {
          title: 'Mindfulness Techniques',
          description:
            'In both drop-in sessions, you have an opportunity to practice different mindfulness techniques like focused or open awareness, body scans, loving-kindness, and other meditations. We also discuss a mindfulness related topic like how the mind works, fostering joy, relationships, how to interact with difficult emotions, and many more.',
          iconName: 'IconBrain',
          sortOrder: 2,
        },
        {
          title: 'Mindful Community',
          description:
            'We have the opportunity each week to practice together and hear the thoughts and feelings of other practitioners in our community. These classes help to build friendships and community.',
          iconName: 'IconUsers',
          sortOrder: 3,
        },
        {
          title: 'Personal Practice',
          description:
            'Each week a drop-in class can be a reminder to continue your personal practice. It is an opportunity to deepen and strengthen your personal practice.',
          iconName: 'IconHeart',
          sortOrder: 4,
        },
      ],
    },
  ];

  for (const program of programsData) {
    const { features, ...programData } = program;
    await prisma.program.upsert({
      where: { id: program.id },
      update: {},
      create: programData,
    });

    for (const feature of features) {
      await prisma.programFeature.upsert({
        where: {
          id: `${program.id}-feat-${feature.sortOrder}`,
        },
        update: {},
        create: {
          id: `${program.id}-feat-${feature.sortOrder}`,
          ...feature,
          programId: program.id,
        },
      });
    }
  }

  console.log('Seeded programs with features');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
