import Links from "@/components/Practice/Links/Links";
import Meditations from "@/components/Practice/Meditations/Meditations";
import Music from "@/components/Practice/Music/Music";
import PracticeCalendar from "@/components/Practice/PracticeCalendar/PracticeCalendar";
import Videos from "@/components/Practice/Videos/Videos";
import GuidedMeditations from "@/components/Resources/Videos/Videos";

export default function PracticePage() {
  return (
    <>
      <div id='weekly-schedule'>
        <PracticeCalendar />
      </div>

      <div id='meditation-instructions'>
        <Meditations />
      </div>

      <div id='guided-meditations'>
        <Videos />
      </div>

      {/* <div id="links">
        <Links />
      </div> */}

      <div id='music'>
        <Music />
      </div>
    </>
  );
}
