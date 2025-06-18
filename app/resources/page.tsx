import { Books } from "@/components/Resources/Books/Books";
import Links from "@/components/Resources/Links/Links";
import { Papers } from "@/components/Resources/Papers/Papers";
import Videos  from "@/components/Resources/Videos/Videos";
import PoemsDisplay from '@/components/Resources/Poems';
import { Box, Divider } from "@mantine/core";
export default function ResourcesPage() {
    const data = [
      ];
  return (
    <>
      <Box mb='xl' id='papers'>
      <Papers />
      </Box>
      <Divider my='xl' size='lg' color='var(--mantine-color-blue-7)' />
      <Box mt='xl' id='books'>
      <Books />
      </Box>
      <Divider my='xl' size='lg' color='var(--mantine-color-blue-7)' />
      <Box mt='xl' id='links'>
        <Links />
      </Box>
      <Divider my='xl' size='lg' color='var(--mantine-color-blue-7)' />
      <Box mt='xl' id='poems'>
        <PoemsDisplay />
      </Box>
      <Divider my='xl' size='lg' color='var(--mantine-color-blue-7)' />

      <Box mt='xl' id='videos'>
      <Videos />
      </Box>
    </>
  );
}
