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
