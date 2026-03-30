import { getWritingProjects } from "@/sanity/queries";

export default async function WritingsPage({}) {
  const writings = await getWritingProjects();
  console.log(writings[0]?.downloadFile);
  return (
    <div>
      {writings.map((writing) => {
        return (
          <a
            download
            className="flex gap-4 mb-4 text-[11px] xl:text-[15px] font-SuisseIntl"
            key={writing._id}
            href={writing.downloadFile?.asset.url || "#"}
            rel="noopener noreferrer"
          >
            <span>{writing.year}</span>
            <p>{writing.description}</p>
          </a>
        );
      })}
    </div>
  );
}
