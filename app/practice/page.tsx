import Links from "@/components/Practice/Links/Links";
import Meditations from "@/components/Practice/Meditations/Meditations";
import Music from "@/components/Practice/Music/Music";
import Talks from "@/components/Practice/Talks/Talks";
import Videos from "@/components/Practice/Videos/Videos";

export default function PracticePage() {
    const data = [
      ];
  return (
    <>
    <div id='meditations'>
      <Meditations />
    </div>
    <div id='music'>
      <Music />
    </div>
    <div id='talks'>
    <Talks />
    </div> 
      <div id="links">
      <Links />
      </div>
      <div id='videos'>
      <Videos />
      </div>
    </>
  );
}
