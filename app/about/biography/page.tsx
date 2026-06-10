import { getBiographiesProjects } from "@/sanity/queries";
export const revalidate = 30;
export const dynamic = "force-dynamic";
import { UIImageSanity } from "@/components/ui/image/sanity";

export default async function BiographyPage() {
  const bio = await getBiographiesProjects();

  return (
    <div>
      <p className="whitespace-pre-wrap text-[11px] xl:text-[15px]">
        {bio[0].description}
      </p>
      <div className="fixed bottom-4 left-4">
        <UIImageSanity
          asset={bio[0].photoProfil}
          alt="Photo de profil de Valentin Valette"
          className="w-30 md:w-60 lg:w-62.5 xl:w-65 h-auto"
        />
      </div>
    </div>
  );
}
