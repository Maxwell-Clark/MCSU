import { Books } from "@/components/Resources/Books/Books";
import Links from "@/components/Resources/Links/Links";
import { Papers } from "@/components/Resources/Papers/Papers";
import Videos  from "@/components/Resources/Videos/Videos";
import Talks from "@/components/Resources/Talks/Talks";

export default function ResourcesPage() {
    const data = [
      ];
  return (
    <>
      <div id='papers'>
      <Papers />
      </div>
      <div id='books'>
      <Books />
      </div>
      <div id='talks'>
      <Talks />
      </div> 
      <div id='links'>
        <Links />
      </div>
      <div id='videos'>
      <Videos />
      </div>
    </>
  );
}
