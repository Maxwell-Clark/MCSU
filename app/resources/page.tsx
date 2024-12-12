import { Books } from "@/components/Resources/Books/Books";
import { Papers } from "@/components/Resources/Papers/Papers";
import Videos  from "@/components/Resources/Videos/Videos";
export function ResourcesPage() {
    const data = [
      ];
  return (
    <>
      <Papers />
      <Books />
      <Videos />
    </>
  );
}

export default ResourcesPage;
