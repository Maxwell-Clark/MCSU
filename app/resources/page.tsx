import { Books } from "@/components/Resources/Books/Books";
import Links from "@/components/Resources/Links/Links";
import { Papers } from "@/components/Resources/Papers/Papers";
import Videos  from "@/components/Resources/Videos/Videos";
import PoemsDisplay from '@/components/Resources/Poems';
import { getActiveContent } from "@/lib/actions/content";

export const dynamic = 'force-dynamic';

export default async function ResourcesPage() {
  const content = await getActiveContent(['paper', 'book', 'link', 'poem', 'resource_video']);

  // Sections with nothing active are left out rather than shown empty
  return (
    <>
      {content.paper.length > 0 && (
        <section id='papers'>
          <Papers items={content.paper} />
        </section>
      )}
      {content.book.length > 0 && (
        <section id='books'>
          <Books items={content.book} />
        </section>
      )}
      {content.link.length > 0 && (
        <section id='links'>
          <Links items={content.link} />
        </section>
      )}
      {content.poem.length > 0 && (
        <section id='poems'>
          <PoemsDisplay items={content.poem} />
        </section>
      )}
      {content.resource_video.length > 0 && (
        <section id='videos'>
          <Videos items={content.resource_video} />
        </section>
      )}
    </>
  );
}
