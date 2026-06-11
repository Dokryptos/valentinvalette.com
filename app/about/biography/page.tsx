import { getBiographiesProjects } from "@/sanity/queries";
export const revalidate = 30;
export const dynamic = "force-dynamic";
import { UIImageSanity } from "@/components/ui/image/sanity";
import type { BiographyDescriptionBlock } from "@/types/biographie";

function renderSpans(
  children: Array<{ _type?: string; text: string; marks?: string[] }>,
) {
  return children.map((span, i) => {
    let node: React.ReactNode = span.text;
    if (span.marks?.includes("em")) node = <em key={`em-${i}`}>{node}</em>;
    if (span.marks?.includes("strong"))
      node = <strong key={`strong-${i}`}>{node}</strong>;
    return <span key={i}>{node}</span>;
  });
}

function renderDescription(
  description: BiographyDescriptionBlock[] | string | undefined | null,
) {
  if (!description) return null;
  if (typeof description === "string") {
    return <p className="whitespace-pre-wrap text-justify">{description}</p>;
  }
  return description.map((block, i) => (
    <p key={i} className="whitespace-pre-wrap text-justify m-0">
      {renderSpans(block.children ?? [])}
    </p>
  ));
}

export default async function BiographyPage() {
  const bio = await getBiographiesProjects();

  return (
    <div className="overflow-hidden">
      <div className="text-[11px] xl:text-[15px]">
        {renderDescription(bio[0]?.description)}
      </div>
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
