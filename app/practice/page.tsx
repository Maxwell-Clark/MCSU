import Links from "@/components/Practice/Links/Links";
import Meditations from "@/components/Practice/Meditations/Meditations";
import Music from "@/components/Practice/Music/Music";
import Videos from "@/components/Practice/Videos/Videos";
import { Divider } from "@mantine/core";
import  GuidedMeditations from "@/components/Resources/Videos/Videos";
export default function PracticePage() {
    const data = [
      ];
  return (
    <>
    <div id='meditation-instructions'>
      <Meditations />
    </div>
    <Divider my='xl' size='lg' color='var(--mantine-color-blue-7)' />

    <div id='guided-meditations'>
    <Videos />
    </div>
    <Divider my='xl' size='lg' color='var(--mantine-color-blue-7)' />
    {/* <div id="links">
      <Links />
      </div> */}
    <div id='music'>
      <Music />
    </div>

    </>
  );
}
