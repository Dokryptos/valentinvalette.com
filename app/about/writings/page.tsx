import { getWritingProjects } from "@/sanity/queries";
export const dynamic = "force-dynamic";
export const revalidate = 30;

export default async function WritingsPage({}) {
  const writings = await getWritingProjects();
  return (
    <div>
      {writings.map((writing) => {
        const fileName = writing.description
          ? writing.description.replace(/\s+/g, "_").substring(0, 30)
          : "document";
        const downloadUrl = writing.fileUrl
          ? `${writing.fileUrl}?dl=${fileName}.pdf`
          : "#";
        return (
          <a
            className="flex gap-4 mb-4 text-[11px] xl:text-[15px] font-SuisseIntl"
            key={writing._id}
            href={downloadUrl}
            download
          >
            <span>{writing.year}</span>
            <p>{writing.description}</p>
          </a>
        );
      })}
    </div>
  );
}
