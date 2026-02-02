import { Books } from "@/components/Resources/Books/Books";
import Links from "@/components/Resources/Links/Links";
import { Papers } from "@/components/Resources/Papers/Papers";
import Videos  from "@/components/Resources/Videos/Videos";
import PoemsDisplay from '@/components/Resources/Poems';

export default function ResourcesPage() {
  return (
    <>
      <section id='papers'>
        <Papers />
      </section>
      <section id='books'>
        <Books />
      </section>
      <section id='links'>
        <Links />
      </section>
      <section id='poems'>
        <PoemsDisplay />
      </section>
      <section id='videos'>
        <Videos />
      </section>
    </>
  );
}
